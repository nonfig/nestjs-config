import { Controller } from '@nestjs/common';
import {NonfigService} from "../../src/module";

@Controller()
export class MockController {

    constructor(private nonfig: NonfigService) {}

    async name(name: string) {
        return this.nonfig.findByName(name)
    }

    async id(id: string) {
        return this.nonfig.findById(id)
    }

    async path(path: string) {
        return this.nonfig.findByPath(path)
    }

    async labels(labels: string) {
        return this.nonfig.findByLabels(labels.split(','))
    }

}
