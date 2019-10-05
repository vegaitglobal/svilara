<template>
    <div class="main-event">
        <h2>Sledeći događaj</h2>
        <div class="main-event__box">
            <div class="main-event__box--date">
                <p>sep<span>13</span></p>
            </div>
            <img src="../assets/img/example.png" alt="">
            <div class="main-event__box--text">
                <p>Drustveni centar | 10:00-18:00h</p>
                <h3>Interaktivna edukativna radionica “Industrijska proslost Almasakog kraja</h3>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scramble</p>
                <button type="button" class="btn btn__orange">Pogledaj opis</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'MainEvent',
  props: {
    msg: String
  }
}
</script>

<style scoped lang="scss">
@import "../assets/scss/variables.scss";

    .main-event {
        h1 {
            width: 100%;
        }
        &__box {
            position: relative;
            display: flex;
            justify-content: flex-start;
            &--date {
                text-transform: uppercase;
                color: $white;
                background: $purple;
                height: 53px;
                width: 53px;
                position: absolute;
                top: 0;
                left: 0;
                p {
                    font-family: $font-primary;
                    font-size: 16px;
                    display: grid;
                    text-align: center;
                    span {
                        font-size: 18px;
                        font-weight: 600;
                    }
                }
            }
            img {
                max-width: 630px;
            }
            &--text {
                padding-left: 33px;
                p {
                    color: $gray;
                }
            }
        }
    }
</style>