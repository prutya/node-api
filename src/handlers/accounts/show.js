const authenticateAccount = require('../../services/authenticateAccount');

module.exports = async (ctx, _next) => {
  if (!(await authenticateAccount(ctx))) {
    return;
  }

  console.log(ctx.params);
  console.log(ctx.state);

  if (ctx.params.id != ctx.state.currentAccount.id) {
    return ctx.status = 403;
  }

  const acc = ctx.state.currentAccount;

  ctx.status = 200;
  ctx.body = {
    id: acc.id,
    email: acc.email,
  };
};
