// Importa la libreria 'slugify' per trasformare stringhe in slug leggibili
import slugify from 'limax';

// Importa le configurazioni per il sito e il blog
import { SITE, APP_BLOG } from 'astrowind:config';

// Importa una funzione utilitaria per rimuovere spazi bianchi da una stringa
import { trim } from '~/utils/utils';

/**
 * Rimuove eventuali barre '/' all'inizio e alla fine di una stringa.
 * @param {string} s - La stringa da elaborare.
 * @returns {string} - La stringa senza barre iniziali e finali.
 */
export const trimSlash = (s: string) => trim(trim(s, '/'));

/**
 * Combina i segmenti di percorso in una singola stringa di percorso.
 * Rimuove barre iniziali e finali extra e aggiunge una barra finale se necessario.
 * @param {...string} params - Segmenti di percorso da combinare.
 * @returns {string} - Il percorso combinato.
 */
const createPath = (...params: string[]) => {
  console.log('create path');
  console.log('params', params);

  // Pulisce e combina i segmenti di percorso
  const paths = params
    .map((el) => trimSlash(el))
    .filter((el) => !!el)
    .join('/');

  // Restituisce il percorso combinato con una barra finale se necessario
  console.log('/' + paths + (SITE.trailingSlash && paths ? '/' : ''));
  return '/' + paths + (SITE.trailingSlash && paths ? '/' : '');
};

// Imposta il percorso base per il sito, usa '/' se non definito
const BASE_PATHNAME = SITE.base || '/';

/**
 * Pulisce e trasforma una stringa in uno slug valido.
 * Rimuove spazi e caratteri speciali, e separa i segmenti con '/'.
 * @param {string} text - La stringa da trasformare in slug.
 * @returns {string} - La stringa trasformata in uno slug.
 */
export const cleanSlug = (text = '') =>
  trimSlash(text)
    .split('/')
    .map((slug) => slugify(slug))
    .join('/');

// Crea gli slug base per blog, categorie e tag
export const BLOG_BASE = cleanSlug(APP_BLOG?.list?.pathname);
export const CATEGORY_BASE = cleanSlug(APP_BLOG?.category?.pathname);
export const TAG_BASE = cleanSlug(APP_BLOG?.tag?.pathname) || 'tag';

// Crea un modello di permalink per i post del blog
export const POST_PERMALINK_PATTERN = trimSlash(APP_BLOG?.post?.permalink || `${BLOG_BASE}/%slug%`);

/**
 * Crea un URL canonico basato sul percorso fornito.
 * Aggiunge o rimuove una barra finale a seconda della configurazione del sito.
 * @param {string} [path=''] - Il percorso da convertire in URL canonico.
 * @returns {string | URL} - L'URL canonico.
 */
export const getCanonical = (path = ''): string | URL => {
  console.log('get canonical');
  const url = String(new URL(path, SITE.site));

  // Aggiusta la barra finale dell'URL in base alla configurazione del sito
  if (SITE.trailingSlash == false && path && url.endsWith('/')) {
    return url.slice(0, -1);
  } else if (SITE.trailingSlash == true && path && !url.endsWith('/')) {
    return url + '/';
  }
  return url;
};

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
