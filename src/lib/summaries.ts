import { getDBConnection } from "./db";

export async function Getsummaries(userId: string) {
  const sql = await getDBConnection();
  const summaries =
    await sql`select * from pdf_summaries where user_id = ${userId} ORDER BY created_at DESC`;
  //   console.log(summaries);
  return summaries;
}

export async function getSummaryById(id: string) {
  try {
    const sql = await getDBConnection();

    const [summary] =
      await sql`select id, user_id, title, original_file_url, file_name, status, summary_text, created_at, updated_at, length(summary_text)-length(replace(summary_text, ' ', ''))+1 as word_count from pdf_summaries where id=${id}`;

    return summary;
  } catch (err) {
    console.log(err);
    return null;
  }
}
