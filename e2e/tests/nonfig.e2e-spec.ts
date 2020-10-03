import { Test } from '@nestjs/testing'
import {INestApplication, NotFoundException, UnauthorizedException} from '@nestjs/common'
import {NonfigModule} from '../../src'
import {MockController} from '../mock/mock.controller'

describe('E2E for Nonfig NestJs', () => {
    let controller: MockController;
    let module: INestApplication;

    beforeAll(async () => {
        const testModule = await Test.createTestingModule({
            imports: [
                NonfigModule.register({
                    appId: process.env.NONFIG_APP_ID,
                    appSecret: process.env.NONFIG_APP_SECRET
                })
            ],
            controllers: [MockController]
        }).compile()
        module = testModule.createNestApplication()

        await module.init()

        controller = module.get(MockController);
    })

    describe('Register Module', () => {
        it('Should throw Error without appId and appSecret', async () => {
            try {
                await Test.createTestingModule({
                    imports: [
                        NonfigModule.register({
                            appId: process.env.NONEXISTENT_NONFIG_APP_ID,
                            appSecret: process.env.NONEXISTENT_NONFIG_APP_SECRET
                        })
                    ],

                }).compile()
            }
            catch (e) {
                expect(e).toBeInstanceOf(UnauthorizedException)
            }
        })
    })

    describe('Retrieve Single Configuration', () => {

        it('find by name', async () => {
            const response = { name: 'fetch by name' }
            const config = await controller.name(process.env.BY_NAME)
            expect(config).toEqual(response)
        })

        it('find by name with starting `/`', async () => {
            const response = { name: 'fetch by name' }
            const config = await controller.name(`/${process.env.BY_NAME}`)
            expect(config).toEqual(response)
        })

        it('find by id', async () => {
            const response = { name: 'fetch by id' }
            const config = await controller.id(process.env.BY_ID)
            expect(config).toEqual(response)
        })

    })

    describe('Retrieve Multiple Configurations', () => {

        it('find by path', async () => {
            const configs = await controller.path(process.env.BY_PATH)
            expect(configs.length).toEqual(4)
        })

        it('find by path with starting `/`', async () => {
            const configs = await controller.path(`/${process.env.BY_PATH}`)
            expect(configs.length).toEqual(4)
        })

        it('find by labels', async () => {
            const config = { name: 'fetch by labels' }
            const configs = await controller.labels(process.env.BY_LABEL)
            expect(configs.length).toEqual(1)
            expect(configs[0]).toEqual(config)
        })

    })

    describe('Fails to retrieve configuration', () => {
        it('find by non-existent name', async () => {
            try {
                await controller.name('non-existing-folder/non-existing-name')
            }
            catch (e) {
                expect(e).toBeInstanceOf(NotFoundException)
            }
        })


        it('find by non-existent path', async () => {
            try {
                await controller.path('non-existent-folder')
            }
            catch (e) {
                expect(e).toBeInstanceOf(NotFoundException)
            }
        })

        it('find by non-existent id', async () => {
            try {
                await controller.id('0708d769-some-non-existing-id-90d2b6c2ff')
            }
            catch (e) {
                expect(e).toBeInstanceOf(NotFoundException)
            }
        })

        it('find by non-existent label', async () => {
            try {
                await controller.labels('non-existing-label')
            }
            catch (e) {
                expect(e).toBeInstanceOf(NotFoundException)
            }
        })
    })

})
