<template>
  <div class="product_card" @click="productUrl(productCard.slug)">
    {{ activeFavorite }}
    <span class="like" @click.stop="addFavorite(productCard)"
      ><i class="far fa-heart" :class="{ fas: favoriteActive }"></i>
    </span>
    <router-link
      :to="{
        name: 'product',
        params: { id: productCard.slug },
      }"
    >
      <img
        class="product_card_img"
        :src="this.productImage(productCard)"
        alt=""
      />

      <div class="product_card_body">
        <p>
          {{ productCard.title }}
        </p>
      </div>
    </router-link>
    <div class="product_card_footer">
      <p>{{ productCard.current_price }} тг.</p>
      <a href="#cart"><img src="@/assets/images/shop_icon_small.svg" alt="" /></a>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  props: ["productCard"],
  data: () => ({
    imgUrl: "",
    favoriteActive: false,
    favoriteList: JSON.parse(localStorage.getItem("favorite")),
  }),
  computed: {
    ...mapGetters(["GET_FAVOURITE_COUNT"]),

    activeFavorite() {
      if (this.favoriteList) {
        this.favoriteList.filter((i) => {
          if (i.id === this.productCard.id) {
            this.favoriteActive = true;
          }
        });
      }
    },
  },
  
  methods: {
    ...mapActions(["GET_PRODUCT_PAGE"]),
    ...mapMutations(["ADD_FAVORITES"]),

    productImage(product) {
      if (product.images === null) {
        return require("../assets/images/image-not.svg");
      }
      if (product.product_images) {
        return this.imgUrl + product.product_images[0].image;
      }
      if (product.images.image) {
        return this.imgUrl + product.images.image;
      }
      if (product.images instanceof Array) {
        return this.imgUrl + product.images[0].image;
      }
    },

    productUrl(url) {
      this.GET_PRODUCT_PAGE(url);
    },

    addFavorite(product) {
      this.favoriteActive = !this.favoriteActive;
      this.ADD_FAVORITES(product);
      this.favoriteList = JSON.parse(localStorage.getItem("favorite"));
    },
  },

  mounted() {
    this.activeFavorite;
    this.imgUrl = this.$store.state.imgUrl;
  },
};
</script>

<style></style>
