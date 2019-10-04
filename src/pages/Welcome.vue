<template>
  <div>
    <HelloWorld msg="Test Message"></HelloWorld>
    <Sidebar/>
  </div>
</template>

<script>
import { Sidebar } from "@/components";


export default {
  components: {

    Sidebar
  }
};

</script>

<style scoped lang="scss">
@import "../assets/scss/variables.scss";

div {
	width: 100%;
	max-width: 250px;
	background-color: $red;
	display: inline-block;
	margin: 0 15px 15px 0;
	border: 1px solid #D1D2D4;
	vertical-align: top;
}
</style>
