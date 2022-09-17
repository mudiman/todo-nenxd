## Description

Todo management GraphQL API built with
- [Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.
- [DyanmoDB](https://dynamoosejs.com)
- [localstack](https://github.com/localstack/localstack)
- [Serverless](https://www.serverless.com/)

## Installation

```bash
$ yarn install
```

## Running the app

Prep the environment start localstack,
```
localstack start -d
```

start dynamodb admin ui
```
# For Windows:
set DYNAMO_ENDPOINT=http://localhost:4566
dynamodb-admin
# For Mac/Linux:
DYNAMO_ENDPOINT=http://localhost:4566 dynamodb-admin
```
```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Stay in touch

- Author - [Mudassar Ali](https://mudiman.github.io)

## Queries

https://www.npmjs.com/package/dynamodb-admin

Add user

```
mutation {
  createUser(
    createUserInput: {
      email: "admin@admin.com",
      first_name:"admin",
      password: "1234"
    }
  ) {
    id
    email
    first_name
  }
}
```

Login User

```
mutation {
  loginUser(
    loginUserInput: {
      email: "admin@admin.com",
      password: "1234"
    }
  ) {
    access_token
  }
}
```

Get User by Id

```
{
   user(id: "96116db4-caa5-4995-93c7-7267d586ccb3") {
    	id
      first_name
      email
   }
}
```

Update user

```
mutation {
  updateUser(
    updateUserInput: {
      id: "96116db4-caa5-4995-93c7-7267d586ccb3",
      email: "admin1111111111@admin.com",
      first_name:"admin11111111",
      password: "1234"
    }
  ) {
    id
    email
    first_name
    password
  }
}
```

Delete user

```
mutation {
  removeUser(id: "96116db4-caa5-4995-93c7-7267d586ccb3") {
    id
    email
    first_name
    password
  }
}
```

Add Todo

```
mutation {
  createTodo(
    createTodoInput: {
      body: "test"
    }
  ) {
    id
    body
    completed
  }
}
```

Get Todo by Id

```
{
   todo(id: "10754a21-7f4d-47f4-9576-e7ef43132569") {
    	id
      body
      completed
   }
}
```

Get All user todos

```
{
   todos {
    	id
      body
      completed
   }
}
```

## License

Nest is [MIT licensed](LICENSE).

## Troubleshoot

- Using dyanmodb if you making changes to schema please make sure to delete old schema using cli or dynamodb admin GUI tool
- Make sure to check docker localstack logs
- https://stackoverflow.com/questions/42880987/serverless-framework-with-aws-lambda-error-cannot-find-module

## Sources

- https://www.npmjs.com/package/dynamodb-admin
- https://dynamoosejs.com/guide/Schema#get-function--async-function
- https://v1.dynamoosejs.com/api/query/
- https://blog.logrocket.com/nestjs-data-dynamoose/
- https://github.com/hardyscc/nestjs-dynamoose
- https://makinhs.medium.com/authentication-made-easy-with-nestjs-part-4-of-how-to-build-a-graphql-mongodb-d6057eae3fdf
- https://stackoverflow.com/questions/63865678/nestjs-test-suite-failed-to-run-cannot-find-module-src-article-article-entity
- https://nishabe.medium.com/nestjs-serverless-lambda-aws-in-shortest-steps-e914300faed5
- https://docs.localstack.cloud/aws/apigatewayv2/