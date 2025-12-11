import 'piccolore';
import { n as NOOP_MIDDLEWARE_HEADER, o as decodeKey } from './chunks/astro/server_CPzmFbWL.mjs';
import 'clsx';
import 'es-module-lexer';
import 'html-escaper';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from IANA HTTP Status Code Registry
  // https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  PROXY_AUTHENTICATION_REQUIRED: 407,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  GONE: 410,
  LENGTH_REQUIRED: 411,
  PRECONDITION_FAILED: 412,
  CONTENT_TOO_LARGE: 413,
  URI_TOO_LONG: 414,
  UNSUPPORTED_MEDIA_TYPE: 415,
  RANGE_NOT_SATISFIABLE: 416,
  EXPECTATION_FAILED: 417,
  MISDIRECTED_REQUEST: 421,
  UNPROCESSABLE_CONTENT: 422,
  LOCKED: 423,
  FAILED_DEPENDENCY: 424,
  TOO_EARLY: 425,
  UPGRADE_REQUIRED: 426,
  PRECONDITION_REQUIRED: 428,
  TOO_MANY_REQUESTS: 429,
  REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
  UNAVAILABLE_FOR_LEGAL_REASONS: 451,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  HTTP_VERSION_NOT_SUPPORTED: 505,
  VARIANT_ALSO_NEGOTIATES: 506,
  INSUFFICIENT_STORAGE: 507,
  LOOP_DETECTED: 508,
  NETWORK_AUTHENTICATION_REQUIRED: 511
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/Simar/Desktop/astro/","cacheDir":"file:///C:/Users/Simar/Desktop/astro/node_modules/.astro/","outDir":"file:///C:/Users/Simar/Desktop/astro/dist/","srcDir":"file:///C:/Users/Simar/Desktop/astro/src/","publicDir":"file:///C:/Users/Simar/Desktop/astro/public/","buildClientDir":"file:///C:/Users/Simar/Desktop/astro/dist/","buildServerDir":"file:///C:/Users/Simar/Desktop/astro/.netlify/build/","adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"body{padding-bottom:75px}@media(max-width:767px){body{padding-bottom:90px}}\n"},{"type":"external","src":"/_astro/_id_.BGRqj1zw.css"}],"routeData":{"route":"/articles","isIndex":false,"type":"page","pattern":"^\\/articles\\/?$","segments":[[{"content":"articles","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/articles.astro","pathname":"/articles","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_id_.BGRqj1zw.css"},{"type":"inline","content":"body{padding-bottom:75px}@media(max-width:767px){body{padding-bottom:90px}}\n[data-astro-cid-vhs3unlc]::-webkit-scrollbar{width:8px}[data-astro-cid-vhs3unlc]::-webkit-scrollbar-track{background:#000}[data-astro-cid-vhs3unlc]::-webkit-scrollbar-thumb{background:#333;border-radius:4px}[data-astro-cid-vhs3unlc]::-webkit-scrollbar-thumb:hover{background:#555}audio[data-astro-cid-vhs3unlc]{filter:invert(1) hue-rotate(180deg) contrast(.8)}@media(max-width:640px){.prose-sm[data-astro-cid-vhs3unlc] h3[data-astro-cid-vhs3unlc]{font-size:1.125rem!important;line-height:1.75rem!important;margin-top:2rem!important;margin-bottom:.75rem!important}.prose-sm[data-astro-cid-vhs3unlc] p[data-astro-cid-vhs3unlc]{margin-bottom:1rem!important;font-size:.9375rem!important;line-height:1.625!important}.prose-sm[data-astro-cid-vhs3unlc] li[data-astro-cid-vhs3unlc]{margin-bottom:.5rem!important;font-size:.9375rem!important;line-height:1.5!important}}img[data-astro-cid-vhs3unlc]{content-visibility:auto}@media(max-width:768px){select[data-astro-cid-vhs3unlc],button[data-astro-cid-vhs3unlc],[data-astro-cid-vhs3unlc][role=button]{min-height:44px;min-width:44px}audio[data-astro-cid-vhs3unlc]{min-height:44px}figure[data-astro-cid-vhs3unlc] img[data-astro-cid-vhs3unlc]{aspect-ratio:16/9;object-fit:cover}}\n"}],"routeData":{"route":"/news/english/[category]/[slug]/[id]","isIndex":false,"type":"page","pattern":"^\\/news\\/english\\/([^/]+?)\\/([^/]+?)\\/([^/]+?)\\/?$","segments":[[{"content":"news","dynamic":false,"spread":false}],[{"content":"english","dynamic":false,"spread":false}],[{"content":"category","dynamic":true,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["category","slug","id"],"component":"src/pages/news/english/[category]/[slug]/[id].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"body{padding-bottom:75px}@media(max-width:767px){body{padding-bottom:90px}}\n"},{"type":"external","src":"/_astro/_id_.BGRqj1zw.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/Simar/Desktop/astro/src/pages/articles.astro",{"propagation":"none","containsHead":true}],["C:/Users/Simar/Desktop/astro/src/pages/news/english/[category]/[slug]/[id].astro",{"propagation":"none","containsHead":true}],["C:/Users/Simar/Desktop/astro/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/articles@_@astro":"pages/articles.astro.mjs","\u0000@astro-page:src/pages/news/english/[category]/[slug]/[id]@_@astro":"pages/news/english/_category_/_slug_/_id_.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest__mTqXeUn.mjs","C:/Users/Simar/Desktop/astro/node_modules/unstorage/drivers/netlify-blobs.mjs":"chunks/netlify-blobs_DM36vZAS.mjs","C:/Users/Simar/Desktop/astro/src/components/stocks.astro?astro&type=script&index=0&lang.ts":"_astro/stocks.astro_astro_type_script_index_0_lang.u4HgKnCn.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["C:/Users/Simar/Desktop/astro/src/components/stocks.astro?astro&type=script&index=0&lang.ts","let r=null;const l=document.getElementById(\"searchInput\"),e=document.getElementById(\"allTab\"),s=document.getElementById(\"watchlistTab\"),i=document.getElementById(\"stocksList\"),c=document.getElementById(\"watchlistView\");async function d(t=\"\"){const n=`/api/get-stocks?q=${encodeURIComponent(t)}`;return await(await fetch(n)).json()}function o(t){t===\"all\"?(e.classList.add(\"bg-neutral-800\",\"text-white\"),e.classList.remove(\"text-gray-500\"),s.classList.remove(\"bg-neutral-800\",\"text-white\"),s.classList.add(\"text-gray-500\"),c.classList.add(\"hidden\"),i.classList.remove(\"hidden\")):(s.classList.add(\"bg-neutral-800\",\"text-white\"),s.classList.remove(\"text-gray-500\"),e.classList.remove(\"bg-neutral-800\",\"text-white\"),e.classList.add(\"text-gray-500\"),i.classList.add(\"hidden\"),c.classList.remove(\"hidden\"))}e.addEventListener(\"click\",()=>o(\"all\"));s.addEventListener(\"click\",()=>o(\"watchlist\"));l.addEventListener(\"input\",()=>{clearTimeout(r),r=setTimeout(async()=>{const t=l.value.trim(),n=await d(t);i.innerHTML=n.map(a=>`\n        <div class=\"group bg-black/40 hover:bg-neutral-800 border border-neutral-800/50 transition rounded-lg px-3 py-2 flex justify-between items-center gap-2\">\n          <div class=\"min-w-0\">\n            <p class=\"text-slate-200 text-sm font-medium truncate\">${a.securityName}</p>\n            <p class=\"text-gray-500 text-xs\">${a.bseCode}</p>\n          </div>\n          <button class=\"shrink-0 flex items-center justify-center w-7 h-7 border border-neutral-700 text-neutral-400 hover:text-green-400 hover:border-green-500 hover:bg-green-500/10 rounded-md transition-all\" title=\"Add to Watchlist\">\n            <svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"2\" stroke=\"currentColor\" class=\"w-4 h-4\">\n              <path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M12 4.5v15m7.5-7.5h-15\" />\n            </svg>\n          </button>\n        </div>\n      `).join(\"\")},350)});"]],"assets":["/_astro/_id_.BGRqj1zw.css","/agretosale.webp","/appstore.webp","/banner.webp","/favicon.svg","/googleplay.webp","/logo.png","/_redirects"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"serverIslandNameMap":[],"key":"vNHYeX8t6reN3MugKxQiIsSv7NZSPNKsmXeSO2X4+wE=","sessionConfig":{"driver":"netlify-blobs","options":{"name":"astro-sessions","consistency":"strong"}}});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = () => import('./chunks/netlify-blobs_DM36vZAS.mjs');

export { manifest };
