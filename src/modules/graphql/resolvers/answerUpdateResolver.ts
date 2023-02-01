import { FieldResolver } from "nexus";

export const answerUpdateResolver: FieldResolver<
  "Mutation",
  "updateAnswer"
> = async (_, {answer}, { prisma }) => {

    let fieldsToUpdate: Omit<typeof answer, "id"> = {}
    if(answer.flag !== null) fieldsToUpdate.flag = answer.flag
    if(answer.modText !== null) fieldsToUpdate.modText = answer.modText
    fieldsToUpdate.rank = answer.rank ?? null
  // update answer
  const updatedAnswer = await prisma.answer.update({ where: {id: answer.id}, data: fieldsToUpdate});
  return updatedAnswer;
};
