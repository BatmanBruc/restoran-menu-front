<template>
    <a-layout>
      <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
        <div class="logo" />
        <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
          <a-menu-item key="/categories" @click="toLink('/categories')">
            <appstore-outlined />
            <span>Категории</span>
          </a-menu-item>
        </a-menu>
        <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
          <a-menu-item key="/products" @click="toLink('/products')">
            <appstore-outlined />
            <span>Блюда</span>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
          <menu-unfold-outlined
            v-if="collapsed"
            class="trigger icon-menu-collaps"
            @click="() => (collapsed = !collapsed)"
          />
          <menu-fold-outlined v-else class="trigger icon-menu-collaps" @click="() => (collapsed = !collapsed)" />
        </a-layout-header>
        <a-layout-content
          :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
        >
          <slot/>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </template>
  <script lang="ts">
  import { AppstoreOutlined , MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue';
  import { defineComponent, ref } from 'vue';
  import { useRouter, useRoute } from 'vue-router'
  export default defineComponent({
    components: {
      AppstoreOutlined,
      MenuUnfoldOutlined,
      MenuFoldOutlined,
    },
    name: 'Admin',
    setup() {
      const router = useRouter()
      const route = useRoute()
      const currentUrl = ref([route.path])
      const toLink = (url: any)=>{
        currentUrl.value = url
        router.push(url)
      }
      return {
        selectedKeys: currentUrl,
        collapsed: ref(false),
        toLink
      };
    },
  
  });
  </script>
  <style>
  .icon-menu-collaps {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
        display: initial;
  }
  
  .icon-menu-collaps:hover {
    color: #1890ff;
  }
  
  #components-layout-demo-custom-trigger .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.3);
    margin: 16px;
  }
  
  .site-layout .site-layout-background {
    background: #fff;
  }
  section.ant-layout.ant-layout-has-sider {
      height: 100%;
  }
  </style>