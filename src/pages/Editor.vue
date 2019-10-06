<template>
  <div>
    <Sidebar />
    <wysiwyg v-model="html" />
    <button type="submit" class="btn btn__purple btn__large editr-btn">Sačuvaj</button>
  </div>
</template>

<script>
import Sidebar from "../components/Sidebar.vue";

export default {
  components: {
    Sidebar
  },
  data: function() {
    return {
      html: ""
    };
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