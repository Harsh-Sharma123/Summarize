create extension if not exists "uuid-ossp";

create table users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email varhcar(255) unique not null,
    created_at TIMESTAMP with TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP with TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    full_name varchar(255),
    customer_id varchar(255) unique,
    price_id varchar(255),
    status varchar(50) default 'inactive'
);

create table pdf_summaries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id VARCHAR(255) NOT NULL,
    original_file_url TEXT NOT NULL,
    summary_text TEXT NOT NULL,
    status varchar(50) default 'completed',
    title TEXT,
    file_name TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABE payments {
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    amount INTEGER NOT NULL,
    status VARCHAR(50) NOT NULL,
    stripe_payment_id VARCHAR(255) UNIQUE NOT NULL,
    price_id VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL references users (email),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
};

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
return TRIGGER as $$
BEGIN
    NEW.update_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpsql';

-- Add triggers to update updated_at
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pdf_summaries_updated_at
    BEFORE UPDATE ON pdf_summaries
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payments_updated_at
    BEFORE UPDATE ON payments
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 