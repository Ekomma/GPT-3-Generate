# typescript-nextjs-graphql

### Technologies Used:

- Next.js
- TypeScript
- Prisma
- GraphQL Nexus
- Apollo Server
- Apollo Client configured SSR/SSG and CSR
- GraphQL Codegen


To run this project complete the following steps after cloning:
 - Run `yarn` to install the packages
 - Install docker or connect to a postgres DB with the `.env.example` renamed to `.env` and the right crendentials provided for openai key and prisma/postgres connection string.
 If you have docker installed, run `docker-compose up -d` to setup a running postgres container. The port exposed is 5001.
 - To get the right DB schema, run `npx prisma migrate dev` to run the prisma migrations
 - To start the app, run `yarn run dev`