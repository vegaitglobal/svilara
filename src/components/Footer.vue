<template>
    <div class="footer">
        <SocialIcons/>
        <ContactInfo/>
    </div>
</template>

<script>
import SocialIcons from './SocialIcons'
import ContactInfo from './ContactInfo'

export default {
  name: "Footer",
  components: {
    SocialIcons,
    ContactInfo
  },
}
</script>


<style lang="scss">
@import "../assets/scss/variables.scss";

.footer {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background: $purple;
    display: none;
    padding: 10px 0;
    @include breakpoint(mob) {
        display: block;
    }
}
</style>