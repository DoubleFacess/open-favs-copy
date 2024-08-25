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
    id_cat: number,
    id_subcat: number,
    ratings: number,
    url: string,
    description: string,
    name: string,
    title: string,
    AI: boolean
}

interface SubMainFormData {
  id_src: string,
  user_id: string
}
