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
                        <check class="ico accepted"/>
                    </span>

                    <span v-if="event.status == 'pending'" data-tooltip="Na čekanju">
                        <timer-sand-empty class="ico pending"/>
                    </span>

                     <span v-if="event.status == 'declined'" data-tooltip="Odbijen">
                        <close class="ico declined"/>
                    </span>
                </div>    
                <div slot="content">
                    <div v-for="(row, index) in JSON.parse(event.formAnswers)" :key="index">
                        <u>{{row.question.id}}. {{row.question.text}}:</u> <b>{{row.answers}}</b>
                    </div>
                    
                </div>  
            </badger-accordion-item>
        
        </badger-accordion>
    </div>
</template>
    
<script>
import {BadgerAccordion, BadgerAccordionItem} from 'vue-badger-accordion'
import Check from 'vue-material-design-icons/Check.vue'
import TimerSandEmpty from 'vue-material-design-icons/TimerSandEmpty.vue'
import Close from 'vue-material-design-icons/Close.vue'

export default {
    name: "Accordion",
    props: ['event'],
    components: {
        BadgerAccordion,
        BadgerAccordionItem,
        Check,
        TimerSandEmpty,
        Close
    }
};
</script>

<style lang="scss">
@import "../assets/scss/variables.scss";

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

    .js-badger-accordion-panel-inner > div {
        padding: 20px 0;
    }
}

</style>