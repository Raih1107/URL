import { createClient } from '@supabase/supabase-js';

// Use the correct environment variable names for Vercel
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_KEY
);

export default async function handler(req, res) {
  const { slug } = req.query;

  const { data, error } = await supabase
    .from('urls')
    .select('original_url')
    .eq('short_url', slug)
    .single();

  if (data?.original_url) {
    res.writeHead(302, { Location: data.original_url });
    res.end();
  } else {
    res.status(404).json({ error: 'Short URL not found' });
  }
}
