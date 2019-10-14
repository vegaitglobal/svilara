<template>
  <div class="wrapper">
    <Sidebar />
    <NewEventForm />
  </div>
</template>

<script>
import Sidebar from "../components/Sidebar.vue";
import NewEventForm from "../components/NewEventForm.vue";

export default {
  components: {
    Sidebar,
    NewEventForm
  }
};
</script>
