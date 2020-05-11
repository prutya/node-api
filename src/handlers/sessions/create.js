const KJUR = require('jsrsasign');

const utils = require('../../utils');

module.exports = async (ctx, _next) => {
  ctx.verifyParams({
    // TODO: Email regexp
    email:    { required: true, type: 'string', empty: false, trim: false },
    password: { required: true, type: 'string', empty: false, trim: false },
  });

  console.log(ctx.repositories);

  const account = await ctx.repositories.account.findByCredentials(
    ctx.request.body.email,
    ctx.request.body.password,
  );

  if (!account) {
    return ctx.status = 422;
  }

  const currentTimeUnix = utils.currentTimeUnix();
  const jwtHeaders = { alg: 'HS256', typ: 'JWT' };
  const jwtPayload = {
    iat: currentTimeUnix,
    exp: currentTimeUnix + ctx.config.auth.tokenTtl,
    account: {
      id: account.id,
      email: account.email
    },
  };

  const jwtHeadersString = JSON.stringify(jwtHeaders);
  const jwtPayloadString = JSON.stringify(jwtPayload);
  const jwt = KJUR.jws.JWS.sign(
    'HS256',
    jwtHeadersString,
    jwtPayloadString,
    ctx.config.auth.secret
  )

  ctx.status = 200;
  ctx.body = { token: jwt };
};
