<template>
  <div>
    <wysiwyg v-model="html" />
    <button type="submit" class="btn btn__purple btn__large editr-btn" @click="createPage">Sačuvaj</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
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
          console.error(err);
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
          console.error(res);
        })
        .catch(err => {
          console.error(err);
        });

        this.$swal
        .fire({
          title: "Stranica je kreirana",
          type: "success"
        })
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