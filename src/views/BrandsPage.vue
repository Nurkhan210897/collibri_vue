<template>
  <div class="catalog_wrapper p_page">
    <div class="loader_wrapper" v-if="$store.state.loader">
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
    <div class="container" v-else>
      <div class="title_page">
        <h1>Бренды</h1>
      </div>
      <div class="nav_page" v>
        <div class="breadcrumbs">
          <router-link to="/">Главная</router-link>
          <router-link to="/brands">Бренды</router-link>
        </div>
      </div>

      <div class="catalog_content">
        <div class="row">
          <div class="col-xl-3 col-md-4">
            <category-select :categories="BRAND_PRODUCTS" type="brand_id" />
          </div>
          <div class="col-xl-9 col-md-8">
            <div
              class="catalog_products"
              v-if="filteredProducts().products.data.length"
            >
              <div class="row">
                <div
                  class="col-xl-4 col-md-6 col-lg-4"
                  v-for="card in filteredProducts().products.data"
                  :key="card.id"
                >
                  <productCard :productCard="card"></productCard>
                </div>
              </div>
              <a
                :href="nextPageUrl"
                class="btn btn_black"
                v-if="
                  this.filteredProducts().products.last_page !== 1 &&
                    page !== this.filteredProducts().products.last_page
                "
                @click.prevent="showMore"
                :class="{ disabled: moreLoader !== null }"
              >
                {{ moreLoaderShow }}
                <div class="loader" v-if="moreLoader !== null"></div>
              </a>
            </div>
            <div v-else>
              <h2>В данной категорий нет продуктов!</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import productCard from "./../components/productCard";
import CategorySelect from "../components/categorySelect.vue";

export default {
  components: { productCard, CategorySelect },

  data: () => ({
    brandData: null,
    filter_id: [],
    productCategory: null,
    page: 1,
    showMorebtn: false,
    moreLoader: null,
    nextPage: null,
  }),

  methods: {
    ...mapActions([
      "GET_PRODUCTS",
      "GET_PRODUCT_PAGE",
      "GET_BRAND_PRODUCTS",
      "FILTER_BRAND_PRODUCTS",
      "SORTED_PRODUCTS",
      "MORE_BRAND_PRODUCTS",
    ]),

    filteredProducts() {
      if (this.CATALOG_FILTER.products) {
        return this.CATALOG_FILTER;
      } else {
        return this.BRAND_PRODUCTS;
      }
    },

    addFilter() {
      let productUrl = this.$route.params.id;
      let allFilterId = this.filter_id;
      this.FILTER_BRAND_PRODUCTS({
        productId: productUrl,
        brandId: allFilterId,
      });
    },

    toggleFilter() {
      this.productCategory = !this.productCategory;
    },

    showMore() {
      let productUrl = this.$route.params.id;
      let lastPage = this.filteredProducts().products.last_page;
      console.log(lastPage);
      if (this.page < lastPage) {
        this.page++;
        console.log(this.page);
      }
      if (this.page === lastPage) {
        this.showMorebtn = false;
      }
      this.MORE_BRAND_PRODUCTS({ productId: productUrl, page: this.page });
    },
  },

  computed: {
    ...mapGetters(["BRAND_PRODUCTS", "CATALOG_FILTER"]),

    nextPageUrl() {
      let nextPageStore = this.$store.state.nextPage;
      return !nextPageStore
        ? (this.nextPage = this.BRAND_PRODUCTS.products.next_page_url)
        : (this.nextPage = this.$store.state.nextPage);
    },

    moreLoaderShow() {
      this.moreLoader = this.$store.state.moreLoader;
      if (!this.moreLoader) {
        return "Показать еще";
      } else {
        return "";
      }
    },
  },

  mounted() {
    this.CATALOG_FILTER.products = null;
    let productUrl = this.$route.params.id;
    this.GET_BRAND_PRODUCTS(productUrl);
    this.brandData = this.BRAND_PRODUCTS;
  },

};
</script>
