import type { APIRoute } from 'astro'
import { supabase } from '../../../../providers/supabase'

export const GET: APIRoute = async () => {
  
  const { data, error } = await supabase
    .from('lists_users').select(`
      id,
      name
    `)   
    .order("id", { ascending: true });
    
  if (error) {
    return new Response(
      JSON.stringify({
        error: error.message,
      }),
      { status: 500 },
    );
  }

  return new Response(JSON.stringify(data))
}