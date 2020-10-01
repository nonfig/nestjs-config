import {
    Module,
    DynamicModule,
    UnauthorizedException,
    Global,
} from '@nestjs/common';
import {MODULE_CONFIG, DEFAULT_MODULE_CONFIG, NonfigOptions} from './config';
import {NonfigService} from './nonfig.service';
/**
 * Module description
 */
@Global()
@Module({})
export class NonfigModule {
    /**
     * Register the module
     * @param options configuration for module
     */
    static register(
        options: Omit<NonfigOptions, 'agent' | 'cacheEnable'>
    ): DynamicModule {
        if (!options.appId || !options.appSecret) {
            throw new UnauthorizedException(
                'Application ID or Secret is missing'
            );
        }

        return {
            module: NonfigModule,
            providers: [
                {
                    provide: MODULE_CONFIG,
                    useValue: {...DEFAULT_MODULE_CONFIG, ...options},
                },
                NonfigService,
            ],
            exports: [NonfigService],
        };
    }
}
