"use server";

import { getDBConnection } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function DeleteSummary({ summaryId }: { summaryId: string }) {
  try {
    // delete from DB

    const sql = await getDBConnection();
    const user = await currentUser();
    const userId = user?.id;

    if (!userId) {
      throw new Error("User ID not Found!");
    }

    const result =
      await sql`DELETE FROM pdf_summaries where id = ${summaryId} and user_id = ${userId} returning id;`;

    if (result.length > 0) {
      revalidatePath("/dashboard");
      return {
        success: true,
      };
    }

    return { success: false };

    //revalidiatePath
  } catch (err) {
    console.log("Error in deleting summary : ", err);
    return {
      success: false,
    };
  }
}
