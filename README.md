# Capgemini Test

## About the project
Little clients and policies API for a technical test.

#### The project consists of:
* SQL database running with Docker Compose.
* Simple auth module.
* Lint and preset configuration.
* Technical test features.


## Technical choices

#### I chose several tools and detail the reason for each one.

- Express.js: really simple framework of the JavaScript ecosystem, fast, flexible and with a simple entry barrier for those without much time to migrate to other more complex frameworks.
- TypeScript: It allows me to type my backend application making it easier for someone who hasn't worked on the project to understand, while also allowing me to use the latest JavaScript features, including ES6, the standard mentioned in the test explanatory document.
- Docker-compose: allows the team to test the project without relying on more complex dependencies like a database engine.


## Requeriments
- Node.js
- Docker and Docker Compose




## Installation

We start by installing the dependencies


```
$ npm install
```

Secondly, we create the .env file for the project configuration, I leave a sample configuration.

```bash
NODE_ENV=dev

### JWT
JWT_SECRET=dfdhhf8gh523reh6qedn37dferpoawdn381j
JWT_EXPIRATION=1d

## DB configuration
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=root
MYSQL_DB=clients_database
MYSQL_PORT=3306

API_PORT=4065
```

Finally, we need to pull up the database, including the data we will get from the test .sql seed.
**If your current user does not have permissions to interact with containers using docker-compose you will need to check this.** 

```
$ docker-compose up -d
```