<template>
  <div>
    <Sidebar />
    <v-client-table :data="tableData" :columns="columns"></v-client-table>
  </div>
</template>

<script>
import Sidebar from "../components/Sidebar.vue";

export default {
  components: {
    Sidebar
  },
  data() {
    return {
      columns: ["id", "name", "age"],
      tableData: [
        { id: 1, name: "John", age: "20" },
        { id: 2, name: "Jane", age: "24" },
        { id: 3, name: "Susan", age: "16" },
        { id: 4, name: "Chris", age: "55" },
        { id: 5, name: "Dan", age: "40" }
      ]
    };
  }
};
</script>

<style lang="scss">
</style>