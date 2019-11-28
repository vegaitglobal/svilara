<template>
  <div class="main-event" v-if="event">
    <h2>Sledeći događaj</h2>
    <div class="main-event__box">
      <div class="main-event__box--date">
        <p>
          {{ startingDateMonth }}
          <span>{{ startingDay }}</span>
        </p>
      </div>
      <div
        class="main-event__box--image w-50"
        :style="{ background: `url(${baseMediaUrl}/${this.event.picture})` }"
      ></div>
      <div class="main-event__box--text w-50">
        <p>{{ space }} | {{ startingTime }}-{{ endingTime }}h</p>
        <h3>{{ event.title }}</h3>
        <p>{{ event.description }}</p>
        <router-link
          :to="'/event/' + this.event.id"
          type="button"
          tag="button"
          class="btn btn__orange"
          >Pogledaj opis</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import MainImg from "../assets/img/example.png";
import moment from "moment";

export default {
  name: "MainEvent",
  props: ["event"],
  data: function() {
    return {
      MainImg: MainImg,
      baseMediaUrl: process.env.VUE_APP_MEDIA_BASE_URL
      //space: ""
    };
  },
  computed: {
    startingDay() {
      return moment(this.event.startTime).date();
    },
    startingDateMonth() {
      let month = new Array();
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

      return month[new Date(this.event.startTime).getMonth()];
    },

    startingTime() {
      var start = new Date(this.event.startTime).getTime();
      return moment(start).format("HH:mm");
    },

    endingTime() {
      var start = new Date(this.event.endTime).getTime();
      return moment(start).format("HH:mm");
    },
    space() {
      if (this.event) {
        let space = this.event.space;
        if (space == "velikasala") {
          return "Velika sala";
        } else if (space == "malasala") {
          return "Mala sala";
        } else if (space == "drucentar") {
          return "Društveni centar";
        } else if (space == "dvoriste") {
          return "Dvorište";
        } else if (space == "teren") {
          return "Sportski tereni sa tribinama";
        } else if (space == "plato") {
          return "Plato";
        } else {
          return space;
        }
        
      } return "";
    }
  }
};
</script>

<style scoped lang="scss">
@import "../assets/scss/variables.scss";

.main-event {
  margin-bottom: 48px;
  @include breakpoint(htab) {
    margin-bottom: 80px;
  }
  h2 {
    width: 100%;
    font-weight: bold;
    margin-bottom: 30px;
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
    &--image {
      height: auto;
      background-size: cover !important;
      background-position: center !important;
      background-repeat: no-repeat !important;
      @include breakpoint(htab) {
        height: 170px;
        width: 100%;
      }
    }
    img {
      max-width: 630px;
    }
    &--text {
      padding-left: 33px;
      @include breakpoint(htab) {
        padding-left: 0;
      }
      h3 {
        margin: 15px 0;
      }
      p {
        color: $gray;
        @include breakpoint(htab) {
          margin-top: 16px;
        }
      }
      button {
        margin-top: 30px;
      }
    }
    @include breakpoint(htab) {
      display: initial;
      .w-50 {
        width: 100%;
      }
      .w-50 {
        width: 100%;
      }
    }
  }
}
</style>
