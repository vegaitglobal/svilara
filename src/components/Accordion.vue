<template>
  <bulma-accordion>
    <bulma-accordion-item v-for="(event, index) in this.events" :key="event.id">
      <div class="acc-header" slot="title">
        <div>
          <span>{{ index + 1 }}</span
          >.
          <span>{{ event.contactEmail }}</span>
          <span>, {{ getEventData(event).name }}</span>
          <span>, {{ getEventData(event).date }}</span>
          <span>, {{ getEventData(event).time }}</span>
        </div>

        <span v-if="event.status == 'accepted'" data-tooltip="Prihvaćen">
          <check class="ico accepted" title />
        </span>

        <span v-if="event.status == 'pending'" data-tooltip="Na čekanju">
          <timer-sand-empty class="ico pending" title />
        </span>

        <span v-if="event.status == 'declined'" data-tooltip="Odbijen">
          <close class="ico declined" title />
        </span>
      </div>
      <div class="acc-body" slot="content">
        <div
          class="replies"
          v-for="(row, index) in sortArray(event.formAnswers)"
          :key="index"
        >
          {{ index + 1 }}. {{ row.question.text }}:
          <span v-if="row.type != 'file'" class="replies__answer">{{
            row.answers
          }}</span>

          <div v-if="row.type == 'file'" class="link-container">
            <a target="_blank" :href="`${link}/${row.answers}`"
              >Kliknite da vidite sliku</a
            >
          </div>
        </div>
        <div class="button-wrapper">
          <button
            :disabled="!formValid"
            type="button"
            class="btn btn__green"
            @click.prevent="() => acceptEvent(event.id, event.contactEmail)"
          >
            Prihvati
          </button>
          <button
            type="button"
            class="btn btn__red"
            @click.prevent="() => rejectEvent(event.id)"
          >
            Odbij
          </button>
        </div>
      </div>
    </bulma-accordion-item>
  </bulma-accordion>
</template>

<script>
import Check from "vue-material-design-icons/Check.vue";
import TimerSandEmpty from "vue-material-design-icons/TimerSandEmpty.vue";
import Close from "vue-material-design-icons/Close.vue";

export default {
  name: "Accordion",
  data() {
    return {
      pictureLink: "",
      logoLink: "",
      link: process.env.VUE_APP_MEDIA_BASE_URL
    };
  },
  components: {
    Check,
    TimerSandEmpty,
    Close
  },
  props: {
    events: {
      type: Array
    },
    formValid: {
      type: Boolean
    }
  },
  methods: {
    async acceptEvent(id, mail) {
      let admin = JSON.parse(localStorage.getItem("user"));
      try {
        let response = await this.$store.dispatch("acceptEvent", {id:id, mail:mail, emailFrom: admin.emailFrom, nameFrom: admin.nameFrom});
        this.$swal({
          type: "success",
          title: "Prihvaćeno",
          text: response.data.msg
        });
      } catch (err) {
        this.$swal({
          type: "error",
          title: "Oops...",
          text: err && err.response ? err.response.data.error : 'Došlo je do greške!'
        });
        this.error = err.response.data;
      }
    },
    async rejectEvent(id) {
      try {
        let response = await this.$store.dispatch("rejectEvent", id);
        this.$swal({
          type: "success",
          title: "Odbijeno",
          text: response.data.msg
        });
      } catch (err) {
        this.$swal({
          type: "error",
          title: "Oops...",
          text: err && err.response ? err.response.data.error : 'Došlo je do greške!'
        });
        this.error = err.response.data;
      }
    },
    sortArray(stringArray) {
      let array = JSON.parse(stringArray);
      if (array && array.length > 0) {
        array.sort(function(a, b) {
          return a.question.id - b.question.id;
        });
      }
      return array;
    },
    getEventData(event) {
      let array = JSON.parse(event.formAnswers);
      let name = "";
      let date = "";
      let time = "";
      if (array) {
        for (let i = 0; i < array.length; i++) {
          if (array[i].name == "title") name = array[i].answers;
          if (array[i].name == "question12") date = array[i].answers;
          if (array[i].name == "question13") time = array[i].answers;
        }
      }

      return { name, date, time };
    }
  },
  mounted() {
    if (this.event && this.event.picture) {
      this.pictureLink =
        process.env.VUE_APP_MEDIA_BASE_URL + "/" + this.event.picture;
    }
    if (this.event && this.event.logo) {
      this.logoLink =
        process.env.VUE_APP_MEDIA_BASE_URL + "/" + this.event.logo;
    }
  }
};
</script>

<style lang="scss">
@import "../assets/scss/variables.scss";

.card-header {
  position: relative;
  .card-header-icon {
    display: none;
  }
}
.acc-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid $blue;
  margin-bottom: 4px;
  border-radius: 10px;
  background-color: $blue;
  color: $white;
  cursor: pointer;
}
.acc-body {
  padding: 20px;
  overflow: hidden;
}
.replies {
  margin-bottom: 5px;
  line-height: 20px;
  &__answer {
    font-weight: 900;
  }
  .link-container {
    margin: 5px 0 8px;
    a {
      font-size: 16px;
    }
  }
}
.accordion {
  .ico {
    border-radius: 30px;
    text-align: center;
    color: $white;
    position: relative;
    font-size: 21px;
    svg {
      bottom: -0.025em;
    }
    &.accepted {
      background: $green;
    }
    &.pending {
      background: $yellow;
    }
    &.declined {
      background: $red;
    }
  }
  .button-wrapper {
    .btn {
      margin-right: 10px;
      min-width: 100px;
    }
  }
}
.explanation-modal {
  overflow-y: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  h1,
  p {
    margin-bottom: 30px;
  }
}
</style>
