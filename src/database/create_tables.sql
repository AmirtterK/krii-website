-- Simple Database Creation Script with RLS
-- For Rental Booking Platform
-- Admin/Mod Management Site

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- USERS & AUTHENTICATION
-- ============================================================================

CREATE TABLE users (
    user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    phone_number VARCHAR(50),
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    address TEXT,
    profile_photo TEXT,
    location_enabled BOOLEAN DEFAULT false,
    vacation_mode BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE merchants (
    merchant_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE REFERENCES users(user_id) ON DELETE CASCADE,
    business_name VARCHAR(255) NOT NULL,
    business_license VARCHAR(255),
    verified_status BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- ITEMS & CATEGORIES
-- ============================================================================

CREATE TABLE categories (
    category_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) UNIQUE NOT NULL,
    icon TEXT
);

CREATE TYPE moderation_status AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'UNDER_REVIEW');

CREATE TABLE items (
    item_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    owner_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    merchant_id UUID REFERENCES merchants(merchant_id) ON DELETE SET NULL,
    category_id UUID REFERENCES categories(category_id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    photos TEXT[],
    status moderation_status DEFAULT 'PENDING',
    average_rating DECIMAL(3,2) DEFAULT 0.00,
    total_reviews INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE calendars (
    calendar_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    item_id UUID UNIQUE REFERENCES items(item_id) ON DELETE CASCADE,
    unavailable_dates JSONB DEFAULT '[]'::jsonb
);

-- ============================================================================
-- FAVORITES
-- ============================================================================

CREATE TABLE favorites (
    favorite_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    item_id UUID REFERENCES items(item_id) ON DELETE CASCADE,
    added_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, item_id)
);

-- ============================================================================
-- RENTAL REQUESTS & BOOKINGS
-- ============================================================================

CREATE TYPE request_status AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED', 'EXPIRED', 'CANCELLED');

CREATE TABLE rental_requests (
    request_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    item_id UUID REFERENCES items(item_id) ON DELETE CASCADE,
    borrower_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    owner_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    request_date TIMESTAMPTZ DEFAULT NOW(),
    start_date TIMESTAMPTZ NOT NULL,
    end_date TIMESTAMPTZ NOT NULL,
    status request_status DEFAULT 'PENDING',
    pickup_location TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TYPE booking_status AS ENUM ('CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

CREATE TABLE bookings (
    booking_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    request_id UUID UNIQUE REFERENCES rental_requests(request_id) ON DELETE CASCADE,
    confirmed_at TIMESTAMPTZ DEFAULT NOW(),
    pickup_location TEXT,
    start_time TIMESTAMPTZ NOT NULL,
    return_time TIMESTAMPTZ NOT NULL,
    status booking_status DEFAULT 'CONFIRMED',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE direct_bookings (
    direct_booking_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID UNIQUE REFERENCES bookings(booking_id) ON DELETE CASCADE,
    auto_confirm BOOLEAN DEFAULT true,
    minimum_hours INTEGER
);

-- ============================================================================
-- RATINGS
-- ============================================================================

CREATE TABLE ratings (
    rating_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    item_id UUID REFERENCES items(item_id) ON DELETE CASCADE,
    booking_id UUID REFERENCES bookings(booking_id) ON DELETE CASCADE,
    reviewer_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    stars INTEGER CHECK (stars >= 1 AND stars <= 5),
    comment TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- CONVERSATIONS & MESSAGES
-- ============================================================================

CREATE TABLE conversations (
    conversation_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    request_id UUID UNIQUE REFERENCES rental_requests(request_id) ON DELETE CASCADE,
    participant_ids TEXT[],
    last_message_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE messages (
    message_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID REFERENCES conversations(conversation_id) ON DELETE CASCADE,
    sender_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    receiver_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    content TEXT,
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    is_read BOOLEAN DEFAULT false
);

-- ============================================================================
-- INDEXES
-- ============================================================================

CREATE INDEX idx_items_owner ON items(owner_id);
CREATE INDEX idx_items_status ON items(status);
CREATE INDEX idx_rental_requests_status ON rental_requests(status);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_messages_conversation ON messages(conversation_id);

-- ============================================================================
-- ENABLE ROW LEVEL SECURITY (RLS)
-- ============================================================================

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE merchants ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE items ENABLE ROW LEVEL SECURITY;
ALTER TABLE calendars ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE rental_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE direct_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- RLS POLICIES (Allow service role to access everything for admin site)
-- ============================================================================

-- Users policies
CREATE POLICY "Service role can access all users" ON users
    FOR ALL USING (true);

-- Merchants policies
CREATE POLICY "Service role can access all merchants" ON merchants
    FOR ALL USING (true);

-- Categories policies (public read)
CREATE POLICY "Anyone can read categories" ON categories
    FOR SELECT USING (true);

CREATE POLICY "Service role can manage categories" ON categories
    FOR ALL USING (true);

-- Items policies
CREATE POLICY "Service role can access all items" ON items
    FOR ALL USING (true);

-- Calendars policies
CREATE POLICY "Service role can access all calendars" ON calendars
    FOR ALL USING (true);

-- Favorites policies
CREATE POLICY "Service role can access all favorites" ON favorites
    FOR ALL USING (true);

-- Rental requests policies
CREATE POLICY "Service role can access all rental requests" ON rental_requests
    FOR ALL USING (true);

-- Bookings policies
CREATE POLICY "Service role can access all bookings" ON bookings
    FOR ALL USING (true);

-- Direct bookings policies
CREATE POLICY "Service role can access all direct bookings" ON direct_bookings
    FOR ALL USING (true);

-- Ratings policies
CREATE POLICY "Service role can access all ratings" ON ratings
    FOR ALL USING (true);

-- Conversations policies
CREATE POLICY "Service role can access all conversations" ON conversations
    FOR ALL USING (true);

-- Messages policies
CREATE POLICY "Service role can access all messages" ON messages
    FOR ALL USING (true);

-- ============================================================================
-- SEED DATA (Categories)
-- ============================================================================

INSERT INTO categories (name, icon) VALUES
    ('Electronics', '📱'),
    ('Tools', '🔧'),
    ('Sports', '⚽'),
    ('Vehicles', '🚗'),
    ('Photography', '📷'),
    ('Music', '🎸'),
    ('Outdoor', '🏕️'),
    ('Home & Garden', '🏠'),
    ('Party & Events', '🎉'),
    ('Other', '📦');