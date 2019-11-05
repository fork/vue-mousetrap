import Mousetrap from "mousetrap";
import Vue from "vue";

/**
 * Bind mousetrap event to a vue component instance
 * @param {HTMLElement} el - HTMLElement of the vue component
 * @param {String|String[]} value - Keyboard shortcuts mousetrap should listen to
 * @param {Vue.VNode} vnode - VNode of the vue component
 * @returns {void}
 */
const bindMousetrap = (el, value, vnode) => {
  Mousetrap.bind(value, ev => {
    if (vnode.componentInstance) {
      // When on a Vue component
      vnode.componentInstance.$emit("mousetrap", ev);
    } else {
      // When on a native HTMLElement
      const evx = new CustomEvent("mousetrap", ev);
      el.dispatchEvent(evx);
    }
  });
};

const MousetrapDirective = {
  bind(el, { value }, vnode) {
    bindMousetrap(el, value, vnode);
  },
  update(el, { value, oldValue }, vnode) {
    Mousetrap.unbind(oldValue);
    bindMousetrap(el, value, vnode);
  },
  unbind(el, { value }) {
    Mousetrap.unbind(value);
  }
};

const VueMousetrap = {
  install() {
    Vue.directive("mousetrap", MousetrapDirective);
  }
};

export default VueMousetrap;
export { MousetrapDirective };
