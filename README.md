# `@4rk/vue-mousetrap`

A Vue plugin providing a directive to add global keyboard shortcuts to your components based on [Mousetrap](https://craig.is/killing/mice).

## Installation

```javascript
import VueMousetrap from "@4rk/vue-mousetrap";

Vue.use(VueMousetrap);
```

## Usage

```vue
<template>
  <div v-mousetrap="['mod+s']" @mousetrap="onMousetrap">
    hit ctrl-s to save
  </div>
</template>

<script>
export default {
  methods: {
    onMousetrap() {
      console.log("save!");
    }
  }
};
</script>
```

## API

The `v-mousetrap` directive expects a Moustrap compatible value as defined at [Mousetrap.bind](https://craig.is/killing/mice#api.bind).

The `@mousetrap` event triggers with the Mousetrap event.
