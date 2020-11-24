<h1>Salesloft Interview Challenge - NestJS and Angular
  
</h1>
<a  href="http://nestjs.com/"
    target="blank"
  >
    <img
      src="https://nestjs.com/img/logo_text.svg"
      width="65"
      alt="Nest Logo"
    />
  </a>
  <a
    href="https://angular.io/"
    target="blank"
  >
    <img
      src="https://angular.io/assets/images/logos/angular/angular.svg"
      width="65"
      alt="Angular Logo"
    />
  </a>

## Description

Challenge taken with ❤️ by Jairo Escobar.

## Server Side: NestJS

### Outside Docker containers

- Create .env file `cp .env.example .env` and replace existing env variables
  (mysql/mariadb connection params)
- Install dependencies `yarn`
- Start the app `yarn start` (app will be exposed through the port 3000)

### Inside Docker containers

Just run already prepared bash script:
```bash
$ ./init
```
It will setup the project for you (building the Docker images, starting docker-compose stack).
The NestJS app running in dev mode will be exposed on `http://localhost` (port 80)

For IDE autocompletion to work, run `yarn` on the host machine.

### Test

```bash
# unit tests
$ docker exec -it nest yarn test

# test coverage
$ docker exec -it nest yarn test:cov
```

### Swagger

RESTful APIs are integrated with Swagger.
To see all available endpoints visit http://localhost/api/docs


## Client Side: Angular


### Setup and installation

Move to the `salesloft-challenge-web` directory to start the setup.

Install the `npm` packages described in the `package.json` and verify that it works:

```shell
npm install
npm start
```

The `npm start` command builds (compiles TypeScript and copies assets) the application into `dist/`, watches for changes to the source files.

Shut it down manually with `Ctrl-C`.

#### npm scripts

These are the most useful commands defined in `package.json`:

* `npm start` - runs the TypeScript compiler, asset copier, and a server at the same time, all three in "watch mode".
* `npm build` - runs the TypeScript compiler and asset copier once.
* `npm lint` - runs `tslint` on the project files.

These are the test-related scripts:

* `npm test` - builds the application and runs Intern tests (both unit and functional) one time.
* `npm e2e` - builds the application and runs end-to-end tests one time.
