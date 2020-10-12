<p align="center">
  <a href="https://nonfig.com/" target="blank"><img src="https://www.nonfig.com/wp-content/uploads/2020/07/nonfig-logo.png" width="300" alt="Nonfig Logo" /></a>
  <a href="https://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>
<h1 align="center"> Nonfig NestJS Plugin </h1>
<p align="center">
  NestJS Module for <a href="https://nonfig.com" target="_blank">Nonfig</a> services. Nonfig combines Configurations and Features. So you change features, and release swiftly, and measure to digital impact.
</p>
<p align="center">

[![CircleCI](https://circleci.com/gh/nonfig/nestjs-config.svg?style=shield&circle-token=a843b1bfda524abc2befedd3bd8a5b97b5a3c1ad)](https://circleci.com/gh/nonfig/nestjs-config)
<a href="https://www.npmjs.com/~nonfig" target="_blank"><img src="https://img.shields.io/npm/v/@nonfig/nestjs-config.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nonfig" target="_blank"><img src="https://img.shields.io/npm/l/@nonfig/nestjs-config.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nonfig" target="_blank"><img src="https://img.shields.io/npm/dm/@nonfig/nestjs-config.svg" alt="NPM Downloads" /></a>
<a href="https://twitter.com/nonfig" target="_blank"><img src="https://img.shields.io/twitter/follow/nonfig.svg?style=social&label=Follow"></a>
</p>

# Summary

* [Installation](#installation)
* [Setup](#setup)
* [Usage](#usage)
  * [NonfigService](#librarynameservice)

# :package: Installation

* Using Nest CLI:
```
nest add @nonfig/nestjs-config
```

* Using Package Manager: 
```
npm install --save @nonfig/nestjs-config
```

* Using Yarn
```bash
yarn add @nonfig/nestjs-config
```

# :wrench: Setup

Explain your library setup.

```typescript
import { Module } from '@nestjs/common';
import { NonfigModule, NonfigOptions } from '@nonfig/nestjs-config';

const CONFIG: NonfigOptions = {
  appId: '<Your Application ID>',
  appSecret: '<Your Application Secret>',
  cacheTtl: 60000  
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

| Name | Type | Default | Description | Required |
| --- | --- | --- | --- | --- |
| appId | __string__ | `<DEFAULT>` | Nonfig consumer's app ID | Yes |
| appSecret | __string__ | `<DEFAULT>` | Nonfig consumer's app Secret | Yes |
| cacheTtl | __number__ | `60000` | Cache time to live in milliseconds | No |

# Usage

## Retrieve single configuration

```ts
import { NonfigService } from '@nonfig/nestjs-config';


export class MyRepoService {
    constructor(private nonfig: NonfigService) {}

    async getPricing() {
        const name = '/path/to/pricing/config'
        return this.nonfig.findByName(name)
    }

}

export class MyFacadeService {

    constructor(private repo: MyRepoService) {}
    
    async applyPricing() {
        const config = await this.repo.getPricing()
        
        // write your code here to use pricingConfig
    }   

}
```

## Retrieve multiple configurations
Example: Fetching the list of supported languages of application

```ts

// Application Controller
export class AppController {
    constructor(private service: AppService) {}

    @Get()
    async getLanguageList() {
        return this.service.getLanguageList()
    }   
}


import { NonfigService } from '@nonfig/nestjs-config';

//Application Service
export class AppService {

    constructor(private nonfig: NonfigService) {}

    async getLanguageList() {
        return this.nonfig.findByPath('/languages/list')
    }   

}
```

## Retrieve configuration using ID
```ts

import { NonfigService } from '@nonfig/nestjs-config';

//Application Service
export class AppService {

    constructor(private nonfig: NonfigService) {}

    async getSpecificTranslation(id: string) {
        return this.nonfig.findById(id)
    }   

}
```

## Retrieve multiple configurations using Labels
Example: Fetching the language of application using specific labels
```ts

// Application Controller
export class AppController {
    constructor(private service: AppService) {}

    @Get('language')
    async language(@Param('label') label: string) {
        return this.service.getLanguageByLabel(label.split(','))
    }   
}


import { NonfigService } from '@nonfig/nestjs-config';

//Application Service
export class AppService {

    constructor(private nonfig: NonfigService) {}

    async getLanguageByLabel(label: string[]): Promise<Languages[]> {
        return this.nonfig.findByLabels<Language>(label)
    }   

}
```

