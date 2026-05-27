CREATE TABLE users(   id SERIAL PRIMARY KEY,  name VARCHAR(50),  email VARCHAR(50),  password VARCHAR(100));

CREATE TABLE groups(
  id SERIAL PRIMARY KEY,
  name VARCHAR(50),
  token VARCHAR
);

CREATE TABLE members(
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  group_id INTEGER REFERENCES groups(id)
);

CREATE TABLE expenses(
  id SERIAL PRIMARY KEY,
  description VARCHAR(200),
  amount NUMERIC(10,2),
  user_id INTEGER REFERENCES users(id),
  group_id INTEGER REFERENCES groups(id)
);

CREATE TABLE settlements(
  id SERIAL PRIMARY KEY,
  user_creditor_id INTEGER REFERENCES users(id),
  group_id INTEGER REFERENCES groups(id),
  paid BOOLEAN,
  user_debtor_id INTEGER REFERENCES users(id),
  amount NUMERIC(10,2)
);