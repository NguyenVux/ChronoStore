<script lang="ts" setup>
import { RouterView } from 'vue-router';
import TopBar from './components/TopBar.vue';
import LoadingModal from './components/loading.vue';
import { store } from './store';
</script>

<template>
  <top-bar></top-bar>
  <router-view></router-view>
  <loading-modal v-if="store.state.modal.loading > 0"></loading-modal>
</template>