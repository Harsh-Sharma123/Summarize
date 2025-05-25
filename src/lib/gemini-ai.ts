import { GoogleGenAI } from "@google/genai";
import { SUMMARY_SYSTEM_PROMPT } from "../../utils/prompts";

//initialize the gemini api with your api key
const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
export const generateSummaryFromGemini = async (pdfText: string) => {
    try{
        const prompt = `${SUMMARY_SYSTEM_PROMPT}\n\nTransform this document into an engaging, easy-to-read summary with contextually relevant emojis and proper markdown formatting:\n\n${pdfText}`;

        const result = await genAI.models.generateContent({
            model: "gemini-2.0-flash-001",
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            config: {
              temperature: 0.7,
              maxOutputTokens: 1500,
            },
          });
      
        if(!result?.text){
            throw new Error('Empty response from Gemini API');
        }
        return result.text;
    }catch(error: any){
        if(error?.status === 429){
            throw new Error('RATE_LIMIT_EXCEEDED');
        }
        console.log("error on gemini ", error);
        throw error;
    }
}