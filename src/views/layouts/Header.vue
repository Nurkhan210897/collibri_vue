<template>
  <div class="header_wrapper" v-if="headerData">
    <div class="header">
      <div class="container">
        <div class="header_content row">
          <div class="col-xl-3 col-5 col-md-3 col-lg-3">
            <router-link to="/" class="logo">
              <img src="@/assets/images/Logo.svg" alt="" />
            </router-link>
          </div>
          <div class="col-xl-5 m_none col-md-4 col-lg-5">
            <form action="">
              <img src="@/assets/images/search_icon.svg" alt="" />
              <input
                type="text"
                placeholder="Поиск товара"
                @keyup="keyUpSearch"
                v-model="searchValue"
              />
            </form>
            <div class="formResults" v-if="searchData">
              <ul>
                <li
                  v-for="link in searchData.data"
                  :key="link.title"
                  @click="
                    (searchValue = ''),
                      (searchData = false),
                      productUrl(link.slug)
                  "
                >
                  <router-link
                    :to="{
                      name: 'product',
                      params: { id: link.slug },
                    }"
                    >{{ link.title }}</router-link
                  >
                </li>
              </ul>
            </div>
            <div
              class="formResults"
              v-else-if="!searchData && searchValue.length > 4"
            >
              <p class="m-0">Совпадении нет !</p>
            </div>
          </div>
          <div class="col-xl-4 col-5 col-md-5 col-lg-4">
            <div class="header_content_right">
              <a href="tel:+7 707 777-77-77" v-if="headerData" class="m_none"
                ><i class="fas fa-phone-alt"></i
                >{{ headerData.contacts.phone_number[0] }}</a
              >

              <div class="header_cart">
                <img
                  src="@/assets/images/search_icon_black.svg"
                  class="d_none"
                  alt=""
                  @click="mobileSearch = true"
                />
                <router-link to="/favorites" class="countFavorites"
                  ><i class="far fa-heart"></i>
                  <span v-if="favLength">{{ favLength }}</span>
                </router-link>
                <a href="#"
                  ><img src="@/assets/images/shop_icon.svg" alt=""
                /></a>
                <div class="lang">
                  <span>Ru</span>
                </div>
              </div>

              <!-- <div class="lang">
                  <span @click="changeLanguage">{{ switchLang }}</span>
                </div> -->
            </div>
          </div>
          <div class="col-2 d_none">
            <div
              class="burger_menu"
              @click="toggleMobileMenu"
              :class="{ burger_active: mobileMenu }"
            >
              <span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mobile_search" v-if="mobileSearch">
      <span class="close_btn" @click="mobileSearch = false"
        ><img src="@/assets/images/close.svg" alt=""
      /></span>
      <form action="">
        <img src="@/assets/images/search_icon.svg" alt="" />
        <input
          type="text"
          placeholder="Поиск товара"
          @keyup="keyUpSearch"
          @keyup.enter="keyUpSearch"
          v-model="searchValue"
        />
      </form>
      <div class="formResults" v-if="searchData">
        <ul>
          <li
            v-for="link in searchData.data"
            :key="link.title"
            @click="
              (searchValue = ''), (searchData = false), productUrl(link.slug)
            "
          >
            <router-link
              :to="{
                name: 'product',
                params: { id: link.slug },
              }"
              >{{ link.title }}</router-link
            >
          </li>
        </ul>
      </div>
      <div
        class="formResults"
        v-else-if="!searchData && searchValue.length > 4"
      >
        <p class="m-0">Совпадении нет !</p>
      </div>
    </div>
    <div class="nav m_none">
      <div class="container">
        <ul>
          <li>
            <router-link to="/" class="logo">Главная</router-link>
          </li>
          <li class="dropdown_link">
            <span @click="navDropdown = !navDropdown"
              >Каталог
              <transition name="slide-fade">
                <span class="arrow_dropdown" v-if="navDropdown"></span>
              </transition>
            </span>

            <transition name="slide-fade">
              <div class="nav_dropdown" v-if="navDropdown">
                <div class="container">
                  <div class="row">
                    <div
                      class="col-xl-3 dropdown_links"
                      v-for="category in headerData.categories"
                      :key="category.id"
                    >
                      <div @click="categoryUrl(category.id)">
                        <router-link
                          class="category_title"
                          :to="{
                            name: 'catalogPage',
                            params: { id: category.id, slug: category.slug },
                          }"
                          >{{ category.title }}</router-link
                        >
                      </div>
                      <div
                        v-for="subCategory in category.subcategories"
                        :key="subCategory.id"
                        @click="categoryUrl(subCategory.id)"
                      >
                        <router-link
                          :to="{
                            name: 'catalogPage',
                            params: {
                              id: subCategory.id,
                              slug: subCategory.slug,
                            },
                          }"
                          >{{ subCategory.title }}</router-link
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </transition>
          </li>
          <li>
            <router-link to="/brands" data-hover="Бренды">Бренды</router-link>
          </li>
          <li>
            <router-link to="/about" data-hover="О компании"
              >О компании</router-link
            >
          </li>
          <li>
            <router-link to="/blogs" data-hover="Блог">Блог</router-link>
          </li>
          <li>
            <router-link to="/contacts" data-hover="Контакты"
              >Контакты</router-link
            >
          </li>
        </ul>
      </div>
    </div>
    <div class="mobile_nav_menu" :class="{ mobile_menu_active: mobileMenu }">
      <div class="nav_top_menu">
        <div class="logo">
          <img src="@/assets/images/Logo.svg" alt="" />
        </div>
      </div>
      <div class="mobile_nav_links">
        <ul>
          <li>
            <a href="/" class="">Главная</a>
          </li>
          <div class="mobile_dropdown">
            <li v-for="category in headerData.categories" :key="category.id">
              <div class="mob_dropdown_toggle">
                <span @click="categoryUrl(category.id), (mobileMenu = false)">
                  <router-link
                    class="category_title"
                    :to="{
                      name: 'catalogPage',
                      params: { id: category.id, slug: category.slug },
                    }"
                    >{{ category.title }}</router-link
                  >
                </span>

                <span @click="dropdownToggle(category.title)"
                  ><img src="@/assets/images/chevron_but.svg" alt="" />
                </span>
              </div>
              <transition name="slide">
                <div
                  class="mobile_dropdown"
                  v-if="mobileDropdown === category.title"
                >
                  <ul>
                    <li
                      v-for="subCategory in category.subcategories"
                      :key="subCategory.id"
                      @click="categoryUrl(subCategory.id), (mobileMenu = false)"
                    >
                      <router-link
                        :to="{
                          name: 'catalogPage',
                          params: {
                            id: subCategory.id,
                            slug: subCategory.slug,
                          },
                        }"
                        >{{ subCategory.title }}</router-link
                      >
                    </li>
                  </ul>
                </div>
              </transition>
            </li>
          </div>
          <li @click="mobileMenu = false">
            <router-link to="/brands">Бренды </router-link>
          </li>
          <li @click="mobileMenu = false">
            <router-link to="/about">О компании </router-link>
          </li>
          <li @click="mobileMenu = false">
            <router-link to="/blogs">Блог </router-link>
          </li>
          <li @click="mobileMenu = false">
            <router-link to="/contacts">Контакты </router-link>
          </li>
        </ul>
      </div>
      <div class="mobile_nav_footer">
        <a href="tel:+7 (777) 777-77-77 ">{{
          headerData.contacts.phone_number[0]
        }}</a>
        <!-- <div class="share_links">
          <a href="#"><img src="@/assets/images/tg_black_icon.svg" alt="" /></a>
          <a href="#"
            ><img src="@/assets/images/face_black_icon.svg" alt=""
          /></a>
          <a href="#"><img src="@/assets/images/wp_black_icon.svg" alt="" /></a>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data: () => ({
    navDropdown: false,
    mobileMenu: false,
    category: null,
    mobileDropdown: null,
    lang: "ru",
    headerData: null,
    searchData: null,
    searchValue: "",
    favoriteList: null,
    lang: null,
    mobileSearch: false,
  }),
  computed: {
    ...mapGetters(["GET_FAVOURITE_COUNT"]),

    favLength() {
      if (
        this.GET_FAVOURITE_COUNT &&
        JSON.parse(localStorage.getItem("favorite"))
      ) {
        return JSON.parse(localStorage.getItem("favorite")).length;
      }
    },

    // switchLang() {
    //   if(localStorage.getItem('lang')){
    //     return localStorage.getItem('lang')
    //   }else{
    //     return 'ru'
    //   }
    // },
  },
  methods: {
    ...mapActions(["GET_PRODUCTS", "GET_PRODUCT_PAGE"]),

    keyUpSearch(e) {
      let vm = this;
      if (this.searchValue.length > 3) {
        this.$axios
          .get(
            `${this.$store.state.apiUrl}search?lang=${this.lang}&text=${this.searchValue}`
          )
          .then(function (response) {
            if (response.data.data.length) {
              vm.searchData = response.data;
            } else {
              vm.searchData = null;
            }
          });
      } else {
        this.searchData = null;
      }
    },

    toggleMobileMenu() {
      this.mobileMenu = !this.mobileMenu;
      if (this.mobileMenu) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "scroll";
      }
    },

    dropdownToggle(category) {
      if (this.mobileDropdown === null) {
        this.mobileDropdown = category;
      } else {
        this.mobileDropdown = null;
      }
    },

    categoryUrl(id) {
      this.navDropdown = false;
      this.GET_PRODUCTS(this.$route.params.id);
    },

    changeLanguage() {
      this.$store.commit("CHANGE_LANGUAGE");
    },

    productUrl(url) {
      this.GET_PRODUCT_PAGE(url);
    },
  },
  mounted() {
    this.lang = this.$store.state.lang;
    this.favoriteList = JSON.parse(localStorage.getItem("favorite"));
    this.$axios
      .get(
        `${this.$store.state.apiUrl}get-header?lang=${this.$store.state.lang}`
      )
      .then((response) => (this.headerData = response.data));
  },
  watch: {
    mobileMenu(item) {
      if (item) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "scroll";
      }
    },
    mobileSearch(item) {
      if (item) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "scroll";
      }
    },
    $route(to, from) {
      this.navDropdown = false;
      this.mobileSearch = false;
    },
  },
};
</script>
