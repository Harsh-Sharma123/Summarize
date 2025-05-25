import OpenAI from 'openai';
import { SUMMARY_SYSTEM_PROMPT } from '../../utils/prompts';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});


export async function generateSummaryFromOpenAI(pdfText: string){
    try{

        const completion = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [
                {
                    role: 'system', content: SUMMARY_SYSTEM_PROMPT
                },
                {
                    role: 'user', content: `Transform this doument into an engaging, easy-to-read summary with contextually relevant emojis and proper markdown formatting:\n\n${pdfText}`
                }
            ],
            temperature: 0.7,
            max_tokens: 50,
        });
        return completion.choices[0].message.content;
    }catch(err: any){
        if(err?.status == 429){
            throw new Error('RATE_LIMIT_EXCEEDED');
        }
        throw err;
    }
}

// console.log(completion.choices[0].message);