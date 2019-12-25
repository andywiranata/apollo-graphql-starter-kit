# Apollo Graphl Starter Kit


## Features at a glance

* Use Apollo Graphql (https://www.apollographql.com/)
* Add sample Firebase Admin for Authentication.
* Add sample cache redis / in memory cahe (https://github.com/apollographql/apollo-server/tree/master/packages/apollo-datasource-rest)
* Yaml based model for configuration development, staging and production.
* Add sample newrelic.
* Add sample logger (https://github.com/winstonjs/winston).
* Use es6 syntax and babel :D

## Building

The following command will install all Node.js dependencies. Once all dependencies are installed it will run `npm run build` compiling Handlebars and Sass files.

```bash
$ npm install
```
run for local development:
```bash
$ npm run dev
```

run for local development with debug:
```bash
$ npm run dev-debug
```

Once the application is running it can be accessed at <http://localhost:8080/graphql/>.

build
```bash
$ npm run build
$ export NODE_ENV=development
$ npm start
```
Adjust NODE_ENV for production/development/staging, more detail in config/application.yml

please check package.json for detail configuration

## Testing Eslint and Mocha

```bash
$ npm run test 
$ npm run test:mocha
```

## Environtment Variabel
* NODE_ENV (development, staging and production)
* NEWRELIC_LICENSE_KEY
* NEWRELIC_APP_NAME
* USE_REDIS
