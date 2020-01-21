<template>
  <div>
    <wysiwyg v-model="content" />
    <button
      type="submit"
      class="btn btn__blue btn__large editr-btn"
      @click="createPage"
    >
      Sačuvaj
    </button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      html: "",
      content:''
    };
  },
  mounted() {
    this.getPage();
    let titleUrlInput = document.querySelectorAll(".editr--toolbar .dashboard label input");
    titleUrlInput[1].onclick = function() {
      titleUrlInput[1].focus();
    }
    titleUrlInput[0].onclick = function() {
      titleUrlInput[0].focus();
    }
  },
  methods: {
    getPage() {
      this.axios
        .get(
          `${process.env.VUE_APP_BASE_URL}/admin/event/page/` +
            this.$route.params.id,
          {
            pageData: this.content //this.html
          }
        )
        .then(res => {
          this.content = res.data.data.html;
          //this.html = res.data.data.html;
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
            pageData: this.content //this.html
          }
        )
        .then(res => {
          this.$swal.fire({
            title: "Stranica je kreirana",
            type: "success"
          });
        })
        .catch(err => {
          this.$swal.fire({
            title: "Greška!",
            type: "error",
            text:
              err && err.response
                ? err.response.data.error
                : "Došlo je do greške!"
          });
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
