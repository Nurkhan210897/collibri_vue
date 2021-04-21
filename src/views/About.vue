<template>
  <div class="about p_page">
    <div class="container">
      <div class="title_small text-center">
        <h1>О компании</h1>
      </div>
    </div>
    <div
      class="about_content"
      v-for="(item, idx) in aboutData"
      :key="item.title"
      :class="{ bgSilver: idx % 2 }"
    >
      <div class="container">
        <div class="row" v-if="idx % 2">
          <div class="col-xl-6">
            <img :src="imgUrl + item.image" alt="" />
          </div>
          <div class="col-xl-6">
            <p v-html="item.title"></p>
          </div>
        </div>
        <div class="row" v-else>
          <div class="col-xl-6">
            <p v-html="item.title"></p>
          </div>
          <div class="col-xl-6">
            <img :src="imgUrl + item.image" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    aboutData: null,
    imgUrl: null,
  }),
  mounted() {
    this.imgUrl = this.$store.state.imgUrl;
    this.$axios
      .get(`${this.$store.state.apiUrl}about?lang=${this.$store.state.lang}`)
      .then((response) => (this.aboutData = response.data));
  },
};
</script>

<style>
</style>