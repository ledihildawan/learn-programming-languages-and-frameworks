// ../../../.bun/install/global/node_modules/nuekit/src/browser/view-transitions.js
function $(query, root = document) {
  return root.querySelector(query);
}
function $$(query, root = document) {
  return [...root.querySelectorAll(query)];
}
async function loadPage(path, no_push) {
  dispatchEvent(new Event("before:route"));
  if (!no_push)
    history.pushState({ path }, 0, path);
  const dom = mkdom(await getHTML(path));
  document.title = $("title", dom)?.textContent;
  const query = '[name="nue:components"]';
  $(query).content = $(query, dom).content;
  for (const script of $$("script[src]", dom)) {
    await import(script.getAttribute("src"));
  }
  const new_styles = swapStyles($$("style"), $$("style", dom));
  new_styles.forEach((style) => $("head").appendChild(style));
  const paths = swapStyles($$("link"), $$("link", dom));
  const orig_style = findPlainStyle();
  const new_style = findPlainStyle(dom);
  if (orig_style)
    orig_style.replaceWith(new_style);
  else if (new_style)
    $("head").appendChild(new_style);
  $("body").classList.value = $("body2", dom).classList.value || "";
  loadCSS(paths, () => {
    updateBody(dom);
    setActive(path);
    const { hash } = location;
    const el = hash && $(hash);
    scrollTo(0, el ? el.offsetTop - parseInt(getComputedStyle(el).scrollMarginTop) || 0 : 0);
    dispatchEvent(new Event("route"));
  });
}
function findPlainStyle(dom) {
  return $$("style", dom).find((el) => !el.attributes.length);
}
function updateBody(dom) {
  ["header", "main", "footer", "nav"].forEach(function(query) {
    const a = $("body >" + query);
    const b = $("body2 >" + query, dom);
    const clone = b && b.cloneNode(true);
    if (a && b) {
      if (query == "main") {
        updateMain(dom);
      } else {
        updateBlock(a, clone);
      }
    } else if (a) {
      a.remove();
    } else if (b) {
      if (query == "header")
        $("body").prepend(clone);
      if (query == "footer")
        $("body").append(clone);
      if (query == "nav")
        $("body > header").after(clone);
    }
  });
}
function updateBlock(a, clone) {
  const orig = a.outerHTML.replace(' aria-selected=""', "");
  const diff = orig != clone.outerHTML;
  if (diff)
    a.replaceWith(clone);
}
function updateMain(dom) {
  ["article", "aside:first-child", "article + aside"].forEach(function(query, i) {
    const a = $("main >" + query);
    const b = $("main >" + query, dom);
    const clone = b && b.cloneNode(true);
    if (a && b) {
      updateBlock(a, clone);
    } else if (a) {
      a.remove();
    } else if (b) {
      if (!i)
        $("main").append(clone);
      if (i == 1)
        $("main").prepend(clone);
      if (i == 2)
        $("article").after(clone);
    }
  });
}
function onclick(root, fn) {
  root.addEventListener("click", (e) => {
    const el = e.target.closest("[href]");
    const path = el?.getAttribute("href");
    const target = el?.getAttribute("target");
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || !path || path[0] == "#" || path.includes("//") || path.startsWith("mailto:") || target == "_blank")
      return;
    if (path != location.pathname)
      fn(path);
    e.preventDefault();
  });
}
function setActive(path, attrname = "aria-selected") {
  $$(`[${attrname}]`).forEach((el) => el.removeAttribute(attrname));
  $$("a").forEach((el) => {
    if (el.getAttribute("href") == path)
      el.setAttribute(attrname, "");
  });
}
function hasStyle(sheet, sheets) {
  return sheets.find((el) => el.getAttribute("href") == sheet.getAttribute("href"));
}
function swapStyles(orig, styles) {
  orig.forEach((el, i) => {
    el.disabled = !hasStyle(el, styles);
  });
  return styles.filter((el) => !hasStyle(el, orig));
}
async function getHTML(path) {
  let html = cache[path];
  if (html)
    return html;
  const resp = await fetch(path);
  html = await resp.text();
  if (resp.status == 404 && html?.trim()[0] != "<") {
    $("article").innerHTML = "<h1>Page not found</h1>";
  } else {
    cache[path] = html;
  }
  return html;
}
function mkdom(html) {
  html = html.replace(/<(\/?)body/g, "<$1body2");
  const tmpl = document.createElement("template");
  tmpl.innerHTML = html.trim();
  return tmpl.content;
}
function loadCSS(paths, fn) {
  let loaded = 0;
  !paths[0] ? fn() : paths.forEach((el, i) => {
    loadSheet(el.href, () => {
      if (++loaded == paths.length)
        fn();
    });
  });
}
function loadSheet(path, fn) {
  const el = document.createElement("link");
  el.rel = "stylesheet";
  el.href = path;
  $("head").appendChild(el);
  el.onload = fn;
}
var is_browser = typeof window == "object";
if (is_browser) {
  if (!document.startViewTransition) {
    document.startViewTransition = (fn) => fn();
  }
  history.pushState({ path: location.pathname }, 0);
  onclick(document, async (path) => {
    document.startViewTransition(async function() {
      await loadPage(path);
    });
  });
  setActive(location.pathname);
  addEventListener("popstate", (e) => {
    const { path } = e.state || {};
    if (path)
      loadPage(path, true);
  });
}
var cache = {};
export {
  setActive,
  onclick,
  loadPage,
  $$,
  $
};
