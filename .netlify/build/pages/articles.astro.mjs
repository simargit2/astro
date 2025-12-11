import { c as createComponent, i as renderHead, j as renderComponent, f as addAttribute, r as renderTemplate } from '../chunks/astro/server_CPzmFbWL.mjs';
import 'piccolore';
import { f as fetchNews } from '../chunks/fetchnews_DxqIi70J.mjs';
import { $ as $$Navbar, a as $$Footer } from '../chunks/Navbar_qEm4KY4t.mjs';
/* empty css                                */
export { renderers } from '../renderers.mjs';

const $$Articles = createComponent(async ($$result, $$props, $$slots) => {
  const newsData = await fetchNews({
    date: "2025-12-04",
    page: 1,
    limit: 12,
    sector: "All"
  });
  const createSlug = (text) => {
    return text ? text.toString().toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "").replace(/\-\-+/g, "-") : "article";
  };
  return renderTemplate`<html lang="en"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>News – Whalesbook</title>${renderHead()}</head> <body class="min-h-screen bg-black text-slate-50 font-sans antialiased"> ${renderComponent($$result, "Navbar", $$Navbar, {})} <main class="max-w-7xl mx-auto px-6 py-12"> <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"> ${newsData?.data?.map((article) => {
    const category = createSlug(article.suggestedSector || "general");
    const slug = createSlug(article.translations?.[0]?.headline || "untitled");
    const id = article._id;
    return renderTemplate`<li class="group border border-neutral-800 rounded-xl p-4 bg-neutral-900/60 backdrop-blur-sm transition-all duration-300 hover:bg-neutral-900 hover:border-neutral-700 hover:shadow-2xl hover:shadow-indigo-500/10"> <a${addAttribute(`/news/english/${category}/${slug}/${id}`, "href")} class="flex flex-col h-full"> <div class="overflow-hidden rounded-lg mb-4 bg-neutral-800 border border-neutral-800 relative"> <img${addAttribute(article.imageUrl || "https://via.placeholder.com/400x250", "src")}${addAttribute(article.translations?.[0]?.headline, "alt")} class="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy">  <div class="absolute top-2 left-2 bg-black/70 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider text-white border border-white/10"> ${article.suggestedSector || "News"} </div> </div> <!-- Title --> <h2 class="text-xl font-bold mb-3 text-white leading-snug group-hover:text-indigo-400 transition-colors"> ${article.translations?.[0]?.headline} </h2> <!-- Crux --> <p class="text-neutral-400 text-sm mb-6 line-clamp-3 leading-relaxed flex-grow"> ${article.crux || "No description available."} </p> <!-- Footer / Read more --> <div class="mt-auto flex items-center justify-between border-t border-neutral-800 pt-3"> <span class="text-[10px] text-neutral-500 uppercase font-semibold tracking-wider"> ${new Date(article.scrappedAt || Date.now()).toLocaleDateString("en-GB", { day: "numeric", month: "short" })} </span> <span class="inline-flex items-center text-xs font-bold text-indigo-500 group-hover:translate-x-1 transition-transform">
Read Story
<svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 ml-1" viewBox="0 0 20 20" fill="currentColor"> <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path> </svg> </span> </div> </a> </li>`;
  })} </ul> ${renderComponent($$result, "Footer", $$Footer, {})} </main> </body></html>`;
}, "C:/Users/Simar/Desktop/astro/src/pages/articles.astro", void 0);

const $$file = "C:/Users/Simar/Desktop/astro/src/pages/articles.astro";
const $$url = "/articles";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Articles,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
