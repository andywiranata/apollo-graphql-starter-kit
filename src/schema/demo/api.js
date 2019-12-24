import { RESTDataSource } from 'apollo-datasource-rest';
import LOG from '../../lib/logger';

const fileName = module.filename;
const LOGGER = LOG.getLogger({ fileName });
const options = { cacheOptions: { ttl: 120 } };

export default class extends RESTDataSource {
    willSendRequest(request) {
        request.headers.set('Authorization', this.context.token);
    }

    get baseURL() {
        return this.context.settings.demoService.baseUri;
    }
    async getName({ type = 'web' }) {
        const url = this.context.api.demo.name.uri.format(type.toLowerCase());
        LOGGER.info(`demo - get all demo with type ${type}`);
        const response = await this.get(url, {}, options);
        return response;
    }
}
