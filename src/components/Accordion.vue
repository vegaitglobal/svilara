<template>
  <div class="accordion" v-if="event">
    <badger-accordion>
      <badger-accordion-item>
        <div slot="header">
          <div>
            <span>{{event.id}}</span>,
            <span>{{event.contactEmail}}</span>,
            <span>{{event.startTime}}</span>
          </div>
          <span v-if="event.status == 'accepted'" data-tooltip="Prihvaćen">
            <check class="ico accepted" />
          </span>

          <span v-if="event.status == 'pending'" data-tooltip="Na čekanju">
            <timer-sand-empty class="ico pending" />
          </span>

          <span v-if="event.status == 'declined'" data-tooltip="Odbijen">
            <close class="ico declined" />
          </span>
        </div>
        <div slot="content">
          <div class="replies" v-for="(row, index) in JSON.parse(event.formAnswers)" :key="index">
            {{row.question.id}}. {{row.question.text}}:
            <span class="replies__answer">{{row.answers}}</span>
          </div>
          <div class="button-wrapper">
            <button type="button" @click="showExplanationModal" class="btn btn__green">Prihvati</button>
            <button type="button" @click="showExplanationModal" class="btn btn__red">Odbij</button>
          </div>
        </div>
      </badger-accordion-item>
    </badger-accordion>

    <modal name="explanationModal" height="550" width="830" overlayTransition="overlay-fade">
      <div class="explanation-modal text-center">
        <h1>Objašnjenje</h1>
        <p>Objašnjenje zašto je (nije) prihvaćen događaj.</p>
        <button type="submit" class="btn btn__purple btn__large">Sačuvaj</button>
      </div>
    </modal>
  </div>
</template>
    
<script>
import { BadgerAccordion, BadgerAccordionItem } from "vue-badger-accordion";
import Check from "vue-material-design-icons/Check.vue";
import TimerSandEmpty from "vue-material-design-icons/TimerSandEmpty.vue";
import Close from "vue-material-design-icons/Close.vue";

export default {
  name: "Accordion",
  props: ["event"],
  components: {
    BadgerAccordion,
    BadgerAccordionItem,
    Check,
    TimerSandEmpty,
    Close
  },
  methods: {
    showExplanationModal() {
      console.log("aaaaaaaaaaaaaaaaaaa");
      this.$modal.show("explanationModal");
    }
  }
};
</script>

<style lang="scss">
@import "../assets/scss/variables.scss";

.replies {
  margin-bottom: 5px;
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
  overflow: auto;
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