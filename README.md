# Capgemini Test

<p align="center">
  <img src="https://w7.pngwing.com/pngs/212/722/png-transparent-web-development-express-js-javascript-software-framework-laravel-world-wide-web-purple-blue-text.png" width="600" alt="Express Logo" />
</p>

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

Secondly, we create the .env file for the project configuration(just rename .env.example file), I leave a sample configuration.

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

### Running the app
```bash
#development mode:
$ npm run dev
```


### Test

```bash
# e2e tests
$ npm run test:e2e
```


### Considerations
- Basado en mi interpretación he deducido que los clientes ofrecidos por el mock, son así mismos los propios usuarios de la aplicación, ya que poseen el campo role.

- En caso de querer probar la API más allá de los test, he insertado dos usuarios en la base de datos con contraseña y cada uno con un rol diferente para probar el middleware de checkRole.
```typescript
const users  = [
    {
        email: luisdavid@user.com
        pass: simple_user_key
    },
    {
        email: luisdavid@admin.com
        pass: simple_admin_key
    }
]
``