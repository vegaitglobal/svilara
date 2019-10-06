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
        position: fixed;
        width: 100%;
        bottom: 0;
        background: $purple;
        display: none;
        @include breakpoint(mob) {
            display: block;
        }
    }
</style>