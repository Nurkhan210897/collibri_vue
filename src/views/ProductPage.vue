<template>
  <div class="page_product_wrapper p_page">
    <pre>{{ activeFavorite }}</pre>
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
      <div v-if="PRODUCT_ITEM">
        <div class="nav_page">
          <div class="breadcrumbs">
            <router-link to="/">Главная</router-link>
            <router-link to="/">Каталог</router-link>
            <router-link
              :to="{
                name: 'catalogPage',
                params: {
                  id: PRODUCT_ITEM.category_parent.parent_id,
                  slug: PRODUCT_ITEM.category_parent.slug,
                },
              }"
              >{{ PRODUCT_ITEM.category_parent.title }}</router-link
            >
            <router-link :to="PRODUCT_ITEM.category.title">{{
              PRODUCT_ITEM.category.title
            }}</router-link>
          </div>
          <div class="like">
            <i
              class="far fa-heart"
              @click="addFavorite(PRODUCT_ITEM.product)"
              :class="{ fas: favoriteActive }"
            ></i>
          </div>
        </div>
        <div class="product_content">
          <div class="like d-none">
            <i
              class="far fa-heart"
              @click="addFavorite(PRODUCT_ITEM.product)"
              :class="{ fas: favoriteActive }"
            ></i>
          </div>
          <div class="row">
            <div class="col-xl-6 col-lg-6">
              <div
                class="slider_product"
                v-if="PRODUCT_ITEM.product.product_images"
              >
                <VueSlickCarousel
                  ref="c1"
                  :asNavFor="$refs.c2"
                  :focusOnSelect="true"
                >
                  <img
                    v-for="(slide, idx) in PRODUCT_ITEM.product.product_images"
                    :key="idx"
                    :src="imgUrl + slide.image"
                    alt=""
                  />
                </VueSlickCarousel>
                <div
                  class="slider-nav"
                  v-if="PRODUCT_ITEM.product.product_images.length > 1"
                >
                  <VueSlickCarousel
                    ref="c2"
                    :asNavFor="$refs.c1"
                    v-bind="settingsSliderNav"
                  >
                    <img
                      v-for="(slide, idx) in PRODUCT_ITEM.product
                        .product_images"
                      :key="idx"
                      :src="imgUrl + slide.image"
                      alt=""
                    />
                  </VueSlickCarousel>
                </div>
              </div>
            </div>
            <div class="col-xl-6 col-lg-6">
              <div class="product_info">
                <div class="product_info_top">
                  <p class="green_text" v-if="PRODUCT_ITEM.product.stock > 0">
                    В НАЛИЧИИ
                  </p>
                  <div class="d-flex">
                    <p>
                      Артикул:
                      <span class="silver_text">{{
                        PRODUCT_ITEM.product.artikul
                      }}</span>
                    </p>
                  </div>
                </div>
                <div class="product_title">
                  <p>
                    Бренд:
                    <span class="big_text">{{
                      PRODUCT_ITEM.product.brand_name
                    }}</span>
                  </p>
                  <h2>{{ PRODUCT_ITEM.title }}</h2>
                </div>
                <div
                  class="product_text"
                  v-html="PRODUCT_ITEM.product.title"
                ></div>
                <div class="product_price">
                  <p
                    class="small_text silver_text"
                    v-if="PRODUCT_ITEM.product.sale > 0"
                  >
                    {{ PRODUCT_ITEM.product.price }} тг
                  </p>
                  <p class="bold_text">
                    {{ PRODUCT_ITEM.product.current_price }} тг
                  </p>
                  <a href="#" class="t_block d_none m_none"
                    >КУПИТЬ В ОДИН КЛИК</a
                  >
                </div>
                <div class="buy_content">
                  <div class="product_count">
                    <button class="btn btn_add" @click="decrementValue">
                      <span>-</span>
                    </button>
                    <span class="total_count">{{ countValue }}</span>
                    <button class="btn btn_add" @click="incrementValue">
                      <span>+</span>
                    </button>
                  </div>
                  <button
                    class="btn btn_black btn_border_radius m_none"
                    @click="modal = !modal"
                  >
                    Заказать звонок
                  </button>
                  <a href="#" class="t_none" @click="modal = !modal"
                    >КУПИТЬ В ОДИН КЛИК</a
                  >
                </div>
                <button
                  class="btn btn_black btn_border_radius d_none"
                  @click="modal = !modal"
                >
                  Заказать звонок
                </button>
                <button class="btn btn_black btn_border_radius d-none">
                  ДОБАВИТЬ В КОРЗИНУ
                </button>
              </div>
              <div class="description_tabs">
                <div class="tabs_switches">
                  <a
                    href="#"
                    class="tab_link"
                    @click.prevent="tab = 'description'"
                    :class="{ active_tab: tab === 'description' }"
                    >Описание товара</a
                  >
                  <a
                    href="#"
                    class="tab_link"
                    @click.prevent="tab = 'specifications'"
                    :class="{ active_tab: tab === 'specifications' }"
                    >Характеристики</a
                  >
                </div>
                <div class="tabs_content" v-if="tab === 'description'">
                  <div
                    class="silver_text"
                    v-html="PRODUCT_ITEM.product.description"
                  ></div>
                </div>
                <div class="tabs_content" v-if="tab === 'specifications'">
                  <div
                    class="silver_text"
                    v-html="PRODUCT_ITEM.product.specifications"
                  ></div>
                </div>
              </div>
              <div class="share">
                <p>Поделиться:</p>
                <yandex-share
                  :services="['facebook', 'telegram', 'whatsapp']"
                  counter
                />
              </div>
            </div>
          </div>
        </div>

        <div
          class="product_slider_wrapper"
          v-if="PRODUCT_ITEM.recomend_products.length"
        >
          <div class="title_block">
            <h2>Рекомендуемый товар</h2>
          </div>
          <div class="product_slider">
            <VueSlickCarousel v-bind="settingsRecomendSlider" >
              <productCard
                v-for="(slide, idx) in PRODUCT_ITEM.recomend_products"
                :key="idx"
                :productCard="slide"
              ></productCard>
            </VueSlickCarousel>
          </div>
        </div>
        <transition name="slide-fade">
          <div class="modal" v-if="modal" ref="modal">
            <div class="contacts_form">
              <span @click="modal = false" class="close"
                ><img src="@/assets/images/close.svg" alt=""
              /></span>
              <div class="title text-center m-0">
                <h3>Отправить звонок</h3>
                <p class="typo__p" v-if="submitStatus === 'OK'">
                  Заявка отправлена
                </p>
              </div>

              <form
                ref="form"
                action=""
                @submit.prevent="submit"
                :class="{ 'form-group--error': $v.name.$error }"
              >
                <input
                  type="text"
                  placeholder="Имя"
                  v-model.trim="name"
                  :class="{ invalid: $v.name.$dirty && !$v.name.required }"
                />
                <span v-if="$v.name.$error" class="error"
                  >Имя не правильно заполнено!</span
                >
                <the-mask
                  :mask="['#(###) ###-####']"
                  v-model.trim="phone"
                  placeholder="Номер телефона"
                  :class="{
                    invalid:
                      ($v.phone.$dirty && !$v.phone.required) ||
                      ($v.phone.$dirty && !$v.phone.minLength),
                  }"
                />
                <span v-if="$v.phone.$error" class="error"
                  >Номер телефона должен быть из 11 символов. Сейчас он
                  {{ phone.length }}</span
                >
                <input
                  type="text"
                  placeholder="Email"
                  v-model.trim="email"
                  :class="{
                    invalid:
                      ($v.email.$dirty && !$v.email.required) ||
                      ($v.email.$dirty && !$v.email.email),
                  }"
                />
                <span v-if="$v.email.$dirty && $v.email.$error" class="error"
                  >Email не правильно заполнено!</span
                >
                <input
                  type="text"
                  placeholder="Наименование организации"
                  v-model="company"
                />
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                  placeholder="Комментарии"
                ></textarea>
                <vue-recaptcha
                  @verify="markRecaptchaAsVerified"
                  sitekey="6LfqcKIaAAAAAH10CNN9QHQxelvTcaoaUDKCDUZv"
                  class="mt-3 mb-4"
                ></vue-recaptcha>
                <span class="error mb-4 d-block">{{
                  loginForm.pleaseTickRecaptchaMessage
                }}</span>
                <button type="btn" class="btn btn_black">Отправить</button>
              </form>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import VueSlickCarousel from "vue-slick-carousel";
