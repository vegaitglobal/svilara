<template>
  <div class="accordion" v-if="event">
    <badger-accordion>
      <badger-accordion-item>
        <div slot="header">
          <div>
            <span>{{ index + 1 }}</span>. 
            <span>{{ event.contactEmail }}</span
            >{{event.startTime? ',' : ''}}
            <span>{{ event.startTime }}</span>
          </div>
          <span v-if="event.status == 'accepted'" data-tooltip="Prihvaćen">
            <check class="ico accepted" title="" />
          </span>

          <span v-if="event.status == 'pending'" data-tooltip="Na čekanju">
            <timer-sand-empty class="ico pending" title="" />
          </span>

          <span v-if="event.status == 'declined'" data-tooltip="Odbijen">
            <close class="ico declined" title="" />
          </span>
        </div>
        <div slot="content">
          <div
            class="replies"
            v-for="(row, index) in JSON.parse(event.formAnswers)"
            :key="index"
          >
            {{ row.question.id }}. {{ row.question.text }}:
            <span class="replies__answer">{{ row.answers }}</span>
          </div>
          <div class="button-wrapper">
            <button
              type="button"
              class="btn btn__green"
              @click.prevent="acceptEvent"
            >
              Prihvati
            </button>
            <button
              type="button"
              class="btn btn__red"
              @click.prevent="rejectEvent"
            >
              Odbij
            </button>
          </div>
        </div>
      </badger-accordion-item>
    </badger-accordion>
  </div>
</template>

<script>
import { BadgerAccordion, BadgerAccordionItem } from "vue-badger-accordion";
import Check from "vue-material-design-icons/Check.vue";
import TimerSandEmpty from "vue-material-design-icons/TimerSandEmpty.vue";
import Close from "vue-material-design-icons/Close.vue";

export default {
  name: "Accordion",
  props: ["event", "index"],
  components: {
    BadgerAccordion,
    BadgerAccordionItem,
    Check,
    TimerSandEmpty,
    Close
  },
   methods: {
    async acceptEvent() {
      try {
        let vm = this;
        let response = await this.$store.dispatch("acceptEvent", this.event.id);
        //console.log(JSON.stringify(response.data.msg))
        this.$swal({
            type: "success",
            title: "Prihvaćeno",
            text: response.data.msg
          });
      } catch (err) {
      //console.log(JSON.stringify(err))
      this.$swal({
            type: "error",
            title: "Oops...",
            text: err.response.data.error
          });
        this.error = err.response.data;
      }
    },
    async rejectEvent() {
      try {
        let vm = this;
        let response = await this.$store.dispatch("rejectEvent", this.event.id);
        console.log(JSON.stringify(response))
        this.$swal({
            type: "success",
            title: "Odbijeno",
            text: response.data.msg
          });
      } catch (err) {
      console.log(JSON.stringify(err))
       this.$swal({
            type: "error",
            title: "Oops...",
            text: err.response.data.error
          });
        this.error = err.response.data;
      }
      
    }
   }
};
</script>

<style lang="scss">
@import "../assets/scss/variables.scss";

.replies {
  margin-bottom: 5px;
  line-height: 20px;
  &__answer {
    font-weight: 900;
  }
}
.badger-accordion__header {
  padding: 10px;
  border: 1px solid $purple;
  margin-bottom: 4px;
  border-radius: 10px;
  background-color: $purple;
  color: $white;

  .js-badger-accordion-header {
    .badger-accordion-toggle {
      flex: 1;

      > div {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }

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
}
.badger-accordion__panel {
  padding: 0 20px;
  overflow: hidden;
  .js-badger-accordion-panel-inner > div {
    padding: 20px 0;
  }
  .button-wrapper {
    display: flex;
    margin-top: 30px;
    flex-wrap: wrap;
    .btn {
      min-width: 100px;
    }
    .btn:first-of-type {
      margin-right: 10px;
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
