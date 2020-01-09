<template>
  <div>
    <v-client-table :data="tableData" :columns="columns" :options="options">
      <button
        class="btn btn__purple"
        slot="editor"
        slot-scope="props"
        @click="$router.push('/admin/editor/' + props.row.id)"
        v-if="props.row.status === 'prihvaćen'"
      >
        Editor
      </button>
    </v-client-table>
    <p>* U tabeli su prikazani svi događaji koji su na čekanju, prihvaćeni događaji koji jos nisu prošli i odbijeni događaji čiji su zahtevi stigli pre manje od mesec dana.</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      columns: [
        "ordNumber",
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
          ordNumber: "Redni broj",
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
    this.$store.dispatch("fetchAdminEventsTable").then(data => {
      if (data.data && data.data.data) {
        let events = [...data.data.data];
        for (let i = 0; i < events.length; i++) {
          if (events[i].status == "accepted") {
            let dateStart = new Date(events[i].startTime);
            let dateEnd = new Date(events[i].endTime);
            events[i].startTime = dateStart.toLocaleString("sr-ME");
            events[i].endTime = dateEnd.toLocaleString("sr-ME");
          }

          if (events[i].status !== "accepted") {
            let answers = JSON.parse(events[i].formAnswers);

            if (answers) {
              for (let y = 0; y < answers.length; y++) {
                if (answers[y].name === "email") {
                  events[i].email = answers[y].answers;
                }
                if (answers[y].name === "title") {
                  events[i].title = answers[y].answers;
                }
                if (answers[y].name === "category") {
                  let answer = answers[y].answers;
                  let arrayAnswers = answer.split("/");
                  events[i].category = arrayAnswers[0];
                }
                if (answers[y].name === "type") {
                  let answer = answers[y].answers;
                  let arrayAnswers = answer.split("/");
                  events[i].type = arrayAnswers[0];
                }
                if (answers[y].name === "space") {
                  let answer = answers[y].answers;
                  let answerSerbian = [];
                  for (let j = 0; j < answer.length; j++) {
                    let arrayAnswer = answer[j].split("/");
                    answerSerbian.push(arrayAnswer[0]);
                  }
                  events[i].space = answerSerbian;
                }
              }
            }
          }
          let status = events[i].status;
          if (status == "accepted") {
            events[i].status = "prihvaćen";
          } else if (status == "rejected") {
            events[i].status = "odbijen";
          } else if (status == "pending") {
            events[i].status = "na čekanju";
          }
          let type = events[i].type;
          if (type == "otvorenbp") {
            events[i].type = "otvoren bez prijave";
          }
          if (type == "otvorensp") {
            events[i].type = "otvoren sa prijavom";
          }
          let space = events[i].space;
          if (space == "malasala") {
            events[i].space = "Mala sala";
          } else if (space == "velikasala") {
            events[i].space = "Velika sala";
          } else if (space == "drucentar") {
            events[i].space = "Društveni centar";
          } else if (space == "dvoriste") {
            events[i].space = "Dvorište";
          }
           else if (space == "teren") {
            events[i].space = "Sportski tereni sa tribinama";
          }
          let category = events[i].category;
          if (category == "muzickiprogram"){
            events[i].category = "Muzički program";
          } else if (category == "izlozba"){
            events[i].category = "Izložba";
          } else if (category == "audiovideo"){
            events[i].category = "Audio-vizuelni program";
          }
  
          // if (events[i].category) events[i].category = events[i].category.charAt(0).toUpperCase() + events[i].category.substring(1);
          // if (events[i].type) events[i].type = events[i].type.charAt(0).toUpperCase() + events[i].type.substring(1);
          // if (events[i].space) console.log( events[i].space);
          // //if (events[i].space) events[i].space = events[i].space.charAt(0).toUpperCase() + events[i].space.substring(1);
          // if (events[i].status) events[i].status = events[i].status.charAt(0).toUpperCase() + events[i].status.substring(1);
        }
        this.tableData = events;
        let number = 0;
        for (let z = 0; z < this.tableData.length; z++){
            number++;
            this.tableData[z].ordNumber = number + '.';
           
        }
      }
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
  width: calc(100% - 1px);
  overflow: visible !important;
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
        background-color: $main;
        border-color: $main;
        &:hover {
          background-color: $main;
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
