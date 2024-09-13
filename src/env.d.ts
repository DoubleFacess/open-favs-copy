/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare namespace App {
    interface Locals {
      email: string,
      id: string,
      user_name: string
    }
}

interface MainFormData {
  id?: number,
  user_id: string,
  name: string,
  title: string,
  description: string,
  url: string,
  type: string,
  id_cat: number,
  id_subcat: number,
  ratings: number,
  AI: boolean
}

interface PostData {
  user_id: string,
  name: string,
  title: string,
  description: string,
  url: string,
  domain: string,
  type: string,
  author: string,
  canonical: string,
  image: string,
  icon: string,
  logo: string,
  keywords: [],    
  id_cat: number,
  id_sub_cat: number,
  ratings: number,  
  id_provider: number,
  AI: boolean,
  AI_think: string,
  AI_summary: string,
  tag_1: number,
  id_cat: number,
  tag_3: number,
  tag_4: number,
  tag_5: number,
  accessible: boolean,
  domain_exists: boolean,
  html_content_exists: boolean,
  redirect_exists: boolean,
  secure: boolean,
  status_code: number,
  valid_url: boolean
}

interface SubMainFormData {
  id_src: string,
  user_id: string
}
