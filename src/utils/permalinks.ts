import {trimSlash , createPath, cleanSlug, getCanonical} from './permalinks-utils'

import { SITE, APP_BLOG } from 'astrowind:config' // Importa le configurazioni per il sito e il blog

const BASE_PATHNAME = SITE.base || '/' // Imposta il percorso base per il sito, usa '/' se non definito

// Crea gli slug base per blog, categorie e tag
export const BLOG_BASE = cleanSlug(APP_BLOG?.list?.pathname);
export const CATEGORY_BASE = cleanSlug(APP_BLOG?.category?.pathname);
export const TAG_BASE = cleanSlug(APP_BLOG?.tag?.pathname) || 'tag';

// Crea un modello di permalink per i post del blog
export const POST_PERMALINK_PATTERN = trimSlash(APP_BLOG?.post?.permalink || `${BLOG_BASE}/%slug%`);

/**
 * Genera un permalink basato sul tipo di percorso e sullo slug fornito.
 * @param {string} [slug=''] - Lo slug da usare nel permalink.
 * @param {string} [type='page'] - Il tipo di percorso (es. 'home', 'blog', 'asset', etc.).
 * @returns {string} - Il permalink generato.
 */
export const getPermalink = (slug = '', type = 'page'): string => {
  console.log('get permalink');
  let permalink: string;

  // Restituisce direttamente gli URL assoluti o speciali
  if (
    slug.startsWith('https://') ||
    slug.startsWith('http://') ||
    slug.startsWith('://') ||
    slug.startsWith('#') ||
    slug.startsWith('javascript:')
  ) {
    return slug;
  }

  // Genera il permalink in base al tipo di percorso
  switch (type) {
    case 'home':
      permalink = getHomePermalink();
      break;
    case 'blog':
      permalink = getBlogPermalink();
      break;
    case 'asset':
      permalink = getAsset(slug);
      break;
    case 'category':
      permalink = createPath(CATEGORY_BASE, trimSlash(slug));
      break;
    case 'tag':
      permalink = createPath(TAG_BASE, trimSlash(slug));
      break;
    case 'post':
      permalink = createPath(trimSlash(slug));
      break;
    case 'page':
    default:
      permalink = createPath(slug);
      break;
  }

  return definitivePermalink(permalink);
};

/**
 * Restituisce il permalink per la pagina principale del sito.
 * @returns {string} - Il permalink per la home page.
 */
export const getHomePermalink = (): string => getPermalink('/');

/**
 * Restituisce il permalink per la pagina "About".
 * @returns {string} - Il permalink per la pagina "About".
 */
export const getAboutPermalink = (): string => getPermalink('/about');

/**
 * Restituisce il permalink per la pagina di login.
 * @returns {string} - Il permalink per la pagina di login.
 */
export const getLoginPermalink = (): string => getPermalink('/login/signin');

/**
 * Restituisce il permalink per la pagina del blog.
 * @returns {string} - Il permalink per la pagina del blog.
 */
export const getBlogPermalink = (): string => getPermalink(BLOG_BASE);

/**
 * Crea un percorso per un asset basato sul percorso fornito.
 * @param {string} path - Il percorso dell'asset.
 * @returns {string} - Il percorso completo per l'asset.
 */
export const getAsset = (path: string): string =>
  '/' +
  [BASE_PATHNAME, path]
    .map((el) => trimSlash(el))
    .filter((el) => !!el)
    .join('/');

/**
 * Aggiunge il percorso base al permalink generato per garantirne la completezza.
 * @param {string} permalink - Il permalink generato.
 * @returns {string} - Il permalink definitivo.
 */
const definitivePermalink = (permalink: string): string => createPath(BASE_PATHNAME, permalink);

/**
 * Applica la funzione `getPermalink` a tutti i valori `href` in un oggetto o array.
 * Utilizza il tipo specificato per generare i permalink corretti.
 * @param {object} [menu={}] - L'oggetto o array di menu da elaborare.
 * @returns {object} - L'oggetto o array con i permalink applicati.
 */
export const applyGetPermalinks = (menu: object = {}) => {
  console.log('apply get permalink');
  
  if (Array.isArray(menu)) {
    return menu.map((item) => applyGetPermalinks(item));
  } else if (typeof menu === 'object' && menu !== null) {
    const obj = {};
    
    for (const key in menu) {
      if (key === 'href') {
        if (typeof menu[key] === 'string') {
          obj[key] = getPermalink(menu[key]);
        } else if (typeof menu[key] === 'object') {
          if (menu[key].type === 'home') {
            obj[key] = getHomePermalink();
          } else if (menu[key].type === 'blog') {
            obj[key] = getBlogPermalink();
          } else if (menu[key].type === 'asset') {
            obj[key] = getAsset(menu[key].url);
          } else if (menu[key].url) {
            obj[key] = getPermalink(menu[key].url, menu[key].type);
          }
        }
      } else {
        obj[key] = applyGetPermalinks(menu[key]);
      }
    }
    
    return obj;
  }
  
  return menu;
};
