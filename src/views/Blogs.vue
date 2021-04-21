<template>
  <div class="blog p_page">
    <div class="container">
      <div class="title_small text-center">
        <h1>Блог</h1>
      </div>
      <div class="blog_content">
        <div class="row">
          <div
            class="col-xl-4 col-md-6 col-lg-4"
            v-for="blog in blogsData.blogs.data"
            :key="blog.id"
          >
            <div class="card">
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
                  <h5 class="card-title">{{ blog.title.slice(0, 50) + " ..." }}</h5>
                  <p class="card-text">{{ dateBlog(blog.created_at) }}</p>
                </div>
              </router-link>
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
    blogsData: null,
    imgUrl: null,
  }),
  methods: {
    dateBlog(date) {
      let getyear = new Date().getUTCFullYear(date);
      let getmounth = new Date().getUTCMonth(date);
      if (getmounth < 10) getmounth = "0" + getmounth;
      let getday = new Date().getUTCDate(date);
      if (getday < 10) getday = "0" + getday;

      return getday + "." + getmounth + "." + getyear;
    },
  },
  mounted() {
    this.imgUrl = this.$store.state.imgUrl;
    this.$axios
      .get(
        `${this.$store.state.apiUrl}get-blogs?lang=${this.$store.state.lang}`
      )
      .then((response) => (this.blogsData = response.data));
    
  },
};
</script>

<style></style>
