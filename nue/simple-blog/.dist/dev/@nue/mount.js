var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});

// ../../../.bun/install/global/node_modules/nuekit/src/browser/mount.js
async function importAll(hmr_path) {
  const comps = document.querySelector('[name="nue:components"]')?.getAttribute("content");
  if (!comps)
    return [];
  const arr = [];
  for (let path of comps.split(" ")) {
    if (path == hmr_path)
      path += `?${++remounts}`;
    const { lib } = await import(path);
    if (lib)
      arr.push(...lib);
  }
  return arr;
}
async function mountAll() {
  const els = document.querySelectorAll("[is]");
  const lib = els[0] ? await importAll() : [];
  if (!lib[0])
    return;
  const { createApp } = await import("./nue.js");
  for (const node of [...els]) {
    const name = node.getAttribute("is");
    const next = node.nextElementSibling;
    const data = next?.type == "application/json" ? JSON.parse(next.textContent) : {};
    const comp = lib.find((a) => a.name == name);
    if (comp) {
      const app = createApp(comp, data, lib).mount(node);
      apps.push(app);
    } else if (customElements.get(name)) {
    } else {
    }
  }
}
async function unmountAll() {
  apps.forEach((app) => app.unmount());
  apps = [];
}
var apps = [];
var remounts = 0;
addEventListener("route", () => mountAll());
addEventListener("DOMContentLoaded", () => dispatchEvent(new Event("route")));
export {
  unmountAll,
  mountAll
};
