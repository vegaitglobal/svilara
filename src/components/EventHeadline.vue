<template>
    <div>
        <h2 v-if="!isSearching" class="w-100">Događaji u najavi</h2>
        <h2 v-else class="w-100">Rezultat pretrage</h2>
    </div>
</template>
    
<script>
export default {
  name: 'EventHeadline',
  props: {
    msg: String
  },

  computed:{
    isSearching(){
      return this.$store.getters.getSearching;
    }
  }
}
</script>

<style scoped lang="scss">
@import "../assets/scss/variables.scss";
    h2 {
        margin-bottom: 10px;
    }
</style>