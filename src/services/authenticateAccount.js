const KJUR = require('jsrsasign');

const utils = require('../utils');

const fail = (ctx) => {
  ctx.status = 401;

  return false;
}

module.exports = async (ctx) => {
  let jwt = ctx.request.headers['authorization']?.split(' ')[1];

  if (!jwt) {
    return fail(ctx);
  }

  const jwtValid = KJUR.jws.JWS.verifyJWT(
    jwt,
    ctx.config.auth.secret,
    {
      alg: ['HS256'],
      verifyAt: utils.currentTimeUnix(),
    },
  );

  if (!jwtValid) {
    return fail(ctx);
  }

  try {
    jwt = KJUR.jws.JWS.parse(jwt)?.payloadObj;
  } catch {
    return fail(ctx);
  }

  const account = await ctx.repositories.account.findById(jwt.account.id);

  if (!account) {
    return fail(ctx);
  }

  ctx.state.currentAccount = account;

  return true;
}
