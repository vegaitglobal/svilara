<template>
  <div>
    <Sidebar />
    <v-client-table :data="tableData" :columns="columns" :options="options">
      <button
        class="btn btn__purple"
        slot="editor"
        slot-scope="props"
        @click="$router.push('/admin/editor/' + props.row.id)"
      >
        Editor
      </button>
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
  },
  mounted() {
    //this.tableData = this.events;
    this.$store.dispatch("fetchAdminEvents").then(data => {
      let events = [...data.data.data];
      for (let i = 0; i < events.length; i++) {
        let dateStart = new Date(events[i].startTime);
        let dateEnd = new Date(events[i].endTime);
        events[i].startTime = dateStart.toLocaleString("sr-ME");
        events[i].endTime = dateEnd.toLocaleString("sr-ME");

        let status = events[i].status;
        if (status == "accepted") {
          events[i].status = "prihvaćen";
        } else if (status == "rejected") {
          events[i].status = "odbijen";
        } else if (status == "pending") {
          events[i].status = "na čekanju";
        }
        let type = events[i].type;
        if (type == "otvorenbp"){
          events[i].type = 'otvoren bez plaćanja';
        }
        if (type == "otvorensp"){
          events[i].type = 'otvoren sa plaćanjem';
        }
      }
      this.tableData = events;
    });
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
    border: 1px solid $gray;
    padding: 10px;
    width: 300px;
  }
}
.VueTables__limit-field {
  select {
    padding: 5px;
  }
}
.table-responsive {
  overflow: auto;
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
select.form-control {
  margin-left: 12px;
}
.VueTables__limit-field {
  margin-bottom: 15px;
}
.VuePagination__pagination {
  display: flex;
  justify-content: center;
  margin: 30px 0 10px;
  li {
    a {
      text-decoration: none;
      color: $gray-dark;
      font-size: 15px;
      font-weight: 600;
      padding: 6px 12px;
      border: 1px solid $purple-light;
      margin-left: -1px;
      &.active {
        color: $white;
        background-color: $purple;
        border-color: $purple;
        &:hover {
          background-color: $purple;
        }
      }
      &[disabled] {
        color: $gray;
        cursor: not-allowed;
        &:hover {
          background-color: $white;
        }
      }
      &:hover {
        background-color: $gray-light;
      }
    }
  }
}
</style>
