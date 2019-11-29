<template>
  <div>
    <h3 v-if="!pageData">Stranica je u izradi...</h3>
    <span v-else v-html="pageData"></span>
  </div>
</template>

<script>
import axios from "axios";

export default {
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
          console.error(err);
        });
    }
  }
};
</script>
