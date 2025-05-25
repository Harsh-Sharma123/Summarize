import { neon } from '@neondatabase/serverless';
export async function getDBConnection(){
   
    if(!process.env.NEONDB_URL){
        throw new Error("NEON DB URL is not defined!");
    }

    const sql = neon(process.env.NEONDB_URL);

    return sql;


}