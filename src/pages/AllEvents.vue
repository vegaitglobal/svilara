<template>
  <div>
    <Sidebar />
    <v-client-table :data="tableData" :columns="columns" :options="options">
      <button
        class="btn btn__purple"
        slot="editor"
        slot-scope="props"
        @click="$router.push('/admin/editor/' + props.row.id)"
      >Editor</button>
    </v-client-table>
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
      columns: [
        "id",
        "title",
        "contactEmail",
        "category",
        "type",
        "space",
        "status",
        "startTime",
        "endTime",
        "editor"
      ],
      options: {
        headings: {
          id: "ID",
          title: "Naslov",
          contactEmail: "Kontakt",
          category: "Kategorija",
          type: "Tip",
          space: "Prostor",
          status: "Status",
          startTime: "Pocetak",
          endTime: "Kraj",
          editor: "Editor"
        }
      },
      tableData: []
    };
  },

  created() {
    this.tableData = this.events;
  },

  computed: {
    events() {
      return this.$store.getters.getAdminEvents;
    }
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