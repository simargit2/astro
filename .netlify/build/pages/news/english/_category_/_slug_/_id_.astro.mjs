import { c as createComponent, m as maybeRenderHead, r as renderTemplate, k as renderScript, d as createAstro, f as addAttribute, l as defineScriptVars, j as renderComponent, u as unescapeHTML, i as renderHead } from '../../../../../chunks/astro/server_CPzmFbWL.mjs';
import 'piccolore';
/* empty css                                            */
import 'clsx';
import { f as fetchNews } from '../../../../../chunks/fetchnews_DxqIi70J.mjs';
import { a as $$Footer, $ as $$Navbar } from '../../../../../chunks/Navbar_qEm4KY4t.mjs';
/* empty css                                            */
export { renderers } from '../../../../../renderers.mjs';

const fetchNewsDetails = async (id) => {
  try {
    const baseUrl = "https://app1.whalesbook1.shop";
    const url = `${baseUrl}/published-news-collection/getFreeNewsById`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id,
        language: "english"
      })
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch news details: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("fetchNewsDetails error:", error);
    return {
      success: false,
      error: error.message,
      article: {}
    };
  }
};

const $$Appbanner = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="flex flex-col"> <img src="/banner.webp" class="w-full h-[250px]"> <div class="flex flex-row gap-4 mt-4 items-center justify-center"> <img src="/googleplay.webp" class="h-[50px]"> <img src="/appstore.webp" class="h-[35px]"> </div> </div>`;
}, "C:/Users/Simar/Desktop/astro/src/components/Appbanner.astro", void 0);

async function getStocks(searchQuery = "") {
    try {
        let url = `https://newspaper-dashboard.whalesbook1.shop/get-stocks?page=1&limit=5`;

        if (searchQuery?.trim()) {
            url += `&queryString=${searchQuery}`;
        }

        const res = await fetch(url);
        const json = await res.json();

        return json?.data || [];
    } catch (err) {
        console.error("getStocks error:", err);
        return [];
    }
}

