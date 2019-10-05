<template>
    <div class="main-event">
        <h2>Sledeći događaj</h2>
        <div class="main-event__box">
            <div class="main-event__box--date">
                <p>sep<span>13</span></p>
            </div>
            <img class="w-60" src="../assets/img/example.png" alt="event-image">
            <div class="main-event__box--text w-40">
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
        margin-bottom: 48px;
        h2 {
            width: 100%;
            font-weight: bold;
            padding-bottom: 30px;
        }
        &__box {
            position: relative;
            display: flex;
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
                    padding-top: 9px;
                    font-family: $font-primary;
                    font-size: 16px;
                    display: grid;
                    text-align: center;
                    font-weight: 600;
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
                h3 {
                    margin: 15px 0;
                }
                p {
                    color: $gray;
                }
                @include breakpoint(htab) {
                    padding-left: 0;
                }
                button {
                    margin-top: 30px;
                }
            }
            @include breakpoint(htab) {
                display: initial;
                .w-40 {
                    width: 100%;
                }
                .w-60 {
                    width: 100%;
                }
            }
        }
    }
</style>