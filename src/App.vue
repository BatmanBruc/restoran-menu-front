<template>
  <transition name="page-fade" appear mode="out-in">
    <component v-bind:is="layout">
        <router-view />
    </component>
  </transition>
</template>

<script lang="ts">
import { computed } from 'vue'
import type { Component } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'

import Admin from './layouts/Admin.vue'
import Auth from './layouts/Auth.vue'

export default {
  name: 'App',
  setup(){
    const router = useRouter()
    const store = useStore()
    const components: {[key: string]: Component} = {
      Admin,
      Auth
    }
    const route: any = useRoute()
    const layout = computed((): Component =>{
      return components[route.meta.layout]
    })
    return {
      layout
    }
  }
}
</script>

<style>
div#app {
    height: 100%;
}
.page-fade-enter-from{
  opacity: 0;
}
.page-fade-enter-to{
  opacity: 1;
}
.page-fade-leave-active, .page-fade-enter-active{
  transition: opacity 500ms;
}
.page-fade-leave-to{
  opacity: 0;
}
.page-fade-leave{
  opacity: 1;
}
html{
  height: 100%;
}
</style>
