<template>
  <div>
    <FullCalendar
      defaultView="dayGridMonth"
      :plugins="calendarPlugins"
      :events="events"
      @eventClick="eventClicked"
    />
  </div>
</template>
    
<script>
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
export default {
  name: "Calendar",
  components: {
    FullCalendar
  },
  data() {
    return {
      calendarPlugins: [dayGridPlugin],
      events: [
        { title: "event 1", date: "2019-10-01" },
        { title: "event 2", date: "2019-10-03" }
      ]
    };
  },
  methods: {
    eventClicked(info) {
      console.log(info);
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@fullcalendar/core/main.css";
@import "~@fullcalendar/daygrid/main.css";
</style>