# FT Labs - template_SAPI

Base project containing the barebones files to get started with SAPI/CAPI requests and FT SSO.

You probably won't need everything for your own project, just use what you need and if there is anything you don't understand, ask any of the Labs team for guidance.


## Installation

You will need to create a .env file and include the mandatory environment variables, which are:

```
CAPI_KEY= # you can request this via the FT developer portal
TOKEN= # for authorised access without S3O or IP range. This can be set to a noddy value for development.
PORT= # auto set in Heroku, but needs specifying for development.
```

Optional env var:
- CAPI_CONCURRENCE= #default = 4

Install the dependencies by running `npm install` and start the server with `npm start`.


For tests, run:

```sh
$ npm test
```
