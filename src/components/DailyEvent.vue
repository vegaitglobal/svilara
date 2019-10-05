<template>
    <div class="daily-event w-22">
        <div class="daily-event--date">
          <p>sep<span>13</span></p>
        </div>
        <div class="daily-event--image" :style="{background: `url(${DailyImg})` }"></div>
        <p class="daily-event--time">Drustveni centar | 10:00-18:00h</p>
        <h3>Interaktivna edukativna radionica “Industrijska proslost Almasakog kraja</h3>
        <div class="daily-event__bottom">
          <div class="daily-event__bottom--icons">
            <currency-usd-off class="daily-event__bottom--icons-ico"/>
            <!-- <currency-usd class="daily-event__bottom--icons-ico"/> -->
            <!-- <account-child class="daily-event__bottom--icons-ico"/> -->
            <!-- <artist class="daily-event__bottom--icons-ico"/> -->
            <!-- <human-child class="daily-event__bottom--icons-ico"/> -->
            <!-- <alpha-r class="daily-event__bottom--icons-ico"/> -->
            <!-- <alpha-p class="daily-event__bottom--icons-ico"/> -->
            <alpha-t class="daily-event__bottom--icons-ico"/>
          </div>
          <button type="button" class="btn btn__orange">Pogledaj opis</button>
        </div>
    </div>
</template>
<script>

import DailyImg from "../assets/img/example.png"
import CurrencyUsdOff from 'vue-material-design-icons/CurrencyUsdOff.vue';
import CurrencyUsd from 'vue-material-design-icons/CurrencyUsd.vue';
import AccountChild from 'vue-material-design-icons/AccountChild.vue';
import Artist from 'vue-material-design-icons/Artist.vue';
import HumanChild from 'vue-material-design-icons/HumanChild.vue';
import AlphaR from 'vue-material-design-icons/AlphaR.vue';
import AlphaP from 'vue-material-design-icons/AlphaP.vue';
import AlphaT from 'vue-material-design-icons/AlphaT.vue';


export default {
  name: 'DailyEvent',
    components: {
      CurrencyUsdOff,
      CurrencyUsd,
      AccountChild,
      Artist,
      HumanChild,
      AlphaR,
      AlphaP,
      AlphaT,


  },
  props: {
    msg: String
  },
    data: function() {
    return {
      DailyImg: DailyImg
    }
  }
}
</script>

<style scoped lang="scss">
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
</style>