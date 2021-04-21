<template>
  <div>
    <footer v-if="footerData">
      <div class="container">
        <div class="footer_content">
          <div class="row">
            <div class="col-xl-4 col-lg-3 col-md-3">
              <div class="company_info">
                <router-link to="/" class="logo">
                  <img src="@/assets/images/logo_footer.svg" alt="" />
                </router-link>
                <div class="company_info_text">
                  <p>Collibri © {{ fullYear() }}</p>
                  <!-- <p>Разработка сайта от Studio Nomad</p> -->
                </div>
              </div>
            </div>
            <div class="col-xl-8 col-lg-9 col-md-9 mobile_footer">
              <div class="row">
                <div class="col-xl-4 col-lg-4 col-md-4">
                  <p class="footer_links_title">Информация</p>
                  <ul>
                    <li>
                      <router-link to="/" class="logo">Главная</router-link>
                    </li>
                    <li>
                      <router-link to="/brands" data-hover="Бренды"
                        >Бренды</router-link
                      >
                    </li>
                    <li>
                      <router-link to="/about" data-hover="О компании"
                        >О компании</router-link
                      >
                    </li>
                    <li>
                      <router-link to="/blogs" data-hover="Блог"
                        >Блог</router-link
                      >
                    </li>
                    <li>
                      <router-link to="/contacts" data-hover="Контакты"
                        >Контакты</router-link
                      >
                    </li>
                  </ul>
                </div>
                <div class="col-xl-4 col-lg-4 col-md-4">
                  <p class="footer_links_title">Продукция</p>
                  <ul v-if="footerData">
                    <li
                      v-for="link in footerData.categories"
                      :key="link.id"
                      @click="categoryUrl(link.id)"
                    >
                      <router-link
                        :to="{
                          name: 'catalogPage',
                          params: { id: link.id, slug: link.slug },
                        }"
                        ><img src="@/assets/images/arrow_right.svg" alt="" />
                        {{ link.title }}
                      </router-link>
                    </li>
                  </ul>
                </div>
                <div class="col-xl-4 col-lg-4 col-md-4">
                  <p class="footer_links_title">Контакты</p>
                  <ul v-if="footerData">
                    <li>
                      <a :href="'tel:' + footerData.contacts.phone_number[0]"
                        ><img src="@/assets/images/call_icon.svg" alt="" />
                        {{ footerData.contacts.phone_number[0] }}
                      </a>
                    </li>
                    <li>
                      <a :href="'mailto:' + footerData.contacts.email"
                        ><img src="@/assets/images/email_icon.svg" alt="" />
                        {{ footerData.contacts.email }}</a
                      >
                    </li>
                    <li>
                      <a href="#"
                        ><img src="@/assets/images/loc_icon.svg" alt="" /> г.
                        {{ footerData.contacts.address }}</a
                      >
                    </li>
                  </ul>
                  <div class="footer_social d-flex align-items-center">
                    <a
                      :href="'https://api.whatsapp.com/send?phone='+footerData.contacts.whats_app"
                      target="blank"
                      v-if="footerData.contacts.whats_app"
                    >
                      <i class="fab fa-whatsapp"></i>
                    </a>
                    <!-- <a
                      href="https://t.me/Nurhanator"
                      target="blank"
                      v-if="footerData.contacts.telegram"
                    >
                      <i class="fab fa-telegram-plane"></i>
                    </a> -->
                    <a
                      href="https://instagram.com/collibri.beauty?igshid=rznyy0dd09oc"
                      target="blank"
                      ><img src="@/assets/images/inst_icon.svg" alt=""
                    /></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="company_info_text d_none">
            <p>Collibri © {{ fullYear() }}</p>
            <!-- <p>Разработка сайта от Studio Nomad</p> -->
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data: () => ({
    lang: "ru",
    footerData: null,
  }),
  methods: {
    ...mapActions(["GET_PRODUCTS"]),

    categoryUrl(id) {
      this.navDropdown = false;
      this.GET_PRODUCTS(this.$route.params.id);
    },

    fullYear() {
      return new Date().getFullYear();
    },
  },
  mounted() {
    this.$axios
      .get(`${this.$store.state.apiUrl}get-footer?lang=${this.lang}`)
      .then((response) => (this.footerData = response.data));
  },
};
</script>

<style></style>