const $$Stocks = createComponent(async ($$result, $$props, $$slots) => {
  const initialStocks = await getStocks("");
  return renderTemplate`${maybeRenderHead()}<div class="w-full bg-neutral-900/50 border border-neutral-800 rounded-xl p-4"> <div id="app"> <input id="searchInput" placeholder="Search stocks..." class="w-full bg-black border border-neutral-700 px-3 py-2 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"> <div class="flex mt-3 bg-black rounded-lg overflow-hidden border border-neutral-800 p-0.5"> <button id="allTab" class="flex-1 py-1.5 text-xs font-medium text-center bg-neutral-800 text-white rounded-md transition-all">
All
</button> <button id="watchlistTab" class="flex-1 py-1.5 text-xs font-medium text-center text-gray-500 hover:text-gray-300 transition-all">
Watchlist
</button> </div> <div id="watchlistView" class="hidden mt-6 text-center"> <p class="text-gray-500 text-sm">Signup to add to watchlist</p> </div> <div id="stocksList" class="mt-4 space-y-2 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-transparent pr-1"> ${initialStocks.map((stock) => renderTemplate`<div class="group bg-black/40 hover:bg-neutral-800 border border-neutral-800/50 transition rounded-lg px-1 py-2 flex justify-between items-center gap-2"> <div class="min-w-0 flex flex-row items-center"> <p class="text-slate-200 text-sm font-medium">${stock.securityName}</p> <p class="text-gray-500 text-xs">(${stock.bseCode})</p> </div> <button class="shrink-0 flex items-center justify-center w-7 h-7 border border-neutral-700 text-neutral-400 hover:text-green-400 hover:border-green-500 hover:bg-green-500/10 rounded-md transition-all" title="Add to Watchlist"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4"> <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"></path> </svg> </button> </div>`)} </div> </div> </div> ${renderScript($$result, "C:/Users/Simar/Desktop/astro/src/components/stocks.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Simar/Desktop/astro/src/components/stocks.astro", void 0);

const $$Astro$1 = createAstro();
const $$Newslist = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Newslist;
  const {
    limit = 5,
    layout = "col",
    sector = "All"
  } = Astro2.props;
  (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  const newsData = await fetchNews({
    date: "2025-12-04",
    page: 1,
    limit,
    sector
  });
  const createSlug = (text) => text ? text.toString().toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "").replace(/\-\-+/g, "-") : "article";
  const truncateWords = (text, count = 5) => {
    const words = text.trim().split(/\s+/);
    if (words.length <= count) return text;
    return words.slice(0, count).join(" ") + "\u2026";
  };
  return renderTemplate`<!-- OUTER WRAPPER -->${maybeRenderHead()}<div class="w-full bg-neutral-900/50 border border-neutral-800 rounded-xl p-4 mt-2"> <!-- LIST MODE (col) --> ${layout === "col" && renderTemplate`<div class="space-y-2 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-transparent pr-1"> ${newsData?.data?.map((article) => {
    const category = createSlug(article.suggestedSector || "general");
    const slug = createSlug(article.translations?.[0]?.headline || "untitled");
    const id = article._id;
    const img = article.imageUrl || "/placeholder.png";
    const title = article.translations?.[0]?.headline || "Untitled";
    return renderTemplate`<a${addAttribute(`/news/english/${category}/${slug}/${id}`, "href")} class="group bg-black/40 hover:bg-neutral-800 border border-neutral-800/50 transition rounded-lg px-3 py-2 flex flex-row items-center gap-3"> <!-- IMAGE LEFT --> <div class="min-w-[56px] h-[56px] rounded-md overflow-hidden"> <img${addAttribute(img, "src")}${addAttribute(title, "alt")} class="object-cover w-full h-full" loading="lazy"> </div> <!-- TEXT RIGHT --> <div class="flex flex-col flex-1 min-w-0"> <!-- 5 WORD TRUNCATE --> <p class="text-slate-200 text-sm font-medium"> ${truncateWords(title, 5)} </p> <p class="text-gray-500 text-xs">${article.suggestedSector}</p> </div> <div class="text-neutral-500 text-lg shrink-0">›</div> </a>`;
  })} </div>`} <!-- CARD GRID MODE (row) --> ${layout === "row" && renderTemplate`<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"> ${newsData?.data?.map((article) => {
    const category = createSlug(article.suggestedSector || "general");
    const slug = createSlug(article.translations?.[0]?.headline || "untitled");
    const id = article._id;
    const img = article.imageUrl || "/placeholder.png";
    const title = article.translations?.[0]?.headline || "Untitled";
    return renderTemplate`<a${addAttribute(`/news/english/${category}/${slug}/${id}`, "href")} class="group bg-black/40 hover:bg-neutral-800 border border-neutral-800/50 transition rounded-lg p-3 flex flex-col"> <!-- IMAGE TOP --> <div class="w-full h-32 lg:h-40 rounded-md overflow-hidden mb-2"> <img${addAttribute(img, "src")}${addAttribute(title, "alt")} class="object-cover w-full h-full" loading="lazy"> </div> <!-- TEXT BELOW (line clamp) --> <p class="text-slate-200 text-sm font-semibold line-clamp-2">${title}</p> <p class="text-gray-500 text-xs mt-1">${article.suggestedSector}</p> </a>`;
  })} </div>`} </div>`;
}, "C:/Users/Simar/Desktop/astro/src/components/newslist.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const prerender = false;
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  const articleData = await fetchNewsDetails(id);
  const translation = articleData?.translations?.[0] || {};
  const headline = translation.headline || "Article Not Found";
  const shortDescription = translation.shortDescription || "";
  const detailedCoverage = translation.detailedCoverage || "";
  const imageUrl = articleData?.imageUrl || "";
  const newsType = articleData?.newsType || "News";
  const author = articleData?.author || "Whalesbook Team";
  const dateStr = articleData?.scrappedAt;
  const audioData = articleData?.audioUrl || [];
  const formatDate = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    const day = date.getDate();
    const suffix = ["th", "st", "nd", "rd"][day % 10 > 3 || [11, 12, 13].includes(day % 100) ? 0 : day % 10];
    const formattedDate = date.toLocaleDateString("en-GB", {
      month: "long",
      year: "numeric"
    });
    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true
    });
    return `${day}${suffix} ${formattedDate}, ${formattedTime}`;
  };
  const parseContent = (text) => {
    if (!text) return "";
    return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold text-slate-100 mt-8 mb-3">$1</h3>').replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-slate-100">$1</strong>').replace(/^\* (.*$)/gim, '<li class="ml-5 list-disc marker:text-slate-500 pl-1 mb-2">$1</li>').split("\n\n").map((p) => {
      if (p.trim().match(/^<(h3|li)/)) return p;
      return `<p class="mb-5 leading-relaxed text-slate-300">${p.replace(/\n/g, "<br>")}</p>`;
    }).join("");
  };
  const contentHtml = parseContent(detailedCoverage);
  return renderTemplate(_a || (_a = __template(['<html lang="en" data-astro-cid-vhs3unlc> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>', " \u2013 Whalesbook</title>", '<meta name="description"', '><link rel="canonical"', '><meta property="og:title"', '><meta property="og:description"', ">", '<meta property="og:type" content="article"><meta name="twitter:card" content="summary_large_image">', '</head> <body class="min-h-screen bg-black text-slate-50 font-sans antialiased pb-24" data-astro-cid-vhs3unlc> ', ' <main class="px-4 sm:px-6 md:px-10 py-6 md:py-12" data-astro-cid-vhs3unlc> <div class="flex flex-col md:flex-row justify-between items-start gap-y-10" data-astro-cid-vhs3unlc> <div class="w-full md:px-10" data-astro-cid-vhs3unlc> <!-- 1. TITLE --> <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-white leading-tight tracking-tight mb-4" data-astro-cid-vhs3unlc> ', ' </h1> <div class="flex flex-wrap items-center text-xs font-semibold tracking-widest text-slate-400 mb-6 md:mb-8 uppercase" data-astro-cid-vhs3unlc> <span class="text-indigo-400" data-astro-cid-vhs3unlc>', '</span> <span class="mx-3 text-slate-600" data-astro-cid-vhs3unlc>|</span> <span data-astro-cid-vhs3unlc>', '</span> </div> <div class="flex items-center mb-6 md:mb-8" data-astro-cid-vhs3unlc> <div class="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center mr-3 shadow-lg shadow-purple-900/20" data-astro-cid-vhs3unlc> <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 md:h-5 md:w-5 text-white" viewBox="0 0 20 20" fill="currentColor" data-astro-cid-vhs3unlc> <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd" data-astro-cid-vhs3unlc></path> </svg> </div> <div class="flex flex-col" data-astro-cid-vhs3unlc> <span class="text-[9px] md:text-[10px] text-indigo-300 font-bold uppercase tracking-wider mb-0.5" data-astro-cid-vhs3unlc>Author</span> <div class="text-sm font-medium text-slate-200" data-astro-cid-vhs3unlc> ', ' <span class="text-slate-500 font-normal text-xs" data-astro-cid-vhs3unlc>| Whalesbook News Team</span> </div> </div> </div> <!-- 2. IMAGE (Mobile: Right after title) --> <div class="md:hidden flex flex-col items-center mb-6" data-astro-cid-vhs3unlc> <figure class="w-full rounded-xl overflow-hidden shadow-xl border border-neutral-800" data-astro-cid-vhs3unlc> <img', "", ' class="w-full h-auto object-cover bg-neutral-900" loading="eager" decoding="async" width="800" height="450" data-astro-cid-vhs3unlc> </figure> </div> <!-- 3. AUDIO (Mobile: Right after image) --> ', ' <!-- 4. BANNER (Mobile: After audio) --> <div class="md:hidden w-full mb-8" data-astro-cid-vhs3unlc> ', ' </div> <!-- NEWS TYPE & DATE (Mobile: After banner) --> <!-- OVERVIEW (Mobile: After author) --> <div class="bg-black/80 border border-neutral-800 rounded-xl p-4 md:p-6 mb-8 md:mb-10 backdrop-blur-sm" data-astro-cid-vhs3unlc> <h2 class="text-yellow-400 font-bold text-base md:text-lg mb-2 md:mb-3 border-b border-yellow-400/20 pb-1 inline-block" data-astro-cid-vhs3unlc>\nOverview\n</h2> <p class="text-slate-300 leading-relaxed text-sm md:text-base lg:text-lg" data-astro-cid-vhs3unlc> ', ' </p> </div> <!-- 5. STOCKS LIST (Mobile: After overview) --> <div class="md:hidden w-full mb-8" data-astro-cid-vhs3unlc> ', ' </div> <!-- DESKTOP IMAGE & AUDIO (unchanged position) --> <div class="hidden md:flex flex-col items-center mb-10" data-astro-cid-vhs3unlc> <figure class="w-full max-w-2xl rounded-xl overflow-hidden shadow-2xl border border-neutral-800 mb-6" data-astro-cid-vhs3unlc> <img', "", ' class="w-full h-auto max-h-[350px] object-cover bg-neutral-900" loading="eager" decoding="async" width="800" height="450" data-astro-cid-vhs3unlc> </figure> ', ' </div> <!-- ARTICLE CONTENT --> <article class="prose prose-sm sm:prose-base md:prose-lg prose-invert max-w-none text-slate-300 bg-black/80" data-astro-cid-vhs3unlc> <div data-astro-cid-vhs3unlc>', '</div> </article> <!-- 6. OTHER THINGS: Suggested Sector & NewsList (Mobile: After content) --> <div class="md:hidden w-full mt-10" data-astro-cid-vhs3unlc> <h2 class="text-yellow-400 font-bold text-xl mb-4" data-astro-cid-vhs3unlc>Suggested Sector</h2> ', ' </div> </div> <!-- DESKTOP ONLY: Sidebar (unchanged) --> <div class="hidden md:block w-[320px] shrink-0 sticky top-10" data-astro-cid-vhs3unlc> ', " ", ' <h2 class="text-yellow-400 font-bold text-xl mt-2" data-astro-cid-vhs3unlc>Suggested Sector</h2> ', " </div> </div> <!-- DESKTOP NewsList row (unchanged) --> ", " ", " </main> <!-- AUDIO SWITCH SCRIPT --> <script>(function(){", '\n      // Mobile audio player\n      const selectMobile = document.getElementById("audio-lang-select");\n      const playerMobile = document.getElementById("main-audio-player");\n      \n      // Desktop audio player\n      const selectDesktop = document.getElementById("audio-lang-select-desktop");\n      const playerDesktop = document.getElementById("main-audio-player-desktop");\n\n      if (selectMobile && playerMobile) {\n        selectMobile.addEventListener("change", (e) => {\n          const newSrc = e.target.value;\n          playerMobile.src = newSrc;\n          playerMobile.play().catch((e) => console.log("Auto-play prevented:", e));\n        });\n      }\n      \n      if (selectDesktop && playerDesktop) {\n        selectDesktop.addEventListener("change", (e) => {\n          const newSrc = e.target.value;\n          playerDesktop.src = newSrc;\n          playerDesktop.play().catch((e) => console.log("Auto-play prevented:", e));\n        });\n      }\n    })();<\/script>  </body> </html>'])), headline, imageUrl && renderTemplate`<link rel="preload" as="image"${addAttribute(imageUrl, "href")}>`, addAttribute(shortDescription, "content"), addAttribute(Astro2.url.href, "href"), addAttribute(headline, "content"), addAttribute(shortDescription, "content"), imageUrl && renderTemplate`<meta property="og:image"${addAttribute(imageUrl, "content")}>`, renderHead(), renderComponent($$result, "Navbar", $$Navbar, { "data-astro-cid-vhs3unlc": true }), headline, newsType.toUpperCase(), formatDate(dateStr), author, addAttribute(imageUrl || "https://via.placeholder.com/800x450", "src"), addAttribute(headline, "alt"), audioData.length > 0 && renderTemplate`<div class="md:hidden w-full mb-6" data-astro-cid-vhs3unlc> <div class="w-full bg-neutral-900/80 border border-neutral-800 rounded-xl p-3 backdrop-blur-sm" data-astro-cid-vhs3unlc> <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 border-b border-neutral-800 pb-2" data-astro-cid-vhs3unlc> <div class="flex items-center gap-2" data-astro-cid-vhs3unlc> <span class="w-2 h-2 rounded-full bg-red-500 animate-pulse" data-astro-cid-vhs3unlc></span> <span class="text-xs font-bold uppercase tracking-widest text-slate-400" data-astro-cid-vhs3unlc>Audio Article</span> </div> <select id="audio-lang-select" class="bg-black/80 border border-neutral-700 text-slate-300 text-xs rounded px-3 py-1 outline-none focus:border-indigo-500 cursor-pointer w-full sm:w-auto" data-astro-cid-vhs3unlc> ${audioData.map((audio) => renderTemplate`<option${addAttribute(audio.audioUrl, "value")} class="capitalize" data-astro-cid-vhs3unlc>${audio.language}</option>`)} </select> </div> <audio id="main-audio-player" controls class="w-full h-8 block custom-audio" data-astro-cid-vhs3unlc> <source${addAttribute(audioData[0]?.audioUrl, "src")} type="audio/mpeg" data-astro-cid-vhs3unlc>
Your browser does not support the audio element.
</audio> </div> </div>`, renderComponent($$result, "AppBanner", $$Appbanner, { "data-astro-cid-vhs3unlc": true }), shortDescription, renderComponent($$result, "StocksList", $$Stocks, { "data-astro-cid-vhs3unlc": true }), addAttribute(imageUrl || "https://via.placeholder.com/800x450", "src"), addAttribute(headline, "alt"), audioData.length > 0 && renderTemplate`<div class="w-full max-w-2xl bg-neutral-900/80 border border-neutral-800 rounded-xl p-4 backdrop-blur-sm" data-astro-cid-vhs3unlc> <div class="flex items-center justify-between mb-3 border-b border-neutral-800 pb-2" data-astro-cid-vhs3unlc> <div class="flex items-center gap-2" data-astro-cid-vhs3unlc> <span class="w-2 h-2 rounded-full bg-red-500 animate-pulse" data-astro-cid-vhs3unlc></span> <span class="text-xs font-bold uppercase tracking-widest text-slate-400" data-astro-cid-vhs3unlc>Audio Article</span> </div> <select id="audio-lang-select-desktop" class="bg-black/80 border border-neutral-700 text-slate-300 text-xs rounded px-3 py-1 outline-none focus:border-indigo-500 cursor-pointer" data-astro-cid-vhs3unlc> ${audioData.map((audio) => renderTemplate`<option${addAttribute(audio.audioUrl, "value")} class="capitalize" data-astro-cid-vhs3unlc>${audio.language}</option>`)} </select> </div> <audio id="main-audio-player-desktop" controls class="w-full h-8 block custom-audio" data-astro-cid-vhs3unlc> <source${addAttribute(audioData[0]?.audioUrl, "src")} type="audio/mpeg" data-astro-cid-vhs3unlc>
Your browser does not support the audio element.
</audio> </div>`, unescapeHTML(contentHtml), renderComponent($$result, "NewsList", $$Newslist, { "limit": 5, "layout": "col", "data-astro-cid-vhs3unlc": true }), renderComponent($$result, "AppBanner", $$Appbanner, { "data-astro-cid-vhs3unlc": true }), renderComponent($$result, "StocksList", $$Stocks, { "data-astro-cid-vhs3unlc": true }), renderComponent($$result, "NewsList", $$Newslist, { "limit": 5, "layout": "col", "data-astro-cid-vhs3unlc": true }), renderComponent($$result, "NewsList", $$Newslist, { "layout": "row", "data-astro-cid-vhs3unlc": true }), renderComponent($$result, "Footer", $$Footer, { "data-astro-cid-vhs3unlc": true }), defineScriptVars({ audioData }));
}, "C:/Users/Simar/Desktop/astro/src/pages/news/english/[category]/[slug]/[id].astro", void 0);

const $$file = "C:/Users/Simar/Desktop/astro/src/pages/news/english/[category]/[slug]/[id].astro";
const $$url = "/news/english/[category]/[slug]/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
