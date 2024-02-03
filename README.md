# Secret Santa

## Introduction

Secret Santa is a web-based application designed to facilitate the traditional Secret Santa gift exchange. Built using Vite, Express, Postgres, and TypeScript, this project aims to create an interactive and user-friendly platform for organizing and participating in Secret Santa events.

## Features

- **User Registration**: Allows users to sign up and participate in Secret Santa events.
- **Event Creation**: Users can create their own Secret Santa events, inviting friends and colleagues.
- **Gift Suggestions**: The platform suggests gift ideas based on the preferences of the participants.

## Getting Started

### Prerequisites

- Node.js
- PostgreSQL
- Vite (React)
- TypeScript
- Prisma
- Express

### Local Development

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/Secret-Santa.git
   cd Secret-Santa
   ```

2. **Install Dependencies:**

   - You will have to install npm dependencies in the root as well as in `/client`. You can do this by running `npm install` at root, and then switching your directory to `/client` and then running `npm install` there.

3. **Set up the PostgreSQL database:**

   - Make sure that PSQL is properly [installed](https://www.postgresql.org/download/) on your machine. You can always run `psql --version` to see if it's already installed.
   - This project uses Prisma, which relies on psql connection strings. You must first create a `.env` file in the root. Then, using `.env.example` as a guide, enter your relevant connection string to `.env`. The standard connection string is provided in `.env.example`, but your setup might require a different way to connect Prisma to your db instance. For instance, your db might not have a password by default. As a result, you will leave the `PASSWORD` part of the connection string blank.
     ![Alt text](/repo_assets/image.png)
   - At this point you should be able to setup the tables in your db using Prisma. From the root directory run `npm run migrate:dev`. If you query your DB for the tables located under `/server/prisma/schema.prisma` you will see those tables in your db.
   - Once you have your database setup, you can run the server tests to see if you're setup is done correctly.

4. **Launching the app:**
   - You can start the server and the front-end code by running `npm run dev` at root. This will launch the front-end code on port `3002` and the server on `3000`.
   - You can also clear and seed the database by running `npm run db:seed`.
5. **SendGrid Account and API Key:**
   You may want to interact with the apps ability to send emails through [Twilio's SendGrid API](https://www.twilio.com/en-us/sendgrid/email-api). If so, you will need to sign up for an account and get an API key. If you don't want to interact with this part of the app, you can at least set `SEND_GRID_KEY` and `SEND_GRID_EMAIL` to some arbitrary value. That way the tests can pass.

## Testing

You can find the server tests under `/server/__tests__`. You can run these tests from the root through `npm test`. For the front-end tests, you can find them under `/client/tests`. In order to execute them you will have to change the directory to `/client` and then run `npm run frontend-tests`.

### End-to-end Tests

In order to test the full stack solution of the app, front-end and back-end, the repo uses [TestCafe](https://testcafe.io/). You can execute these tests by running `npm run test:e2e` from the root.

If you want to add to these tests, you can do so in `./e2eTests`

## Best Practices

When working with the server, you will notice that there are two ways to spin up the server. `npm start` and `npm run dev`. `npm start` is only for building the app. When developing locally you will want to run `npm run dev`.

### Working with Prisma

In some instances, your fork is lagging behind new updates being made to the db. These updates are typically done by modifying `server/prisma/schema.prisma`. In order to make sure your contribution passes the db tests, you should pull from main, potentially resolve any conflicts, and then update the schema on your local db. You can update your local db by running `npm run db:push`. Once that command is successful, you will have to generate a new prisma client. You can do this by running `npm run db:newClient`.

## Contributing

Thank you for taking the time to contibute! This repo provides the technology and environment needed to learn how to collaborate in software engineering. This means you'll learn a lot by doing so. For example, contributions will have to be made through Pull Requests. These pull requests must pass the tests ran by GitHub Actions as well be approved by me.

The best approach to contributing is first making an issue in the repository, and then after getting it assigned to you, start working on the project by forking the main branch of the repo.

## Resources

- [Using Prisma with Relational Databases](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-postgresql)
- [Secret Santa Wiki](https://github.com/mdwiltfong/secret-santa/wiki)
