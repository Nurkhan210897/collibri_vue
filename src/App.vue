<template>
  <div id="app">
    <Header />
    <div class="loader_wrapper" v-if="loader === false">
      <div id="cube-loader">
        <div class="caption">
          <div class="cube-loader">
            <div class="cube loader-1"></div>
            <div class="cube loader-2"></div>
            <div class="cube loader-4"></div>
            <div class="cube loader-3"></div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "@/views/layouts/Header.vue";
import Footer from "./views/layouts/Footer.vue";
export default {
  components: {
    Header,
    Footer,
  },
  data: () => ({
    loader: false,
  }),
  created() {
    setTimeout(() => {
      this.loader = true;
    }, 3000);
  },
};
</script>

<style lang="scss"></style>
