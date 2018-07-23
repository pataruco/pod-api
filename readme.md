# POD API

## What it is?

Is an API built on AWS API Getway using AWS lamda functions as an endpoints deployed on [serverless](https://serverless.com/) [api.peteroftheday.com](api.peteroftheday.com), e.g. [api.peteroftheday.com/random](api.peteroftheday.com/random)

## Installation

- Clone this repo
  ```shell
  git clone git@github.com:pataruco/pod-api.git
  ```
- Install dependencies
  ```shell
  yarn
  ```
- On your zsh / bash profile add the following enviroment variables
  ```shell
    export AWS_ACCESS_KEY_ID=""
    export AWS_SECRET_ACCESS_KEY=""
    export POD_AWS_ACCESS_KEY_ID=""
    export POD_AWS_SECRET_ACCESS_KEY=""
    export POD_BUCKET_NAME=""
    export POD_URL=""
  ```
- Configurate serverless

  ```shell
  yarn serverless-config
  ```

## Deployment

On AWS API Getway, paste the [swagger](./config/swagger.yml) manifest to create all endpoints.

On CLI run

```shell
yarn deploy
```

To deploy all lamda functions, then link each endpoint on AWS Getway to each lamda

## Todo

- [ ] deploy on API Getway using [terraform](https://www.terraform.io/)
