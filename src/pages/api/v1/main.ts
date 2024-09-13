import type { APIRoute } from 'astro'
import { supabase } from '../../../providers/supabase'

export const GET: APIRoute = async () => {
  
  const { data, error } = await supabase
    .from('main_table').select(`
      id,
      name,
      id_cat,
      ratings,
      url,
      description,    
      main_category (
        id, 
        cat_name 
      )
    `)   
    //.order("id", { ascending: true });
    
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

export const POST: APIRoute = async ({ request }) => {
  const { id_cat, id_sub_cat, ratings, url, description, name, title, id_provider, user_id, AI } = await request.json()
  const { data, error } = await supabase
    .from('main_table')
    .insert({ id_cat, id_sub_cat, ratings, url, description, name, title, id_provider, user_id, AI })
    .select()

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
