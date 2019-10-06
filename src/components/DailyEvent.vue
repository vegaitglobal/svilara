<template>
    <div class="daily-event w-22">
        <div class="daily-event--date">
          <p>{{startingDateMonth}}<span>{{startingDay}}</span></p>
        </div>
        <div class="daily-event--image" :style="{background: `url(${baseMediaUrl}/${this.event.picture})` }"></div>
        <p class="daily-event--time">Drustveni centar | {{startingTime}}-{{endingTime}}h</p>
        <h3>{{event.title}}</h3>
        <div class="daily-event__bottom">
          <div class="daily-event__bottom--icons">
            <span data-tooltip="Ulaz besplatan, bez prijave">
              <currency-usd-off class="daily-event__bottom--icons-ico"/>
            </span>
            <span data-tooltip="Ulaz besplatan, sa prijavom">
              <currency-usd class="daily-event__bottom--icons-ico"/>
            </span>
            <span data-tooltip="Ulaz besplatan, sa prijavom">
              <currency-usd-off class="daily-event__bottom--icons-ico"/>
            </span>
            <span data-tooltip="Tribina">
              <alpha-t class="daily-event__bottom--icons-ico"/>
            </span>
            <span data-tooltip="Radionica">
              <alpha-r class="daily-event__bottom--icons-ico"/>
            </span>
            <span data-tooltip="Predavanje">
              <alpha-p class="daily-event__bottom--icons-ico"/> 
            </span>
            <span data-tooltip="Umetnički program">
              <artist class="daily-event__bottom--icons-ico"/>
            </span>
            <span data-tooltip="Dečji program">
              <human-child class="daily-event__bottom--icons-ico"/>
            </span>
          </div>
          <button type="button" class="btn btn__orange">Pogledaj opis</button>
        </div>
    </div>
</template>
<script>

import DailyImg from "../assets/img/example.png"
import CurrencyUsdOff from 'vue-material-design-icons/CurrencyUsdOff.vue';
import CurrencyUsd from 'vue-material-design-icons/CurrencyUsd.vue';
import Artist from 'vue-material-design-icons/Artist.vue';
import HumanChild from 'vue-material-design-icons/HumanChild.vue';
import AlphaR from 'vue-material-design-icons/AlphaR.vue';
import AlphaP from 'vue-material-design-icons/AlphaP.vue';
import AlphaT from 'vue-material-design-icons/AlphaT.vue';
import moment from 'moment'

export default {
  name: 'DailyEvent',
  components: {
    CurrencyUsdOff,
    CurrencyUsd,
    Artist,
    HumanChild,
    AlphaR,
    AlphaP,
    AlphaT,
  },
  props: ['event'],
    data: function() {
    return {
      DailyImg: DailyImg,
      baseMediaUrl: process.env.VUE_APP_MEDIA_BASE_URL
    }
  },
  computed:{
        startingDay(){
            return new Date(this.event.startTime).getDay()
        },
        startingDateMonth(){
            let month = new Array()
            month[0] = "jan";
            month[1] = "feb";
            month[2] = "mar";
            month[3] = "apr";
            month[4] = "maj";
            month[5] = "jun";
            month[6] = "jul";
            month[7] = "aug";
            month[8] = "sep";
            month[9] = "oct";
            month[10] = "nov";
            month[11] = "dec";
            return month[new Date(this.event.startTime).getMonth() - 1]
        },

        startingTime(){
            var start = new Date(this.event.startTime).getTime()
            return moment.unix(start).format('hh:mm')
        },

        endingTime(){
            var start = new Date(this.event.endTime).getTime()
            return moment.unix(start).format('hh:mm')
        }
    }
}
</script>

<style lang="scss">
@import "../assets/scss/variables.scss";
    .w-22 {
      @include breakpoint(desk-xl) {
        width: 30% !important;
      }
      @include breakpoint(desk) {
        width: 44% !important;
      }
      @include breakpoint(vtab) {
        width: 100% !important;
      }
    }
    .daily-event {
        position: relative;
        margin-right: 2.3%;
        margin-bottom: 32px;
        @include breakpoint(vtab) {
          margin-right: 0;
        }
        &--image {
          width: 100%;
          height: 174px;
          background-size: cover !important;
          background-position: center !important;
        }
        &--time {
          color: $gray;
          margin: 16px 0;
        }
        h3 {
          margin-bottom: 13px;
        }
        button {
          margin-right: 0 auto;
        }
        &--date {
            text-transform: uppercase;
            background: $purple;
            height: 53px;
            width: 53px;
            position: absolute;
            top: 0;
            left: 0;
            p {
                padding-top: 9px;
                font-family: $font-primary;
                font-size: 16px;
                display: grid;
                text-align: center;
                font-weight: 600;
                color: $white;
                span {
                    font-size: 18px;
                    font-weight: 600;
                }
            }
        }
        &__bottom {
            display: flex;
            justify-content: space-between;
            &--icons {
              display: inline-flex;
              align-items: center;
            }
            &--icons-ico {
              margin-right: 5px;
              background: $orange;
              border-radius: 30px;
              text-align: center;
              color: $white;
              position: relative;
              font-size: 21px;
              svg {
                bottom: -0.025em;
              }
            }
        }
    }
    [data-tooltip] {
      position: relative;
      &::before {
        content: attr(data-tooltip);
        position: absolute;
        top: 100%;
        left: 50%;
        padding: 5px;
        transform: translateX(-50%) scale(0);
        transition: transform 0.3s ease-in-out;
        transform-origin: top;
        background: rgba($gray, 0.7);
        color: white;
        border-radius: 2px;
        font-size: 10px;
        z-index: 1;
        width: 100px;
        text-align: center;
      }
      &:hover::before {
        transform: translateX(-50%) scale(1); 
      }
    }
</style>