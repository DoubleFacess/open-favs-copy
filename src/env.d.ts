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

/*
let siteObj = {  
  domain: null,
  author: null,
  canonical: null,
  image: null,
  icon: null,
  logo: null,
  keywords: null,    
  id_cat: null,
  id_sub_cat: null,
  ratings: null,  
  id_provider: null,
  AI: null,
  AI_think: null,
  AI_summary: null,
  tag_1: null,
  tag_2: null,
  tag_3: null,
  tag_4: null,
  tag_5: null
}
*/

interface SubMainFormData {
  id_src: string,
  user_id: string
}
