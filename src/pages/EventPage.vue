<template>
  <div>
    <Sidebar />
    <span v-html="pageData"></span>
  </div>
</template>

<script>
import axios from "axios";
import Sidebar from "../components/Sidebar.vue";

export default {
  components: {
    Sidebar
  },
  data() {
    return {
      pageData: ""
    };
  },
  mounted() {
    this.getPageData();
  },
  methods: {
    getPageData() {
      this.axios
        .get(
          `${process.env.VUE_APP_BASE_URL}/user/event/page/` +
            this.$route.params.id,
          {
            pageData: this.html
          }
        )
        .then(res => {
          this.pageData = res.data.data.html;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped lang="scss">
@import "../assets/scss/variables.scss";
</style>
