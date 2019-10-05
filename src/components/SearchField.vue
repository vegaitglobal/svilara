<template>
  <div class="search-field">
    <magnify-icon class="search-field--ico"/>
    <input class="search-field--input" type="text" placeholder="Pretraži..." />
  </div>
</template>

<script>
import MagnifyIcon from 'vue-material-design-icons/Magnify.vue';

export default {
    name: "SearchField",
    components: {
        MagnifyIcon
    }
}
</script>

<style lang="scss">
@import "../assets/scss/variables.scss";

.search-field {
    margin-right: 30px;
    .search-field--ico {
        font-size: 20px;
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
    }
}

</style>
