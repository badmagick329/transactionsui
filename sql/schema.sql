CREATE TABLE IF NOT EXISTS tran_codes (id INTEGER PRIMARY KEY, code VARCHAR(4) UNIQUE);
CREATE TABLE IF NOT EXISTS aliases (
  id INTEGER PRIMARY KEY,
  alias_text VARCHAR(50) UNIQUE
);
CREATE TABLE IF NOT EXISTS descriptions (
  id INTEGER PRIMARY KEY,
  description_text VARCHAR(255) UNIQUE
);
CREATE TABLE IF NOT EXISTS alias_desc (
  id INTEGER PRIMARY KEY,
  alias_id INTEGER,
  description_id INTEGER,
  FOREIGN KEY(alias_id) REFERENCES aliases(id) ON DELETE CASCADE,
  FOREIGN KEY(description_id) REFERENCES descriptions(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS transactions (
  id INTEGER PRIMARY KEY,
  date VARCHAR(10),
  amount REAL,
  description_id INTEGER,
  code_id INTEGER,
  FOREIGN KEY(description_id) REFERENCES descriptions(id) ON DELETE CASCADE,
  FOREIGN KEY(code_id) REFERENCES codes(id) ON DELETE CASCADE
);
