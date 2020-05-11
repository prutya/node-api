module.exports = async (ctx, next) => {
  await next();
  console.info(`${ctx.method} ${ctx.url} - ${ctx.state.requestProcessingTime}ms`);
};
