-- DMC Institutional Vault Schema
-- Optimized for Financial Auditing and P&L Tracking

CREATE TYPE transaction_type AS ENUM ('deposit', 'withdrawal', 'interest', 'penalty', 'adjustment');
CREATE TYPE user_role AS ENUM ('retail', 'premium', 'institutional', 'admin');

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    firebase_uid VARCHAR(128) UNIQUE NOT NULL,
    full_name VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    account_status VARCHAR(50) DEFAULT 'active',
    role user_role DEFAULT 'retail',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE portfolio_ledger (
    ledger_id BIGSERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    asset_amount DECIMAL(20, 2) NOT NULL,
    balance_after DECIMAL(20, 2) NOT NULL,
    tx_type transaction_type NOT NULL,
    tx_timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    description TEXT,
    -- Audit fields
    checksum VARCHAR(64), -- Hmac/SHA for integrity
    audited BOOLEAN DEFAULT FALSE
);

CREATE INDEX idx_user_ledger ON portfolio_ledger(user_id, tx_timestamp);

-- Function to calculate net P&L for a user
CREATE OR REPLACE FUNCTION get_user_profit(u_id UUID) 
RETURNS DECIMAL(20, 2) AS $$
BEGIN
    RETURN (
        SELECT SUM(asset_amount) 
        FROM portfolio_ledger 
        WHERE user_id = u_id AND tx_type = 'interest'
    );
END;
$$ LANGUAGE plpgsql;
