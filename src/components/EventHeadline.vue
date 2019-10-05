<template>
    <div>
        <h2 class="w-100">Događaji u najavi</h2>
    </div>
</template>
    
<script>
export default {
  name: 'EventHeadline',
  props: {
    msg: String
  }
}
</script>

<style scoped lang="scss">
@import "../assets/scss/variables.scss";
    h2 {
        margin-bottom: 10px;
    }
</style>