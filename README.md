<p align="center">
  <a href="https://github.com/WillianBL99/repo-provas">
    <img src="https://icon-library.com/images/android-file-icon/android-file-icon-4.jpg" alt="readme-logo" width="180" >
  </a>

  <h3 align="center">
    RepoProvas
  </h3>
</p>

## :page_facing_up: About

RepoProvas is a project that aims to help students in their studies by providing a platform where they can find and share their exams.

## :rocket: Technologies used
The api follow the REST architecture and was developed using the following technologies:

- [<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />](https://nodejs.org/en/)
- [<img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js" />](https://expressjs.com/)
- [<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />](https://www.typescriptlang.org/)
- [<img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />](https://www.postgresql.org/)
- [<img src="https://img.shields.io/badge/Prisma-1B222D?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma" />](https://www.prisma.io/)
- [<img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white" alt="Jest" />](https://jestjs.io/)
- [<img src="https://img.shields.io/badge/Supertest-2C2D72?style=for-the-badge&logo=supertest&logoColor=white" alt="Supertest" />](https://www.npmjs.com/package/supertest)

## :cd: Usage
### How to run for development

1. Clone this repository and install all dependencies.

```bash
$ git clone https://https://github.com/WillianBL99/repo-provas

$ cd repo-provas

$ npm install
```

2. Create and configure the `.env.development` file based on the `.env.example` file.

3. Create a PostgreSQL database with whatever name you want.
   
4. Run the migrations to create the database tables.

```bash
$ npm run dev:prisma:migrate
```

5. Run the seeds 

```bash
$ npm run dev:prisma:seed
```

6. Run the API

```bash
$ npm run dev
```

The API will display `[Service] Connected to database` and `[Server] Server listening on port 'PORT'`. The API will be able on `http://localhost:'Port'`.

### How to run tests for development

1. The first time run the prisma and then the tests. At other times, just run the tests.

```bash
# Run the prisma
$ npm run test:prisma:run
# Run the tests
$ npm run test
```

### How to run for production (Locally)

1. Run the migrations to create the database tables.

```bash
$ npm run prod:prisma:migrate
```

2. Run the seeds 

```bash
$ npm run prod:prisma:seed
```

3. Build the API

```bash
$ npm run build
```

4. Run the API

```bash 
$ npm run start
```

## :twisted_rightwards_arrows: Available routes in the API

### Auth

| Method | Route         | Description | Body                                 | Headers | Response  |
| ------ | ------------- | ----------- | ------------------------------------ | ------- | --------- |
| POST   | /auth/sign-up | Register    | { email, password, confirmPassword } | -       | 201       |
| POST   | /auth/sign-in | Login       | { email, password }                  | -       | { token } |

### Tests

| Method | Route  | Description   | Body                                                | Headers                           | Response                                                                      |
| ------ | ------ | ------------- | --------------------------------------------------- | --------------------------------- | ----------------------------------------------------------------------------- |
| POST   | /tests | Create a test | { name, pdfUrl, category, discipline, teacherName } | { Authorization: Bearer 'token' } | 201                                                                           |
| GET    | /tests | Get all tests | -                                                   | { Authorization: Bearer 'token' } | [ { name, pdfUrl, category, discipline, teacherName, createdAt, updatedAt } ] |

### Categories

| Method | Route       | Description        | Body | Headers                           | Response     |
| ------ | ----------- | ------------------ | ---- | --------------------------------- | ------------ |
| GET    | /categories | Get all categories | -    | { Authorization: Bearer 'token' } | [ { name } ] |

### Disciplines

| Method | Route        | Description         | Body | Headers                           | Response             |
| ------ | ------------ | ------------------- | ---- | --------------------------------- | -------------------- |
| GET    | /disciplines | Get all disciplines | -    | { Authorization: Bearer 'token' } | [ { name, termId } ] |

### Teachers

| Method | Route     | Description      | Body | Headers                           | Response     |
| ------ | --------- | ---------------- | ---- | --------------------------------- | ------------ |
| GET    | /teachers | Get all teachers | -    | { Authorization: Bearer 'token' } | [ { name } ] |

## :page_facing_up: License

### MIT License


[:outbox_tray:](#----valex-api--)

---
Desenvolvido por **Paulo Uilian Barros Lago**😊🧑🏻‍💻
