import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function generateAnswers(
  prompt: string
): Promise<Array<string | undefined>> {
  return new Promise(async (resolve, reject) => {
    if (!configuration.apiKey) {
      reject(
        "OpenAI API key not configured, please follow instructions in README.md"
      );
    }

    if (prompt.trim().length === 0) {
      reject("Please enter a valid animal");
    }

    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0.2,
      n: 3,
    });
    resolve(completion.data.choices.map((answer) => answer.text));
  });
}
