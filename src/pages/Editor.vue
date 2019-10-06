<template>
  <div>
    <Sidebar />
    <wysiwyg v-model="html" />
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

<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";

.editr {
  border: 1px solid #e4e4e4;
  width: 100%;
  min-height: 70vh;
}
</style>