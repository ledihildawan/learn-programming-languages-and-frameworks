var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});

// ../../../.bun/install/global/node_modules/nuekit/src/browser/hotreload.js
import {mountAll} from "./mount.js";
function createStyle(href, css) {
  const el = document.createElement("style");
  el.setAttribute("href", href);
  el.innerHTML = css;
  return el;
}
function deserialize(form, formdata) {
  for (const [key, val] of formdata.entries()) {
    const el = form.elements[key];
    if (el.type == "checkbox")
      el.checked = !!val;
    else
      el.value = val;
  }
}
async function remount(path) {
  const data = [...document.forms].map((form) => new FormData(form));
  let dialog = $("dialog[open]");
  await mountAll(path);
  data.forEach((formdata, i) => deserialize(document.forms[i], formdata));
  dialog = window[dialog?.id];
  if (dialog) {
    dialog.close();
    dialog.showModal();
  }
}
function parsePage(html) {
  const root = document.createElement("html");
  root.innerHTML = html;
  return { title: $("title", root)?.textContent, body: $("body", root) };
}
async function patch(html) {
  const { DiffDOM } = await import("/@nue/diffdom.js");
  const Diff = new DiffDOM;
  const old_body = $("body");
  const { title, body } = parsePage(html);
  if (title)
    document.title = title;
  const diff = Diff.diff(old_body, body);
  const flags = $$("[role=tab]").map((el) => el.getAttribute("aria-selected"));
  Diff.apply(old_body, diff);
  restoreTabs(flags);
  await mountAll();
}
function toggleAttr(el, name, flag) {
  flag ? el.setAttribute(name, 1) : el.removeAttribute(name);
}
function restoreTabs(flags) {
  const panels = $$("[role=tabpanel]");
  $$("[role=tab]").forEach((el, i) => {
    toggleAttr(el, "aria-selected", flags[i]);
    toggleAttr(panels[i], "hidden", !flags[i]);
  });
}
var sse = new EventSource(location.origin);
var $$ = (query, root = document) => [...root.querySelectorAll(query)];
var $ = (query, root = document) => root.querySelector(query);
sse.onmessage = async function(e) {
  const data = e.data ? JSON.parse(e.data) : {};
  const { error, html, css, dir, url, path } = data;
  if (data.site_updated)
    return location.reload();
  if (error) {
    Object.assign(error, { path, ext: data.ext?.slice(1) });
    import("./error.js").then((el) => el.showError(error));
  } else {
    $(".nuerr")?.remove();
  }
  if (html) {
    const uri = url.replace("/index.html", "/");
    if (data.is_md && location.pathname != uri)
      location.href = uri;
    else {
      await patch(html);
      dispatchEvent(new Event("reload"));
    }
  }
  if (data.is_nue || data.is_htm)
    remount("/" + data.path.replace(data.ext, ".js"));
  if (css) {
    const href = `/${dir}${dir ? "/" : ""}${data.name}.css`;
    const orig = $(`[href="${href}"]`);
    const style = createStyle(href, css);
    if (orig)
      orig.replaceWith(style);
    else
      document.head.appendChild(style);
  }
  if (data.remove && data.ext == ".css") {
    const orig = $(`[href="/${data.path}"]`);
    if (orig)
      orig.remove();
  }
};
