CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(320) NOT NULL,
  password CHAR(60) NOT NULL
);

CREATE UNIQUE INDEX ON users((lower(email)));

CREATE TABLE accounts (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  balance NUMERIC(100, 2),
  user_id INTEGER REFERENCES users(id)
);

ALTER TABLE accounts ALTER COLUMN balance SET DEFAULT 0;