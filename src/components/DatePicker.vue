<template>
    <div class="date-picker">
        <chevron-left-icon class="date-picker--ico"/>
        <span class="date-picker--val">Septembar 2019</span>
        <chevron-right-icon class="date-picker--ico"/>
    </div>
</template>

<script>
import ChevronRightIcon from 'vue-material-design-icons/ChevronRight.vue'
import ChevronLeftIcon from 'vue-material-design-icons/ChevronLeft.vue';

export default {
    name: "DatePicker",
    components: {
        ChevronRightIcon,
        ChevronLeftIcon
    }
}
</script>

<style lang="scss">
@import "../assets/scss/variables.scss";

.date-picker {
    color: $purple;
    &--val {
        font-size: 18px;
        line-height: 24px;
    }
    &--ico {
        cursor: pointer;
        font-size: 20px;
    }
}

</style>
