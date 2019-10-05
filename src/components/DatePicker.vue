<template>
    <div class="date-picker">
        <chevron-left-icon @click="decMonth" class="date-picker--ico"/>
        <span class="date-picker--val">{{selectedMonth}}</span>
        <chevron-right-icon @click="incMonth" class="date-picker--ico"/>
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
    },

    methods:{
        incMonth(){
            this.$store.dispatch('increaseMonth')
        },

        decMonth(){
            this.$store.dispatch('decreaseMonth')
        }
    },

    computed:{
        selectedMonth(){
            return this.$store.getters.getSelectedMonth
        }
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
