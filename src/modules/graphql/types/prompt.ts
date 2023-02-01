import {
    extendType,
    inputObjectType,
    list,
    nonNull,
    objectType,
  } from "nexus";
import { answerUpdateResolver } from "../resolvers/answerUpdateResolver";
import { promptResolver } from "../resolvers/promptResolver";
  
  export const generatePrompt = extendType({
    type: "Mutation",
    definition: t => {
      t.field("generatePrompt", {
        type: list(AnswerType),
        args: { prompt: nonNull("String") },
        resolve: promptResolver,
      });
    },
  });

  export const updateAnswer = extendType({
    type: "Mutation",
    definition: t => {
      t.field("updateAnswer", {
        type: AnswerType,
        args: { answer: nonNull(AnswerModField) },
        resolve: answerUpdateResolver,
      });
    },
  });
  
  const AnswerModField = inputObjectType({
    name: "answerModField",
    definition: t => {
        t.nonNull.int("id");
        t.nullable.int("rank");
        t.nullable.string("modText");
        t.nullable.boolean("flag");
    }
  });

  const AnswerType = objectType({
    name: "answerType",
    definition: t => {
      t.int("id");
      t.int("promptId");
      t.nullable.int("rank");
      t.string("text");
      t.nullable.string("modText");
      t.nullable.boolean("flag");
    },
  });