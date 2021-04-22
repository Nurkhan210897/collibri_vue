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
      <div v-if="CATEGORY_PRODUCTS">
        <div class="title_page"></div>
        <div class="nav_page">
          <div class="breadcrumbs">
            <router-link to="/">Главная</router-link>
            <router-link
              v-if="CATEGORY_PRODUCTS.category_parent"
              :to="CATEGORY_PRODUCTS.category_parent.slug"
              >{{ CATEGORY_PRODUCTS.category_parent.title }}</router-link
            >
            <router-link
              v-if="CATEGORY_PRODUCTS.category"
              :to="CATEGORY_PRODUCTS.category.slug"
              >{{ CATEGORY_PRODUCTS.category.title }}</router-link
            >
          </div>
          <div class="sort_select m_none">
            <p class="silver_text">Сортировать по:</p>
            <select
              class="select_2"
              name="state"
              v-model="sortedCategory"
              @change="sortedProducts"
            >
              <option value="">По умолчанию</option>
              <option value="ASC">По возрастанию цены</option>
              <option value="DESC">По убыванию цены</option>
            </select>
          </div>
        </div>
        <div class="catalog_content" v-if="GET_PRODUCTS">
          <div class="row">
            <div class="col-xl-3 col-md-4">
              <category-select :categories="CATEGORY_PRODUCTS" type="filter_id"/>
            </div>
            <div class="col-xl-9 col-md-8">
              <div v-if="filteredProducts().products.data.length">
                <div
                  v-if="loaderProducts"
                  class="loader_wrapper loader_products"
                >
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
                <div class="catalog_products" v-else>
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
              </div>
              <div v-else class="pt-3 pb-3">
                <h3>В данной категорий нет продуктов!</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import CategorySelect from '../components/categorySelect.vue';
import productCard from "./../components/productCard";

export default {
  components: { productCard, CategorySelect },
  data: () => ({
    lang: "ru",
    paramUrl: null,
    imgUrl: null,
    filter_id: [],
    sortedCategory: "",
    page: 1,
    showMorebtn: true,
    loader: null,
    loadingProducts: null,
    nextPage: null,
    categoryCount: 3,
    moreLoader: null,
    allCategoriesText: "Показать еще",
  }),

  methods: {
    ...mapActions([
      "GET_PRODUCTS",
      "GET_PRODUCT_PAGE",
      "FILTER_PRODUCTS",
      "SORTED_PRODUCTS",
      "MORE_PRODUCTS",
    ]),

    toggleFilter() {
      this.productCategory = !this.productCategory;
    },

    addFilter() {
      let productUrl = this.$route.params.id;
      let allFilterId = this.filter_id;
      this.FILTER_PRODUCTS({ productId: productUrl, filterId: allFilterId });
    },

    filteredProducts() {
      if (this.CATALOG_FILTER.products) {
        return this.CATALOG_FILTER;
      } else {
        return this.CATEGORY_PRODUCTS;
      }
    },

    sortedProducts() {
      let productUrl = this.$route.params.id;
      this.SORTED_PRODUCTS({
        productId: productUrl,
        sortedProduct: this.sortedCategory,
      });
    },

    showMore() {
      let productUrl = this.$route.params.id;
      let lastPage = this.filteredProducts().products.last_page;
      if (this.page <= lastPage) {
        this.page++;
      }
      if (this.page === lastPage) {
        this.showMorebtn = false;
      }
      this.MORE_PRODUCTS({ productId: productUrl, page: this.page });
    },

    allCategories() {
      if (this.categoryCount === 3) {
        this.categoryCount = Infinity;
        this.allCategoriesText = "Скрыть";
      } else {
        this.categoryCount = 3;
        this.allCategoriesText = "Показать еще";
      }
    },
  },

  computed: {
    ...mapGetters(["CATEGORY_PRODUCTS", "CATALOG_FILTER"]),

    loaderProducts() {
      return (this.loadingProducts = this.$store.state.loadingProducts);
    },

    nextPageUrl() {
      let nextPageStore = this.$store.state.nextPage;
      return !nextPageStore
        ? (this.nextPage = this.CATEGORY_PRODUCTS.products.next_page_url)
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
    this.loader = this.$store.state.loader;
    this.imgUrl = this.$store.state.imgUrl;
    let productUrl = this.$route.params.id;
    this.GET_PRODUCTS(productUrl);
  },

  updated() {
    if (this.filteredProducts().products) {
      let lastPage = this.filteredProducts().products.last_page;
      if (lastPage === this.page) {
        this.showMorebtn = false;
      } else {
        this.showMorebtn = true;
      }
    }
  },

  watch: {
    $route(to, from) {
      this.page = 1;
      this.categoryCount = 3;
      this.allCategoriesText = "Показать еще";
    },
    productCategory() {
      if (this.productCategory) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "scroll";
      }
    },
  },
};
</script>
