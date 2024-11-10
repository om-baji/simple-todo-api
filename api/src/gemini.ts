import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function getTodo(number: number) {
  const prompt =
    `Give me ${number} simple todo in the form of a array(named todos) of json object following this format { id : '1' , todo : 'Do something', completed : false, userId : 101 } note that the userId(3 digits) and id(1 to 3 digits) should be random, the final output should look similar to this [{ id : '1' , todo : 'Do something', completed : false, userId : 101 }] , no other text should be present in the output`;

  const result = await model.generateContent(prompt);

  const res = JSON.parse(result.response.text().replace('json','').replaceAll('```', ''));

  return res;
}
