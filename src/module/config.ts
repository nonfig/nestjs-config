/**
 * Injector Token for Module configuration
 */
export const MODULE_CONFIG = Symbol('MODULE_CONFIG');

export interface NonfigOptions {
    appId: string;
    appSecret: string;
    cacheEnable?: boolean;
    cacheTtl?: number;
    debug?: boolean;
    agent?: string;
}

/**
 * Default Module configuration
 */
export const DEFAULT_MODULE_CONFIG: Partial<NonfigOptions> = {
    cacheTtl: 60000,
    cacheEnable: true,
    debug: false,
    agent: 'NestJsBindings',
};
