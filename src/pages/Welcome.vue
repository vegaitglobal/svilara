<template>
  <div>
    <Sidebar/>
    <MainEvent  v-if="!isSearching" :event="events[0]"/>
    <EventHeadline/>
    <div class="daily-event-wrap">
      <DailyEvent :key="event.id" v-for="(event, index) in events" :event="event"/>
      <h3 v-if="events.length == 0"> Nema rezultata</h3>
    </div>
  </div>
</template>

<script>

import Sidebar from '../components/Sidebar.vue'
import MainEvent from '../components/MainEvent.vue'
import DailyEvent from '../components/DailyEvent.vue'
import EventHeadline from '../components/EventHeadline.vue'

export default {
  components: {
    Sidebar,
    MainEvent,
    DailyEvent,
    EventHeadline,
  },

  async created(){
    await this.$store.dispatch('fetchEvents')
    this.$store.dispatch('filterByMonth')
    this.$store.dispatch("fetchSettings");
  },

  mounted(){
    this.$store.dispatch('filterByMonth')
  },

  computed:{
    events(){
      return this.$store.getters.getSearchedEvents.sort(this.sortByDate)
    },
    isSearching(){
      return this.$store.getters.getSearching;
    }
  },

  methods: {
    sortByDate (a, b) {
      return new Date(a.startTime).getTime() - new Date(b.startTime).getTime();
    },
  }
};

</script>

<style scoped lang="scss">
@import "../assets/scss/variables.scss";

.daily-event-wrap {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}

</style>
