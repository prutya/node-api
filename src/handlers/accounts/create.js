module.exports = async (ctx, _next) => {
  ctx.verifyParams({
    // TODO: Email regexp
    email:    { required: true, type: 'string', empty: false, min: 3, max: 30,  trim: false },
    password: { required: true, type: 'string', empty: false, min: 8, max: 256, trim: false }
  });

  try {
    await ctx.repositories.account.createByCredentials(
      ctx.request.body.email,
      ctx.request.body.password
    );
  } catch (error) {
    // NOTE: The error is not thrown to hide the fact that such user does
    // potentially exist
    console.error(error);
  }

  ctx.status = 204;
};
