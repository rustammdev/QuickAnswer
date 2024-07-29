import { OpenAI } from "openai";
import "dotenv/config";

class GenereteQuestions {
    constructor(questions) {
        this.systemPrompt = process.env.SYSTEM_PROMPT;

        // OpenAI api key
        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });

        // questions
        this.questions = questions.join("\n");
    }

    async main() {
        try {
            const chatCompletion = await this.openai.chat.completions.create({
                messages: [
                    //You can delete the 1.role: "system", 2. systemPrompt section if you only need answers to questions.
                    { role: "system", content: this.systemPrompt },
                    { role: "user", content: this.questions },
                ],
                model: "gpt-4", // or others modell
            });

            // return data
            return chatCompletion.choices[0].message.content;
        } catch (error) {
            throw new Error(error);
        }
    }

    // Get data
    async getData() {
        const ResponsData = await this.main();

        const jsonString = ResponsData.match(/\{[\s\S]*\}/)[0];

        // JSON stringni obyektga aylantiramiz
        const jsonObject = JSON.parse(jsonString);
        return jsonObject;
    }
}

export default GenereteQuestions;
