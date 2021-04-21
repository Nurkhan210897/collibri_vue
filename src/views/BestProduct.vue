<template>
  <div class="catalog_wrapper p_page" v-if="bestProductData">
    <div class="container">
      <div class="title_page">
        <h1>Бестселлеры</h1>
      </div>
      <div class="nav_page">
        <div class="breadcrumbs">
          <router-link to="/">Главная</router-link>
          <router-link to="/best">Бестселлеры</router-link>
        </div>
      </div>

      <div class="catalog_content">
        <div class="catalog_products" v-if="bestProductData.products.length">
          <div class="row">
            <div
              class="col-xl-3 col-md-6 col-lg-3"
              v-for="card in bestProductData.products"
              :key="card.id"
            >
              <productCard :productCard="card"></productCard>
            </div>
          </div>
        </div>
        <div v-else>
          <h2>В данной категорий нет продуктов!</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import productCard from "./../components/productCard";

export default {
  components: {
    productCard,
  },
  data: () => ({
    bestProductData: null,
  }),
  mounted() {
    this.$axios
      .get(`${this.$store.state.apiUrl}best-seller?lang=${this.$store.state.lang}`)
      .then(
        (response) => (
          (this.bestProductData = response.data)
        )
      );
  },
};
</script>