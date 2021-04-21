<template>
  <div class="blog_inner">
    <div>
      <div class="blog_banner">
        <img :src="imgUrl + blogPage.blog.image" alt="" />
      </div>
      <div class="container">
        <div class="blog_inner_text">
          <div class="title_page">
            <h1>{{ blogPage.blog.title }}</h1>
          </div>
          <br />
          <p>{{ blogPage.blog.content }}</p>
        </div>
        <div class="share_blog">
          <p>Поделиться:</p>
          <div class="socials_icon">
            <yandex-share
              :services="['facebook', 'telegram', 'whatsapp']"
              counter
            />
          </div>
        </div>
        <div class="other_articles">
          <div class="title_center">
            <h2>Другие статьи</h2>
          </div>
          <div class="row blog_content">
            <div
              class="col-xl-4 col-lg-4 col-md-6"
              v-for="blog in blogPage.others"
              :key="blog.id"
            >
              <div class="card" @click="otherBlogs">
                <router-link
                  :to="{
                    name: 'blogPage',
                    params: { id: blog.slug },
                  }"
                >
                  <img
                    :src="imgUrl + blog.image"
                    class="card-img-top"
                    alt="..."
                  />
                  <div class="card-body">
                    <h5 class="card-title">{{ blog.title }}</h5>
                    <p class="card-text">13.04.2020</p>
                  </div>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    blogPage: null,
    imgUrl: null,
  }),
  methods: {
    otherBlogs() {
      let urlBlog = this.$route.params.id;
      this.$store.state.loader = true;
      this.$axios
        .get(
          `${this.$store.state.apiUrl}get-blog?lang=${this.$store.state.lang}&slug=${urlBlog}`
        )
        .then((response) => (this.blogPage = response.data));
      this.$store.state.loader = false;
    },
  },
  mounted() {
    this.imgUrl = this.$store.state.imgUrl;
    let urlBlog = this.$route.params.id;
    this.$axios
      .get(
        `${this.$store.state.apiUrl}get-blog?lang=${this.$store.state.lang}&slug=${urlBlog}`
      )
      .then((response) => (this.blogPage = response.data));
  },
};
</script>

<style>
</style>