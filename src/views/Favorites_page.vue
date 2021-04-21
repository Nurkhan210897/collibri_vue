<template>
  <div class="p_page">
    <p v-if="loading">Загрузка</p>
    <div class="container">
      <div class="title_small">
        <h1>Избранные товары</h1>
      </div>
      <div class="row mt-5">
        <div class="col-xl-3 col-md-6 col-lg-4" v-for="item in favorites" :key="item.id">
          <productCard :productCard="item"></productCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import productCard from "./../components/productCard";

export default {
  components: { productCard },
  data: () => ({
    favorites: null,
  }),

  mounted() {
    this.favorites = JSON.parse(localStorage.getItem("favorite"));
  },
};
</script>

<style></style>
