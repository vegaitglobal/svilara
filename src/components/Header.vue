<template>
  <div>
    <header class="header">
        <h1>Kalendar događaja</h1>
        <DatePicker/>
        <div class="header__right-part">
            <SearchField/>
            <button class="btn btn__purple btn__large" type="button">+ Dodaj događaj</button>
        </div>
    </header>
  </div>
</template>

<script>

import SearchField from './SearchField.vue'
import DatePicker from './DatePicker.vue'

export default {
  name: "Header",
  components: {
    SearchField,
    DatePicker
  }
}
</script>

<style lang="scss">
@import "../assets/scss/variables.scss";

.header {
  width: 100%;
  background-color: transparent;
  padding: 22px 0 22px 37px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &__right-part {
    display: flex;
    align-items: center;
    @include breakpoint(desk-xl) {
      flex-direction: column;
      align-items: flex-end;
    }
  }
}

</style>
