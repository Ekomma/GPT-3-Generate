import { PrismaClient } from "@prisma/client";
import { IncomingMessage, ServerResponse } from "http";
import { NextApiRequest, NextApiResponse } from "next";

export interface Context {
  req:
    | NextApiRequest
    | IncomingMessage;
  res: NextApiResponse | ServerResponse;
  prisma: PrismaClient;
}
