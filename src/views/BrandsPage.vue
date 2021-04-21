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
            <button class="btn btn_outline_dark d_none" @click="toggleFilter">
              Показать фильтры
            </button>
            <div
              class="products_select_wrapper products_select_mobile d_none"
              v-if="productCategory"
            >
              <span class="close_btn" @click="productCategory = false"
                ><img src="@/assets/images/close.svg" alt=""
              /></span>
              <div
                class="category_select"
                v-for="item in BRAND_PRODUCTS.filters"
                :key="item.id"
              >
                <div v-if="item.filter_items.length">
                  <p class="bold_text">{{ item.title }}</p>
                  <ul>
                    <li v-for="filter in item.filter_items" :key="filter.id">
                      <label class="custom-checkbox">
                        <input
                          type="checkbox"
                          :value="Number(filter.id)"
                          v-model="filter_id"
                          @change="addFilter"
                        />
                        <span>{{ filter.title }}</span>
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
              <a href="#">Показать еще</a>
            </div>
            <div class="products_select_wrapper products_select_mobile m_none">
              <span class="close_btn" alt=""></span>
              <div
                class="category_select"
                v-for="item in BRAND_PRODUCTS.filters"
                :key="item.id"
              >
                <div v-if="BRAND_PRODUCTS.filters">
                  <p class="bold_text">{{ item.title }}</p>
                  <ul>
                    <li v-for="filter in item.filter_items" :key="filter.id">
                      <label class="custom-checkbox">
                        <input
                          type="checkbox"
                          :value="Number(filter.id)"
                          v-model="filter_id"
                          @change="addFilter"
                        />
                        <span>{{ filter.title }}</span>
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
              <a href="#">Показать еще</a>
            </div>
          </div>
          <div class="col-xl-9 col-md-8">
            <div
              class="catalog_products"
              v-if="filteredProducts().products.data"
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
              <button
                class="btn btn_black"
                v-if="showMorebtn"
                @click="showMore"
              >
                Показать еще
              </button>
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

export default {
  components: { productCard },

  data: () => ({
    brandData: null,
    filter_id: [],
    productCategory: null,
    page: 1,
    showMorebtn: false,
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
      if (this.filter_id.length) {
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
        filterId: allFilterId,
      });
    },

    toggleFilter() {
      this.productCategory = !this.productCategory;
    },

    showMore() {
      let productUrl = this.$route.params.id;
      let lastPage = this.filteredProducts().products.last_page;
      console.log(lastPage);
      if (this.page <= lastPage) {
        this.page++;
      }
      if (this.page === lastPage) {
        this.showMorebtn = false;
      }
      this.MORE_BRAND_PRODUCTS({ productId: productUrl, page: this.page });
    },
  },

  computed: {
    ...mapGetters(["BRAND_PRODUCTS", "CATALOG_FILTER"]),
  },

  mounted() {
    let productUrl = this.$route.params.id;
    this.GET_BRAND_PRODUCTS(productUrl);
    this.brandData = this.BRAND_PRODUCTS;
  },
};
</script>
