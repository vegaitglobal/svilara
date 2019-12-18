<template>
    <div class="event-headline--wrapper">
        <h2 v-if="!isSearching && isSelectedMonthPassed" class="w-100">Protekli događaji</h2>
        <h2 v-if="!isSearching && !isSelectedMonthPassed" class="w-100">Događaji u najavi</h2>
        <!--<h2 v-if="!isSearching" class="w-100">Događaji u najavi</h2>-->
        <h2 v-if="isSearching" class="w-100">Rezultat pretrage</h2>
    </div>
</template>

<script>
import moment from "moment";
export default {
  name: 'EventHeadline',
  props: {
    msg: String
  },

  computed:{
    isSearching(){
      return this.$store.getters.getSearching;
    },
    isSelectedMonthPassed(){
      return this.$store.getters.getIsSelectedMonthPassed;
    }
  } 
}
</script>

<style scoped lang="scss">
@import "../assets/scss/variables.scss";

.event-headline--wrapper {
  h2 {
    margin-bottom: 30px;
  }
}
</style>