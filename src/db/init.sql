/*
==========================================
DROP EXISTING TABLES (DEV ONLY)
==========================================
*/

DROP TABLE IF EXISTS transactions CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS users CASCADE;


/*
==========================================
USERS TABLE
==========================================
*/

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'user'
    CHECK (role IN ('admin','maintainer','user')),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),  
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()  
);

/*
==========================================
CATEGORIES TABLE
==========================================
*/

CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  user_id INTEGER NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),

  UNIQUE(name, user_id),

  FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE
);

/*
==========================================
TRANSACTIONS TABLE
==========================================
*/

CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  category_id INTEGER,
  type VARCHAR(20) NOT NULL
    CHECK (type IN ('income','expense')),
  amount DECIMAL(12,2) NOT NULL,
  description TEXT,
  transaction_date DATE NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),  
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),

  FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE,

  FOREIGN KEY (category_id)
    REFERENCES categories(id)
    ON DELETE SET NULL
);

/*
==========================================
INDEXES
==========================================
*/

CREATE INDEX idx_categories_user_id
ON categories(user_id);

CREATE INDEX idx_transactions_user_id
ON transactions(user_id);

CREATE INDEX idx_transactions_category_id
ON transactions(category_id);

CREATE INDEX idx_transactions_date
ON transactions(transaction_date);