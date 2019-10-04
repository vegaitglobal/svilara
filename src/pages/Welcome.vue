<template>
  <div>
    <HelloWorld msg="Test Message"></HelloWorld>
    <Sidebar/>
  </div>
</template>

<script>
import { HelloWorld } from "@/components";
import { Sidebar } from "@/components";

export default {
  components: {
    HelloWorld,
    Sidebar
  }
};

</script>
