import type { APIRoute } from 'astro'
import { supabase } from '../../../providers/supabase'

export const GET: APIRoute = async ({ params }) => {
    const { id } = params;  // Supponiamo che l'ID venga passato come parametro dell'URL
    
    // Query per filtrare l'area in base all'ID
    const { data, error } = await supabase
      .from('areas')
      .select(`
        id,
        name,
        title,
        description        
      `)
      .eq('id', id)      
  
    if (error) {
      return new Response(
        JSON.stringify({
          error: error.message,
        }),
        { status: 500 },
      );
    }
  
    return new Response(
      JSON.stringify({
        data,
      }),
      { status: 200 },
    );
  };