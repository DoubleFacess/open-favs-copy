import type { APIRoute } from 'astro'
import { supabase } from '../../../providers/supabase'

export const GET: APIRoute = async () => {
  
  const { data, error } = await supabase

    .from('areas').select(`
        id,
        area,
        category,
        sub_categories(
            id,
            sub_category
        )
    )`)   
    .order("id", { ascending: true })
    
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
