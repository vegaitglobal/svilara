<template>
  <div class="search-field">
    <magnify-icon class="search-field--ico"/>
    <input v-on:keyup="search" class="search-field--input" v-model="query" type="text" placeholder="Pretraži..." />
  </div>
</template>

<script>
import MagnifyIcon from 'vue-material-design-icons/Magnify.vue';

export default {
    name: "SearchField",
    components: {
        MagnifyIcon
    },
    data(){
        return {
            query: ''
        }
    },
    methods:{
        search(){
            console.log(this.query)
            this.$store.dispatch('searchEvent', this.query)
        }
    },
}
</script>

<style lang="scss">
@import "../assets/scss/variables.scss";

.search-field {
    margin-right: 30px;
    display: flex;
    align-items: flex-start;
    @include breakpoint(desk-xl) {
        margin: 0 0 12px 0;
    }
    .search-field--ico {
        font-size: 20px;
        margin-bottom: 6px;
        svg {
            fill: $purple;
        }
    }
    &--input {
        font-size: 16px;
        line-height: 20px;
        background-color: transparent;
        border: 0;
        color: rgba($purple, 0.5);
        padding: 5px;
        &::placeholder {
            font-size: 16px;
            line-height: 20px;
            color: rgba($purple, 0.5);
        }
        @include breakpoint(desk-xl) {
            width: 142px;
        }
    }
}

</style>
