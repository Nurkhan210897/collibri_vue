<template>
  <div class="catalog_wrapper p_page" v-if="newProductData">
    <div class="container">
      <div class="title_page">
        <h1>Новинки</h1>
      </div>
      <div class="nav_page">
        <div class="breadcrumbs">
          <router-link to="/">Главная</router-link>
          <router-link to="/new">Новинки</router-link>
        </div>
      </div>

      <div class="catalog_content">
        <div class="catalog_products" v-if="newProductData.products.length">
          <div class="row">
            <div
              class="col-xl-3 col-md-6 col-lg-3"
              v-for="card in newProductData.products"
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
    newProductData: null,
  }),
  mounted() {
    this.$axios
      .get(`${this.$store.state.apiUrl}new?lang=${this.$store.state.lang}`)
      .then(
        (response) => (
          (this.newProductData = response.data)
        )
      );
  },
};
</script>