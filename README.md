[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=quanghiep03198_BE-WMS&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=quanghiep03198_BE-WMS)

# Warehouse Management API

[![SonarCloud](https://sonarcloud.io/images/project_badges/sonarcloud-black.svg)](https://sonarcloud.io/summary/new_code?id=quanghiep03198_BE-WMS)

This project aims to develop a robust and scalable backend system to manage learning materials, exams, and extracurricular activities for FPT Polytechnic. The system will serve as the foundation for a digital education platform, streamlining academic and administrative processes while enhancing user experience for students, teachers, and administrators.

## Table of Contents

- [Features](#features)
- [Techlogies Stack](#techstack)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Product Management**: Create, update, delete, and list products.
- **Inventory Management**: Track stock levels, update quantities, and monitor stock movements.
- **Order Processing**: Manage incoming and outgoing orders, including validations.
- **Warehouse Zones**: Manage different storage zones and sections within the warehouse.
- **Redis Caching**: Improve API performance by caching frequently accessed data.
- **Database Transactions**: Ensure data integrity using SQL Server and TypeORM.
- **Authentication and Authorization**: Secure API endpoints using JWT authentication (optional).

## TechStack

- **Languages & Frameworks**

   ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
   ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
   ![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
   ![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)

- **Databases**

   ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
   ![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white)

- **ORM**

   ![TypeORM](https://img.shields.io/badge/TypeORM-FE0803.svg?style=for-the-badge&logo=typeorm&logoColor=white)
   ![Zod](https://img.shields.io/badge/zod-%233068b7.svg?style=for-the-badge&logo=zod&logoColor=white)

- **Authentication**

   ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

- **Deployment**

   ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
   ![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)

- **Mornitoring & Tracking**

   ![Sentry](https://img.shields.io/badge/sentry-%23362D59.svg?style=for-the-badge&logo=sentry&logoColor=white)
   ![SonarQube](https://img.shields.io/badge/SonarQube-black?style=for-the-badge&logo=sonarqube&logoColor=4E9BCD)

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v22 LTS or higher)
- **SQL Server** (Local or remote instance)
- **NPM** or **PNPM**

### Folder Structure

```
├── .github/
│   └── workflows
│       └── cicd.yml
├── .husky/
├── .vscode/
├── docs/
├── logs/
├── node_modules/
├── src/
│   ├── common/
│   │   ├── constants/
│   │   ├── decorators/
│   │   ├── filters/
│   │   ├── helper/
│   │   ├── interceptors/
│   │   ├── pipes/
│   │   ├── types/
│   │   ├── interceptors/
│   │   └── utils/
│   ├── configs/
│   │   ├── app.config.ts
│   │   └── app.config.validator.ts
│   ├── databases/
│   │   ├── constants/
│   │   ├── migrations/
│   │   ├── seeds/
│   │   ├── transformers/
│   │   ├── data-source.ts
│   │   ├── database.module.ts
│   │   └── seed.ts
│   ├── jobs/
│   │   └── file-logger.service.job.ts
│   ├── messages/
│   │   └── ioredis.service.ts
│   ├── modules/
│   │   ├── auth/
│   │   ├── users/
│   │   └── ...
│   ├── app.module.ts
│   ├── app.controller.ts
│   ├── main.ts
│   └── ...
├── .env.example
├── commitlint.config.js
├── docker-compose.yaml
├── Dockerfile
├── ecosystem.config.js
├── nest-cli.json
├── package.json
├── pnpm-lock.yaml
├── sonar-project.properties
├── tsconfig.build.json
├── tsconfig.json
└── ...
```

### Installation

1. Clone the repository:

```bash
git clone https://github.com/quanghiep03198/BE-LMS.git <dir_name>

cd <dir_name>
```

2. Install the dependencies:

```bash
 pnpm install
```

3. Set up your PostgreSQL and Redis instances.

### Configuration

The application uses environment variables for configuration. Create a .env file in the root of the project and add the following environment variables from _env.example_:

```bash
cp .env.example .env
```

### Initialize PostgreSQL and Redis via Docker

```bash
	docker-compose up -d
```

### Database Migration

To initialize the database schema using TypeORM, run:

```bash
pnpm run migration:run
```

This will create the necessary tables and relationships in SQL Server.

### Running the Application

To start the development server:

```bash
pnpm run start:dev
```

The API will now be available at http://localhost:8080.

### Running Tests

To run the unit tests:

```bash
pnpm run test:cov
```

## Contributing

If you'd like to contribute to this project, please follow the contribution guidelines. We welcome all contributions, from minor fixes to new features.

## Branching Strategy

- **main**: Production-ready code.
- **develop**: Development branch for the next release.
- **feat/\***: Developing feature branch
- **fix/\***: Needed fix branch

Create a feature branch for any new features or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
