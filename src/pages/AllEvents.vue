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
@import "../assets/scss/variables.scss";

.VueTables__search-field {
  margin-bottom: 45px;
  label {
    font-size: 18px;
    display: block;
    margin-bottom: 10px;
  }
  input {
    font-size: 16px;
    border: 0;
    border-bottom: 1px solid $gray;
    padding: 5px;
    width: 300px;
  }
}

.VueTables__table {
  td {
    padding: 15px;
    border: 1px solid $purple-light;
    text-align: center;
  }

  th {
    padding: 15px;
    span {
      font-size: 16px;
    }
  }
}

thead {
  font-weight: 700;
}

.VuePagination__count {
  text-align: left;
  margin: 40px 0;
  font-size: 16px;
  font-weight: 700;
}
</style>