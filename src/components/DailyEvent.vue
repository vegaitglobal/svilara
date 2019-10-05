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
            <img src="../assets/img/family-icon.png" title="Porodicni dogadjaj" alt="Porodicni dogadjaj">
            <img src="../assets/img/dollar-icon.png" title="Besplatan ulaz" alt="Besplatan ulaz">
          </div>
          <button type="button" class="btn btn__orange">Pogledaj opis</button>
        </div>
    </div>
</template>
<script>

import DailyImg from "../assets/img/example.png"

export default {
  name: 'DailyEvent',
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
        width: 20% !important;
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
        margin-right: 30px;
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
              img {
                max-height: 17px;
                max-width: 17px;
                margin-right: 15px;
                opacity: .4;
              }
            }
        }
        
    }
</style>