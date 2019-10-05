<template>
  <div>
    <Sidebar/>
    <MainEvent :event="events[0]"/>
    <EventHeadline/>
    <div class="daily-event-wrap">
      <DailyEvent :key="event.id" v-for="(event, index) in events.slice(1)" :event="event"/>
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
    EventHeadline
  },

  created(){
    this.$store.dispatch('fetchEvents')
  },

  computed:{
    events(){
      return this.$store.getters.getSearchedEvents.sort(this.sortByDate)
    },
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
