# Secret Santa

## Introduction

Secret Santa is a web-based application designed to facilitate the traditional Secret Santa gift exchange. Built using Vite, Express, Postgres, and TypeScript, this project aims to create an interactive and user-friendly platform for organizing and participating in Secret Santa events.

## Features

- **User Registration**: Allows users to sign up and participate in Secret Santa events.
- **Event Creation**: Users can create their own Secret Santa events, inviting friends and colleagues.
- **Gift Suggestions**: The platform suggests gift ideas based on the preferences of the participants.
- (Add more features specific to your project here.)

## Getting Started

### Prerequisites

- Node.js
- PostgreSQL
- (Any other prerequisites)

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
   - This project uses Prisma, which relies on psql connection strings. You must first create a `.env` file in the root. Then, using `.env.example` as a guide, enter your relevant connection string to `.env`. The standard connection string is provided in `.env.example`, but your setup might require a different way to connect Prisma to your db instance.
     ![Alt text](image.png)
   - At this point you should be able to setup the tables in your db using Prisma. From the root directory run `npm run migrate:dev`. If you query your DB for the tables located under `/server/prisma/schema.prisma` you will see those tables in your db.
   - Once you have your database setup, you can run the server tests to see if you're setup is done correctly.

4. **Launching the app:**
   - First, you must launch the server. You can do this by running `npm run dev`
   - The server by default listens at port 3000. So if your server is running correctly, you should be able to visit `http://localhost:3000`
   - Once your app is runing, you can launch the front-end. You can do this by chaning your directory to `/client` and then running `npm run dev`. Vite is able to find available ports and then launch the app. As a result, you will have to pay attention to what your terminal prints out to know what port to visit.

## Testing

You can find the server tests under `/server/__tests__`. You can run these tests from the root through `npm test`. For the front-end tests, you can find them under `/client/tests`. In order to execute them you will have to change the directory to `/client` and then run `npm run frontend-tests`.

## Contributing

Thank you for taking the time to contibute! This repo provides the technology and environment needed to learn how to collaborate in software engineering. This means you'll learn a lot by doing so. For example, contributions will have to be made through Pull Requests. These pull requests must pass the tests ran by GitHub Actions as well be approved by me.

The best approach to contributing is first making an issue in the repository, and then after getting it assigned to you, start working on the project by forking the main branch of the repo.

## Resources

- [Using Prisma with Relational Databases](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-postgresql)
