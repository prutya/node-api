class Account {
  constructor(db, config) {
    this.db = db;
    this.config = config;
  }

  async createByCredentials(email, password) {
    return (
      await this.db.query(`
        INSERT INTO accounts (
          email,
          password_digest
        )
        VALUES (
          $1,
          crypt($2, gen_salt('bf', $3))
        )
      `, [email, password, this.config.auth.cryptCost])
    );
  }

  async findByCredentials(email, password) {
    return (
      await this.db.query(`
        SELECT id, email
        FROM accounts
        WHERE email = $1
          AND password_digest = crypt($2, password_digest)
        LIMIT 1
      `, [email, password])
    ).rows[0];
  }

  async findById(id) {
    return (
      await this.db.query(`
        SELECT *
        FROM accounts
        WHERE id = $1
        LIMIT 1
      `, [id])
    ).rows[0];
  }
}

module.exports = Account;
