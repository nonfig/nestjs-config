<p align="center">
  <a href="https://nonfig.com/" target="blank"><img src="https://www.nonfig.com/wp-content/uploads/2020/07/nonfig-logo.png" width="300" alt="Nonfig Logo" /></a>
  <a href="https://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>
<h1 align="center"> Nonfig NestJS Plugin </h1>
<p align="center">
  NestJS Module for <a href="https://nonfig.com" target="_blank">Nonfig</a> services. Nonfig combines Configurations and Features. So you change features, and release swiftly, and measure to digital impact.
</p>
<p align="center">
<a href="https://www.npmjs.com/~nonfig" target="_blank"><img src="https://img.shields.io/npm/v/@nonfig/nestjs-config.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nonfig" target="_blank"><img src="https://img.shields.io/npm/l/@nonfig/nestjs-config.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nonfig" target="_blank"><img src="https://img.shields.io/npm/dm/@nonfig/nestjs-config.svg" alt="NPM Downloads" /></a>
<a href="https://twitter.com/nonfig" target="_blank"><img src="https://img.shields.io/twitter/follow/nonfig.svg?style=social&label=Follow"></a>
</p>
# :notebook: Summary

* [Installation](#installation)
* [Setup](#setup)
* [Usage](#usage)
  * [NonfigService](#librarynameservice)
* [Schematics](#schematics)

# :package: Installation

* :cat2: Using Nest CLI:
```
nest add @nonfig/nestjs-config
```

* :package: Using Package Manager: 
```
npm install --save @nonfig/nestjs-config
```

# :wrench: Setup

Explain your library setup.

```typescript
import { Module } from '@nestjs/common';
import { NonfigModule, NonfigConfig } from '@nonfig/nestjs-config';

const CONFIG: NonfigConfig = {
  appId: '<Your Application ID>',
  appSecret: '<Your Application Secret>'
}

@Module({
  imports: [
    ...
    NonfigModule.register(CONFIG)
  ],
  controllers: [ ... ],
  providers: [ ... ],
})
export class AppModule {}
```

## :control_knobs: Config

| Name | Type | Default | Description | Description |
| --- | --- | --- | --- | --- |
| appId | __string__ | `<DEFAULT>` | Nonfig consumer's app ID | Required |
| appSecret | __string__ | `<DEFAULT>` | Nonfig consumer's app Secret | Required |
| cacheTtl | __number__ | `60000` | Cache time to live in milliseconds | Optional |

# :books: Usage

Inject NonfigService in any of your controller or service

## NonfigService

Nonfig service fetches configurations using multiple methods.
