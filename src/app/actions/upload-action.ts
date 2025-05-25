"use server";

import { getDBConnection } from "@/lib/db";
import { formatFileNameAsTitle } from "@/lib/format-utils";
import { generateSummaryFromGemini } from "@/lib/gemini-ai";
import { fetchAndExtractText } from "@/lib/lanchain";
import { generateSummaryFromOpenAI } from "@/lib/openai";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

// Server Action : anytime we want to expose a function like http endpoint we can create a file with "use server" directive

export async function generatePDFSummary(
  uploadResponse: [
    {
      serverData: {
        userId: string;
        file: {
          url: string;
          name: string;
        };
      };
    }
  ]
) {
  if (!uploadResponse) {
    return { success: false, message: "File Upload Failed !", data: null };
  }

  const {
    serverData: {
      userId,
      file: { url: fileUrl, name: fileName },
    },
  } = uploadResponse[0];

  if (!fileUrl) {
    return {
      success: false,
      message: "File Upload Failed !",
      data: null,
    };
  }

  try {
    const pdfText = await fetchAndExtractText(fileUrl);
    console.log(pdfText);

    let summary;
    try {
      summary = await generateSummaryFromOpenAI(pdfText);
      console.log(summary);
    } catch (err) {
      console.log(err);

      // call GEMINI
      if (err instanceof Error && err.message === "RATE_LIMIT_EXCEEDED") {
        try {
          summary = await generateSummaryFromGemini(pdfText);

          // cleaning first line

          const lines = summary.split("\n");
          summary = lines.slice(1).join("\n");
        } catch (error) {
          console.log("Gemini API Failed", error);
        }
      }
    }

    if (!summary) {
      return {
        success: false,
        message: "Failed to generate summary!",
        data: null,
      };
    }

    const formattedFileName = formatFileNameAsTitle(fileName);

    return {
      success: true,
      message: "Summary Generated Successfully",
      data: {
        title: formattedFileName,
        summary,
      },
    };
  } catch (err) {
    return { success: false, message: "File Upload Failed !", data: null };
  }
}

async function savePdfSummary({
  userId,
  fileUrl,
  summary,
  title,
  fileName,
}: {
  userId: string;
  fileUrl: string;
  summary: string;
  title: string;
  fileName: string;
}) {
  try {
    const sql = await getDBConnection();
    const [savedSummary] =
      await sql`INSERT INTO pdf_summaries (user_id, original_file_url, summary_text, title, file_name) VALUES (${userId}, ${fileUrl}, ${summary}, ${title}, ${fileName}) returning id, summary_text`;
    return savedSummary;
  } catch (err) {
    console.log("Error in saving PDF Summary ", err);
  }
}

export async function storePdfSummaryAction({
  fileUrl,
  summary,
  title,
  fileName,
}: {
  fileUrl: string;
  summary: string;
  title: string;
  fileName: string;
}) {
  // user is logged in and has a userid
  // savePdfSummary
  let savedPdfSummary;
  try {
    const { userId } = await auth();
    if (!userId) {
      return {
        success: false,
        message: "User Not Found",
      };
    }

    savedPdfSummary = await savePdfSummary({
      userId,
      fileUrl,
      summary,
      title,
      fileName,
    });

    if (!savedPdfSummary) {
      return {
        success: false,
        message: "Error in saving PDf Summary0",
      };
    }
  } catch (err) {
    return {
      success: false,
      message: err,
    };
  }

  // Revalidate cache in next js
  revalidatePath(`/summaries/${savedPdfSummary.id}`);
  return {
    success: true,
    message: "PDF Summary Saved Successfully!",
    data: {
      id: savedPdfSummary.id,
    },
  };
}