import { required, email, minLength } from "vuelidate/lib/validators";
import VueRecaptcha from "vue-recaptcha";
import productCard from "./../components/productCard";

export default {
  components: { VueSlickCarousel, VueRecaptcha, productCard },
  data: () => ({
    tab: "description",
    productData: null,
    countValue: 1,
    modal: false,
    imgUrl: null,
    name: "",
    phone: "",
    email: "",
    comment: "",
    company: "",
    submitStatus: null,
    rec: false,
    favoriteActive: false,
    favoriteList: JSON.parse(localStorage.getItem("favorite")),
    settingsRecomendSlider: {
      arrows: true,
      dots: false,
      focusOnSelect: true,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      touchMove: true,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            centerMode: true,
          },
        },
        {
          breakpoint: 1000,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
      ],
    },
    settingsSliderNav: {
      slidesToShow: 4,
      focusOnSelect: true,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            centerMode: true,
          },
        },
        {
          breakpoint: 1000,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
      ],
    },
    loginForm: {
      recaptchaVerified: false,
      pleaseTickRecaptchaMessage: "",
    },
  }),

  validations: {
    name: {
      required,
      minLength: minLength(3),
    },
    comment: {
      required,
      minLength: minLength(15),
    },
    phone: {
      required,
      minLength: minLength(11),
    },

    email: {
      email,
      required,
    },
  },

  computed: {
    ...mapGetters(["PRODUCT_ITEM"]),

    activeFavorite() {
      if (this.favoriteList && this.PRODUCT_ITEM) {
        this.favoriteList.filter((i) => {
          if (i.id === this.PRODUCT_ITEM.product.id) {
            this.favoriteActive = true;
          } else {
            this.favoriteActive = false;
          }
        });
      }
    },
  },

  methods: {
    ...mapActions(["GET_PRODUCT_PAGE", "GET_PRODUCTS"]),
    ...mapMutations(["ADD_FAVORITES"]),

    addFavorite(product) {
      this.ADD_FAVORITES(product);
      this.favoriteList = JSON.parse(localStorage.getItem("favorite"));
    },

    markRecaptchaAsVerified(response) {
      this.loginForm.pleaseTickRecaptchaMessage = "";
      this.loginForm.recaptchaVerified = true;
    },

    decrementValue() {
      if (this.countValue > 1) {
        this.countValue--;
      }
    },

    incrementValue() {
      this.countValue++;
    },

    productUrl(url) {
      this.GET_PRODUCT_PAGE(url);
    },

    categoryUrl(id) {
      this.navDropdown = false;
      this.GET_PRODUCTS(this.$route.params.id);
    },

    submit() {
      let formData = {
        name: this.name,
        email: this.email,
        phone: this.phone,
        comment: this.comment,
        product_id: this.PRODUCT_ITEM.product.id,
        count: this.countValue,
        company: this.company,
      };

      this.$v.$touch();
      if (this.$v.$invalid && !this.loginForm.recaptchaVerified) {
        this.loginForm.pleaseTickRecaptchaMessage =
          "Подтвердите что вы не робот!";
        return false;
      } else {
        this.submitStatus = "PENDING";
        this.$axios
          .post(`${this.$store.state.apiUrl}order`, {
            formData,
          })
          .then((response) => {
            this.submitStatus = "OK";
            setTimeout(() => {
              if ((this.submitStatus = "OK")) {
                this.modal = false;
                this.submitStatus = null;
                this.name = "";
                this.email = "";
                this.phone = "";
                this.comment = "";
                this.countValue = "";
                this.company = "";
                this.$v.$reset();
              }
            }, 3000);
          });
      }
    },
  },

  mounted() {
    this.imgUrl = this.$store.state.imgUrl;
    let vm = this;
    let productUrl = this.$route.params.id;
    this.productData = this.GET_PRODUCT_PAGE(productUrl);

    document.addEventListener("click", function (e) {
      if (e.target === vm.$refs["modal"]) {
        vm.modal = false;
      }
    });
  },
};
</script>

<style></style>
