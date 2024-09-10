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
  const { name, title, description, url, ratings, id_provider, user_id, AI, AI_think, id_cat, tag_3, tag_4, tag_5} = await request.json();

  // Inserisci nella tabella main_table e seleziona l'ID
  const { data: insertData, error: insertError } = await supabase
    .from('main_table')
    .insert({
      name,
      title,
      description,
      url,
      id_provider,
      user_id,
      AI,
      ratings,
    })
    .select();

  if (insertError) {
    return new Response(
      JSON.stringify({
        error: insertError.message,
      }),
      { status: 500 },
    );
  }
  
  const id_main = insertData ? insertData[0].id : -1

  

  // Prepara il payload per la tabella categories_tags
  const payload = {
    id_main,
    tag_3: tag_3 ? tag_3 : -1,
    id_cat: id_cat ? id_cat : -1,
    AI_think,   
    tag_4: tag_4 ? tag_4 : -1,
    tag_5: tag_5 ? tag_5 : -1
  }
  
  // Inserisci nella tabella categories_tags

  console.log('ids: ', id_cat, tag_3, tag_4, tag_5)
  const { data: tagData, error: tagError } = await supabase
    
    .from('categories_tags')
    .insert(payload)  
    .select()
  

  if (tagError) {
    return new Response(
      JSON.stringify({
        error: tagError.message,
      }),
      { status: 500 },
    );
  }
  console.log(tagData)
  return new Response(JSON.stringify(tagData), { status: 200 });
}
