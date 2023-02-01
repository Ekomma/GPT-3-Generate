import { FieldResolver } from "nexus";
import generateAnswers from "../../utils/generate";

export const promptResolver: FieldResolver<
  "Mutation",
  "generatePrompt"
> = async (_, { prompt }, { prisma }) => {
  // create prompt in prisma and save id
  const createdPrompt = await prisma.prompt.create({ data: { text: prompt } });

  // generate answers from gpt
  const answers = await generateAnswers(prompt);
  // create answers in prisma with promptId
  await prisma.answer.createMany({
    data: answers.map((answer) => ({
      promptId: createdPrompt.id,
      text: answer || "",
    })),
  });
  const createdAnswers = await prisma.answer.findMany({
    where: {
      promptId: createdPrompt.id,
    },
  });
  // return answers as array
  return createdAnswers;
};
