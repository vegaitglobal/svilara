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
  methods: {
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

.editr {
  border: 1px solid #e4e4e4;
  width: 100%;
  min-height: 70vh;
}

.editr-btn {
  margin-top: 20px;
}
</style>