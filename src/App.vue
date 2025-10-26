<template>
  <Header />
  <NotificationToasts />
  <router-view />
  <Footer />
</template>

<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import NotificationToasts from './components/NotificationToasts.vue'
</script>

<style>
/* global app styles placed in styles/index.css */
</style>
