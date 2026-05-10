
-- Comprehensive Marketplace Migration

-- 1. Profiles Update (ensure core fields)
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'buyer' CHECK (role IN ('buyer', 'seller', 'admin')),
ADD COLUMN IF NOT EXISTS current_mode TEXT DEFAULT 'buyer' CHECK (current_mode IN ('buyer', 'seller')),
ADD COLUMN IF NOT EXISTS trust_score INTEGER DEFAULT 80,
ADD COLUMN IF NOT EXISTS verified BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS college TEXT,
ADD COLUMN IF NOT EXISTS campus_location TEXT,
ADD COLUMN IF NOT EXISTS response_rate INTEGER DEFAULT 100,
ADD COLUMN IF NOT EXISTS trades_completed INTEGER DEFAULT 0;

-- 2. Listings Table
CREATE TABLE IF NOT EXISTS public.listings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    seller_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    buyer_id UUID REFERENCES public.profiles(id),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    price NUMERIC NOT NULL,
    category TEXT NOT NULL,
    condition TEXT NOT NULL,
    images TEXT[] NOT NULL DEFAULT '{}',
    availability_status TEXT NOT NULL DEFAULT 'available' CHECK (availability_status IN ('available', 'sold', 'rented', 'pending', 'reserved', 'pending_approval')),
    is_archived BOOLEAN NOT NULL DEFAULT false,
    is_active BOOLEAN NOT NULL DEFAULT true,
    meetup_location TEXT,
    sold_at TIMESTAMPTZ,
    reserved_until TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. Listing Requests (Buy/Rent/Bid)
CREATE TABLE IF NOT EXISTS public.listing_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    listing_id UUID NOT NULL REFERENCES public.listings(id) ON DELETE CASCADE,
    buyer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    seller_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    type TEXT NOT NULL CHECK (type IN ('buy', 'rent', 'bid')),
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'negotiating', 'completed')),
    amount NUMERIC,
    message TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4. Notifications
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('request', 'status_change', 'message', 'system')),
    is_read BOOLEAN NOT NULL DEFAULT false,
    link TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 5. Reviews (Seller Reviews)
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    listing_id UUID NOT NULL REFERENCES public.listings(id) ON DELETE CASCADE,
    reviewer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    seller_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT NOT NULL,
    is_verified_purchase BOOLEAN DEFAULT false,
    moderation_status TEXT DEFAULT 'pending' CHECK (moderation_status IN ('pending', 'approved', 'flagged')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 6. Transactions
CREATE TABLE IF NOT EXISTS public.transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    listing_id UUID NOT NULL REFERENCES public.listings(id),
    buyer_id UUID NOT NULL REFERENCES public.profiles(id),
    seller_id UUID NOT NULL REFERENCES public.profiles(id),
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'cancelled')),
    amount NUMERIC NOT NULL,
    is_verified BOOLEAN DEFAULT false,
    otp_code TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 7. Reels
CREATE TABLE IF NOT EXISTS public.reels (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    seller_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    listing_id UUID REFERENCES public.listings(id) ON DELETE SET NULL,
    video_url TEXT NOT NULL,
    thumbnail_url TEXT,
    caption TEXT,
    likes_count INTEGER DEFAULT 0,
    shares_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 8. Chat Messages (Simple Realtime Chat)
CREATE TABLE IF NOT EXISTS public.chat_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sender_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    receiver_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    listing_id UUID REFERENCES public.listings(id) ON DELETE SET NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 9. Wishlist / Saved Items
CREATE TABLE IF NOT EXISTS public.wishlist (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    listing_id UUID NOT NULL REFERENCES public.listings(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE(user_id, listing_id)
);

-- SECURITY: Enable RLS on all tables
ALTER TABLE public.listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.listing_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlist ENABLE ROW LEVEL SECURITY;

-- POLICIES (Simplified for Demo)
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Listings are viewable by everyone" ON public.listings FOR SELECT USING (true);
CREATE POLICY "Sellers can manage their listings" ON public.listings FOR ALL USING (auth.uid() = seller_id);

CREATE POLICY "Users can see their own requests" ON public.listing_requests FOR SELECT USING (auth.uid() = buyer_id OR auth.uid() = seller_id);
CREATE POLICY "Buyers can create requests" ON public.listing_requests FOR INSERT WITH CHECK (auth.uid() = buyer_id);

CREATE POLICY "Users can see their own notifications" ON public.notifications FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Anyone can view reels" ON public.reels FOR SELECT USING (true);
CREATE POLICY "Sellers can post reels" ON public.reels FOR INSERT WITH CHECK (auth.uid() = seller_id);

CREATE POLICY "Users can read their own chats" ON public.chat_messages FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = receiver_id);
CREATE POLICY "Users can send messages" ON public.chat_messages FOR INSERT WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Users can manage their own wishlist" ON public.wishlist FOR ALL USING (auth.uid() = user_id);
