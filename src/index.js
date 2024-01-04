import Mousetrap from "mousetrap";
/**
 * Bind mousetrap event to a vue component instance
 * @param {HTMLElement} el - HTMLElement of the vue component
 * @param {String|String[]} value - Keyboard shortcuts mousetrap should listen to
 * @param {Vue.VNode} vnode - VNode of the vue component
 * @returns {void}
 */
const bindMousetrap = (el, value, vnode) => {
  Mousetrap.bind(value, (ev) => {
    if (vnode.component) {
      // When on a Vue component
      vnode.component.emit("mousetrap", ev);
    } else {
      // When on a native HTMLElement
      const evx = new CustomEvent("mousetrap", ev);
      el.dispatchEvent(evx);
    }
  });
};
const MousetrapDirective = {
  beforeMount(el, { value }, vnode) {
    bindMousetrap(el, value, vnode);
  },
  updated(el, { value, oldValue }, vnode) {
    Mousetrap.unbind(oldValue);
    bindMousetrap(el, value, vnode);
  },
  unmounted(el, { value }) {
    Mousetrap.unbind(value);
  },
};
export default {
  install(app) {
    app.directive("mousetrap", MousetrapDirective);
  },
};
export { MousetrapDirective };
