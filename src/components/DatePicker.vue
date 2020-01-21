<template>
  <div class="date-picker" :style="{ color: monthColor }">
    <chevron-left-icon
      @click="decMonth"
      class="date-picker--ico"
      title=""
    />
    <span class="date-picker--val" :style="{ color: monthColor }" >{{ selectedMonth }}</span>
    <chevron-right-icon @click="incMonth" class="date-picker--ico" title="" />
  </div>
</template>

<script>
import ChevronRightIcon from "vue-material-design-icons/ChevronRight.vue";
import ChevronLeftIcon from "vue-material-design-icons/ChevronLeft.vue";

export default {
  name: "DatePicker",
  components: {
    ChevronRightIcon,
    ChevronLeftIcon
  },

  methods: {
    incMonth() {
      this.$store.dispatch("increaseMonth");
    },

    decMonth() {
      this.$store.dispatch("decreaseMonth");
    }
  },

  computed: {
    selectedMonth() {
      return this.$store.getters.getSelectedMonth;
    },
    settings: {
      get: function() {
        return this.$store.getters.getSettings();
      }
    },
    monthColor() {
      if (this.settings.length && this.settings[20].value) {
        return this.settings[20].value;
      }
      return "";
    }
  }
};
</script>

<style lang="scss">
@import "../assets/scss/variables.scss";

.date-picker {
  color: $gray-dark;
  &--val {
    font-size: 25px;
    vertical-align: 10%;
    font-weight: 600;
    min-width: 185px;
    display: inline-block;
    text-align: center;
  }
  &--ico.material-design-icon {
    cursor: pointer;
    font-size: 30px;
    height: 24px;
    width: 30px;
  }
}
</style>
