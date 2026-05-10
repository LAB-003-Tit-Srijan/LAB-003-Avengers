
-- Create listing_requests table
CREATE TABLE IF NOT EXISTS public.listing_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    listing_id UUID NOT NULL,
    buyer_id UUID NOT NULL REFERENCES public.profiles(id),
    seller_id UUID NOT NULL REFERENCES public.profiles(id),
    type TEXT NOT NULL CHECK (type IN ('buy', 'rent', 'bid')),
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'negotiating', 'completed')),
    amount NUMERIC,
    message TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create notifications table
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id),
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('request', 'status_change', 'message', 'system')),
    is_read BOOLEAN NOT NULL DEFAULT false,
    link TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Update profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'buyer' CHECK (role IN ('buyer', 'seller', 'admin')),
ADD COLUMN IF NOT EXISTS current_mode TEXT DEFAULT 'buyer' CHECK (current_mode IN ('buyer', 'seller'));

-- Enable RLS
ALTER TABLE public.listing_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Policies for listing_requests
DO $$ BEGIN
    CREATE POLICY "Users can view their own requests as buyer or seller" 
    ON public.listing_requests FOR SELECT 
    USING (auth.uid() = buyer_id OR auth.uid() = seller_id);
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE POLICY "Buyers can insert requests" 
    ON public.listing_requests FOR INSERT 
    WITH CHECK (auth.uid() = buyer_id);
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE POLICY "Sellers and buyers can update status" 
    ON public.listing_requests FOR UPDATE 
    USING (auth.uid() = buyer_id OR auth.uid() = seller_id);
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Policies for notifications
DO $$ BEGIN
    CREATE POLICY "Users can view their own notifications" 
    ON public.notifications FOR SELECT 
    USING (auth.uid() = user_id);
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE POLICY "System can insert notifications" 
    ON public.notifications FOR INSERT 
    WITH CHECK (true);
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE POLICY "Users can update their own notifications" 
    ON public.notifications FOR UPDATE 
    USING (auth.uid() = user_id);
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;
