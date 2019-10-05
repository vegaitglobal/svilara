<template>
    <div class="daily-event w-30">
        <div class="daily-event--date">
          <p>sep<span>13</span></p>
        </div>
        <img class="daily-event--img" src="../assets/img/example.png" alt="event-image">
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
export default {
  name: 'DailyEvent',
  props: {
    msg: String
  }
}
</script>

<style scoped lang="scss">
@import "../assets/scss/variables.scss";
    .daily-event {
        position: relative;
        &--img {
          min-height: 170px;
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