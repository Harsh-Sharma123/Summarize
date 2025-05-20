"use server";

import { fetchAndExtractText } from "@/lib/lanchain";

// Server Action : anytime we want to expose a function like http endpoint we can create a file with "use server" directive

export async function generatePDFSummary(uploadResponse: [{
    serverData: {
        userId: string;
        file: {
            url: string;
            name: string;
        }
    };
}]){

    if(!uploadResponse){
        return {success: false,
            message: 'File Upload Failed !',
            data: null,
        }
    }

    const {
        serverData: {
            userId,
            file: {url: fileUrl, name: fileName},
        },
    } = uploadResponse[0];

    if(!fileUrl){
        return {
            success: false,
            message: 'File Upload Failed !',
            data: null,
        }
    }

    try{
        
        const pdfText = await fetchAndExtractText(fileUrl);
        console.log(pdfText);

    }catch(err){
       return { success: false,
            message: 'File Upload Failed !',
            data: null
    }}
}