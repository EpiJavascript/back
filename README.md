# EpiJavascript - back

## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Running the app](#running-the-app)
  * [Environment variable](#environment-variable)
* [Deployment](#deployment)
* [Documentation](#documentation)
* [Migrations](#migrations)
* [License](#license)
* [Contact](#contact)

## About The Project

Recration of a discord web application.

Api of the [front](https://github.com/EpiJavascript/front) project.

### Built With

* [Nest.js](https://nestjs.com/)

## Getting Started

### Prerequisites

* [Node](https://nodejs.org/) v.14.17.5 (lts/fermium)
* [Yarn](https://yarnpkg.com/) or [Npm](https://www.npmjs.com/) according to the _Node_ version

### Installation

```sh
yarn
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

### Environment variable

The app loads a dotenv file depending on your NODE_ENV environment variable (fallback to _development_) : `.env.$NODE_ENV`.

If a local dotenv file is provided, the app will load it instead : `.env.$NODE_ENV.local`.

## Deployment

This project is link with multiple [Heroku](https://www.heroku.com) applications, pushing to some branches will trigger an auto-deployment :
* dev -> https://dashboard.heroku.com/apps/epi-javascript-backend-dev
* prod -> https://dashboard.heroku.com/apps/epi-javascript-backend-dev

## Documentation

The code is documented using a [Swagger](https://swagger.io/) that you can browse at the */swagger* endpoint

## Migrations

See [migrations README](https://github.com/EpiJavascript/back/blob/master/src/database/migrations/README.md)

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Project Link: [https://github.com/EpiJavascript/back](https://github.com/EpiJavascript/back)
