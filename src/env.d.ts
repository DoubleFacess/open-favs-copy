// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="vite/client" />
/// <reference types="../vendor/integration/types.d.ts" />
/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    email: string;
    id: string;
  }
}

interface MainFormData {
  id?: number;
  id_cat: number;
  id_subcat: number;
  ratings: number;
  url: string;
  description: string;
  name: string;
}

interface SubMainFormData {
  id_src: string;
  user_id: string;
}
