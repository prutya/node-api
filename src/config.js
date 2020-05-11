const url = require('url');

class Config {
  constructor(env) {
    this.port = this.initPort(env),
    this.auth = {
      cryptCost: this.initCryptCost(env),
      tokenTtl: this.initAuthTokenTtl(env),
      secret: this.initAuthSecret(env),
    },
    this.db = this.initDbConfig(env);
  }

  initPort(env) {
    const port = parseInt(env['APP_PORT']);

    if (isNaN(port)) {
      return 3000;
    }

    return port;
  }

  initCryptCost(env) {
    const cryptCostParsed = parseInt(env['APP_CRYPT_COST']);

    if (isNaN(cryptCostParsed)) {
      return 12;
    }

    return cryptCostParsed;
  }

  initAuthSecret(env) {
    const secret = env['APP_AUTH_TOKEN_SECRET'];

    if (!secret) {
      throw new Error('APP_AUTH_TOKEN_SECRET is missing');
    }

    return secret;
  }

  initAuthTokenTtl(env) {
    const tokenTtlParsedSec = parseInt(env['APP_AUTH_TOKEN_TTL']);

    if (isNaN(tokenTtlParsedSec)) {
      return 10 * 24 * 60 * 60; // 10 Days
    }

    return tokenTtlParsedSec;
  }

  initDbConfig(env) {
    const params = url.parse(env['APP_DATABASE_URL']);
    const auth = params.auth.split(':');
    const maxConnectionsParsed = parseInt(env['APP_DATABASE_MAX_CONNECTIONS']);

    return {
      user: auth[0],
      password: auth[1],
      host: params.hostname,
      port: params.port,
      database: params.pathname.split('/')[1],
      ssl: env['APP_DATABASE_SSL'] == 'true' ? true : false,
      max: isNaN(maxConnectionsParsed) ? 5 : maxConnectionsParsed,
      // idleTimeoutMillis: 1000, // close idle clients after 1 second
      // connectionTimeoutMillis: 1000, // return an error after 1 second if connection could not be established
      // maxUses: 7500, // close (and replace) a connection after it has been used 7500 times
    };
  }
}

module.exports = Config;
