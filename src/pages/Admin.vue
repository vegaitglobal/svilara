<template>
  <div>
    <Sidebar />
    <Calendar />
  </div>
</template>

<script>
import Sidebar from "../components/Sidebar.vue";
import Calendar from "../components/Calendar.vue";

export default {
  components: {
    Sidebar,
    Calendar
  }
};
</script>
