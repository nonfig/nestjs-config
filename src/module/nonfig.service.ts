import {Injectable, Inject, NotFoundException} from '@nestjs/common';
import {MODULE_CONFIG, NonfigOptions} from './config';
import {IRequestOption, nonfig, Nonfig} from '@nonfig/node-sdk';
import {get} from 'lodash';

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

    public async findByName<T>(
        name: string,
        options?: IRequestOption
    ): Promise<T | any> {
        let requestedName = name;

        if (!requestedName.startsWith('/')) {
            requestedName = `/${requestedName}`;
        }

        try {
            const response = await this.client.findByName(
                requestedName,
                options
            );

            return get(response, '0.data', null);
        } catch (e) {
            throw new NotFoundException(
                'Configuration with the given name is not found'
            );
        }
    }

    public async findByPath<T>(
        path: string,
        options?: IRequestOption
    ): Promise<T[] | any[]> {
        let requestedPath = path;

        if (!requestedPath.startsWith('/')) {
            requestedPath = `/${requestedPath}`;
        }

        try {
            const configurations = await this.client.findByPath(
                requestedPath,
                options
            );

            return configurations.map(({data}) => data);
        } catch (e) {
            throw new NotFoundException(
                'Configurations with the given path are not found'
            );
        }
    }

    public async findById<T>(
        id: string,
        options?: IRequestOption
    ): Promise<T | any> {
        try {
            const response = await this.client.findById(id, options);

            return get(response, '0.data', null);
        } catch (e) {
            throw new NotFoundException(
                'Configuration with the given id is not found'
            );
        }
    }

    public async findByLabels<T>(
        labels: string[],
        options?: IRequestOption
    ): Promise<T[] | any[]> {
        try {
            const configurations = await this.client.findByLabels(
                labels,
                options
            );

            return configurations.map(({data}) => data);
        } catch (e) {
            throw new NotFoundException(
                'Configurations with the given labels are not found'
            );
        }
    }
}
