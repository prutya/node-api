-- TODO: This is a temporary file. Migrations should be managed in a different way.

CREATE EXTENSION pgcrypto;

CREATE TABLE accounts (
  id                uuid                        PRIMARY KEY DEFAULT gen_random_uuid(),
  email             text                        NOT NULL UNIQUE,
  password_digest   text                        NOT NULL,
  email_verified_at timestamp without time zone,
  created_at        timestamp without time zone NOT NULL DEFAULT current_timestamp,
  updated_at        timestamp without time zone NOT NULL DEFAULT current_timestamp
);
