<template>
  <div>
    <Sidebar />
    <wysiwyg v-model="html" />
    <button type="submit" class="btn btn__purple btn__large editr-btn" @click="createPage">Sačuvaj</button>
  </div>
</template>

<script>
import axios from "axios";
import Sidebar from "../components/Sidebar.vue";

export default {
  components: {
    Sidebar
  },
  data: function() {
    return {
      html: ""
    };
  },
  mounted() {
    this.getPage();
  },
  methods: {
    getPage() {
      this.axios
        .get(
          `${process.env.VUE_APP_BASE_URL}/admin/event/page/` +
            this.$route.params.id,
          {
            pageData: this.html
          }
        )
        .then(res => {
          this.html = res.data.data.html;
        })
        .catch(err => {
          console.log(err);
        });
    },
    createPage() {
      this.axios
        .put(
          `${process.env.VUE_APP_BASE_URL}/admin/event/page/` +
            this.$route.params.id,
          {
            pageData: this.html
          }
        )
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="scss">
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
@import "../assets/scss/variables.scss";

.editr {
  border: 1px solid $gray-light;
  width: 100%;
  min-height: 70vh;
}
.editr-btn {
  margin-top: 20px;
}
.editr--content {
  ul {
    list-style: disc;
  }
}
</style>