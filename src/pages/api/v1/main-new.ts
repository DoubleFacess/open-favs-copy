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
  const { name, title, description, url, ratings, id_provider, user_id} = await request.json()
  const { data: mainTableData, error: mainTableError } = await supabase
    .from('main_table')
    /*
    id?: number,       
    type: string,    
    */
    .insert({      
        name, 
        title, 
        description, 
        url, 
        ratings, 
        id_provider, 
        user_id
    })
    .select()

    if (mainTableError) {
        console.error('Error inserting into main_table:', mainTableError);
        return;
    }

    // Get the inserted main_table ID
    const mainTableId = mainTableData[0].id

    // Insert into categories_tags
    const { data: categoriesTagsData, error: categoriesTagsError } = await supabase
        .from('categories_tags')
        .insert([
            {
                tag_1: 1, // Assuming a valid tag ID
                tag_2: 2, // Assuming a valid tag ID
                tag_3: 3, // Assuming a valid tag ID
                AI: false,
                id_cat: mainTableId // Link to the main_table record
            }
        ]);

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
