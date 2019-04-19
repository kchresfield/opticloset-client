# opticloset-client
Client (Ionic) portion of the opticloset repo

## Team

  - __Product Owner__: 
  - __Scrum Master__: Jay Kindell
  - __Development Team Members__: Kaelyn Chresfield, Laura Pena, Julien de la Mettrie

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

- Install dependencies (see below)
- Create an auth.config.ts file inside the auth folder (located inside the services folder)
- Inside the auth.config.ts file export a variable named 'AUTH_CONFIG' => an object with the following properties
  clientID: 
  clientId: 
  domain: "opticloset.auth0.com", // e.g., you.auth0.com
  packageIdentifier: "com.auth0.ionic", // config.xml widget ID
  host: 'localhost', // local host

- Start serving by running 'ionic serve'

```sh
node server/server.js
```

- For back-end side [here](https://github.com/technolagists/opticloset-client)

## Requirements

- Ionic ^4.1.1
- Angular ^7.2.2
- Typescript ^3.1.6
- Tslint ~5.12.0

## Development

### Installing Dependencies

From within the client folder:

```sh
npm install

```

### Roadmap

View the project roadmap [here](https://github.com/technolagists/opticloset/issues)


## Contributing

See [CONTRIBUTING.md](_CONTRIBUTING.md) for contribution guidelines.
