import {Injectable, Inject, NotFoundException} from '@nestjs/common';
import {MODULE_CONFIG, NonfigOptions} from './config';
import {Configuration, nonfig, Nonfig} from '@nonfig/node-sdk';
import {get, isEmpty} from 'lodash';
/**
 * Useful service
 */
@Injectable()
export class NonfigService {
    private client: Nonfig;

    /**
     * Creates a new `NonfigService`
     * @param config Provided configuration
     */
    constructor(@Inject(MODULE_CONFIG) private config: NonfigOptions) {
        this.client = nonfig(config);
    }

    public async findByName(name: string): Promise<Configuration> {
        let requestedName = name;

        if (!requestedName.startsWith('/')) {
            requestedName = `/${requestedName}`;
        }

        const response = await this.client.findByName(requestedName);
        const configuration = get(response, '0', null);

        if (isEmpty(configuration)) {
            throw new NotFoundException(
                'Configuration with the given name is not found'
            );
        }

        return configuration;
    }

    public async findByPath(path: string): Promise<Configuration[]> {
        let requestedPath = path;

        if (!requestedPath.startsWith('/')) {
            requestedPath = `/${requestedPath}`;
        }

        const configurations = await this.client.findByPath(requestedPath);

        if (isEmpty(configurations)) {
            throw new NotFoundException(
                'Configurations with the given path are not found'
            );
        }

        return configurations;
    }

    public async findById(id: string): Promise<Configuration[]> {
        const response = await this.client.findById(id);
        const configuration = get(response, '0', null);

        if (isEmpty(configuration)) {
            throw new NotFoundException(
                'Configuration with the given id is not found'
            );
        }

        return configuration;
    }

    public async findByLabels(labels: string[]): Promise<Configuration[]> {
        const configurations = await this.client.findByLabels(labels);

        if (isEmpty(configurations)) {
            throw new NotFoundException(
                'Configurations with the given labels are not found'
            );
        }

        return configurations;
    }
}
