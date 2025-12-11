import { c as createComponent, d as createAstro, f as addAttribute, i as renderHead, j as renderComponent, r as renderTemplate } from '../chunks/astro/server_CPzmFbWL.mjs';
import 'piccolore';
import { $ as $$Navbar, a as $$Footer } from '../chunks/Navbar_qEm4KY4t.mjs';
/* empty css                                */
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate`<html lang="en"> <head><meta charset="utf-8"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="viewport" content="width=device-width"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>Under Construction</title>${renderHead()}</head> <body class="bg-black text-white min-h-screen flex flex-col"> ${renderComponent($$result, "Navbar", $$Navbar, {})} <!-- CENTERED PAGE CONTENT --> <main class="flex-1 flex items-center justify-center"> <h1 class="text-3xl md:text-5xl font-semibold tracking-wide">
Under Construction 🚧
</h1> </main> ${renderComponent($$result, "Footer", $$Footer, {})} </body></html>`;
}, "C:/Users/Simar/Desktop/astro/src/pages/index.astro", void 0);

const $$file = "C:/Users/Simar/Desktop/astro/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
