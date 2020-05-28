"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _ioredis = require('ioredis'); var _ioredis2 = _interopRequireDefault(_ioredis);

class Cache {
    constructor() {
        this.redis = new (0, _ioredis2.default)({
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT,
            keyPrefix: 'cache:',
        });
    }

    // Caso a lista não mude em 24 h ela será esvaziada automaticamente
    set(key, value) {
        return this.redis.set(key, JSON.stringify(value), 'EX', 60 * 60 * 24);
    }

    async get(key) {
        const cached = await this.redis.get(key);

        return cached ? JSON.parse(cached) : null;
    }

    invalidate(key) {
        return this.redis.del(key);
    }

    async invalidatePrefix(prefix) {
        const keys = await this.redis.keys(`cache:${prefix}:*`);

        const keysWithoutPrefix = keys.map(key => key.replace('cache:', ''));

        return this.redis.del(keysWithoutPrefix);
    }
}

exports. default = new Cache();
