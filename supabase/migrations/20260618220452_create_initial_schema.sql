-- Volunteer registrations
CREATE TABLE volunteers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  area_of_interest text NOT NULL,
  availability text NOT NULL,
  message text,
  created_at timestamptz DEFAULT now()
);

-- Donations
CREATE TABLE donations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  donor_name text NOT NULL,
  donor_email text NOT NULL,
  amount numeric NOT NULL,
  currency text DEFAULT 'NGN',
  purpose text,
  payment_method text NOT NULL,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Contact messages
CREATE TABLE contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  is_read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Newsletter subscriptions
CREATE TABLE newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  subscribed_at timestamptz DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE volunteers ENABLE ROW LEVEL SECURITY;
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- RLS policies: allow public inserts for all tables (website form submissions)
CREATE POLICY "insert_volunteers" ON volunteers FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "insert_donations" ON donations FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "insert_contact_messages" ON contact_messages FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "insert_newsletter" ON newsletter_subscribers FOR INSERT TO anon WITH CHECK (true);

-- Allow authenticated users (admin) to read all tables
CREATE POLICY "select_volunteers" ON volunteers FOR SELECT TO authenticated USING (true);
CREATE POLICY "select_donations" ON donations FOR SELECT TO authenticated USING (true);
CREATE POLICY "select_contact_messages" ON contact_messages FOR SELECT TO authenticated USING (true);
CREATE POLICY "select_newsletter" ON newsletter_subscribers FOR SELECT TO authenticated USING (true);
