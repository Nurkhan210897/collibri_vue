<template>
  <div>
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
        v-for="item in categories.filters.slice(0, categoryCount)"
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
      <a
        href="#"
        @click.prevent="allCategories"
        v-if="categories.filters.length > 3"
        >{{ allCategoriesText }}</a
      >
    </div>
    <div class="products_select_wrapper products_select_mobile m_none">
      <span class="close_btn" alt=""></span>
      <div
        class="category_select"
        v-for="item in categories.filters.slice(0, categoryCount)"
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
      <a
        href="#"
        @click.prevent="allCategories"
        v-if="categories.filters.length > 3"
        >{{ allCategoriesText }}</a
      >
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: ["categories", "type"],
  data: () => ({
    productCategory: null,
    categoryCount: 3,
    allCategoriesText: "Показать еще",
    filter_id: [],
  }),
  methods: {
    ...mapActions(["FILTER_PRODUCTS", "FILTER_BRAND_PRODUCTS"]),

    allCategories() {
      if (this.categoryCount === 3) {
        this.categoryCount = Infinity;
        this.allCategoriesText = "Скрыть";
      } else {
        this.categoryCount = 3;
        this.allCategoriesText = "Показать еще";
      }
    },

    addFilter() {
      let productUrl = this.$route.params.id;
      let allFilterId = this.filter_id;
      if (this.type === "filter_id") {
        this.FILTER_PRODUCTS({ productId: productUrl, filterId: allFilterId });
      } else if (this.type === "brand_id") {
        this.FILTER_BRAND_PRODUCTS({
          productId: productUrl,
          brandId: allFilterId,
        });
      }
    },

    toggleFilter() {
      this.productCategory = !this.productCategory;
    },
  },

  watch: {
    $route(to, from) {
      this.allCategoriesText = "Показать еще";
    },
  },
};
</script>

<style></style>
