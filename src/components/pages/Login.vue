<template>
  <a-form
    :model="formState"
    name="basic"
    autocomplete="off"
    @finish="onFinish"
  >
    <a-form-item
      name="login"
      :rules="[{ required: true, message: 'Введите имя аккаунта!' }]"
    >
      <a-input placeholder="Имя аккаунта"  v-model:value="formState.login">
        <template #prefix><UserOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
      </a-input>
    </a-form-item>

    <a-form-item
      name="password"
      :rules="[{ required: true, message: 'Введите пароль!' }]"
    >
      <a-input-password placeholder="Пароль" v-model:value="formState.password">
        <template #prefix><LockOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
      </a-input-password>
    </a-form-item>
    <router-link to="/register">Регистрация</router-link>
    <a-form-item >
      <a-button v-if="!loading" type="primary" html-type="submit" class="login-button" :disabled="formState.login === '' || formState.password === ''">Войти</a-button>
      <a-button v-else type="primary" class="login-button" loading></a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" >
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router'
import Cookies from 'js-cookie';
import { Api } from '../../services/Api';

export default defineComponent({
  components: {
    UserOutlined,
    LockOutlined
  },
  setup() {
    const api = new Api() 
    const router = useRouter()
    const formState = ref({
      login: '',
      password: '',
    });
    const loading = ref<boolean>(false)
    const onFinish = () =>{
        loading.value = true
        api.post('/user/signin',formState.value).then((response)=>{
            Cookies.set('auth_token', response.data.content)
            loading.value = false
            router.push('/categories')
        }).catch(error=>{
        console.log(error)
            Api.showEror(error)
        loading.value = false
        })
    };

    return {
      formState,
      loading,
      onFinish,
    };
  },

});
</script>
    
<style>
.login-button {
    width: 100%;
}
</style>
    