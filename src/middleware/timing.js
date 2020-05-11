module.exports = async (ctx, next) => {
  const start = Date.now();

  await next();

  ctx.state.requestProcessingTime = Date.now() - start;
}
