<template>
  <div>
    <div class="social-icons__wrapper">
       <a href="">
           <facebook-box-icon class="ico"/>
        </a>
       <a href="">
           <instagram-icon class="ico"/>
        </a>
       <a href="">
           <gmail-icon class="ico"/>
        </a>
    </div>
  </div>
</template>

<script>
import FacebookBoxIcon from 'vue-material-design-icons/FacebookBox.vue';
import InstagramIcon from 'vue-material-design-icons/Instagram.vue';
import GmailIcon from 'vue-material-design-icons/Gmail.vue';

export default {
    name: "SocialIcons",
    components: {
        FacebookBoxIcon,
        InstagramIcon,
        GmailIcon
    }
}
</script>

<style lang="scss">
@import "../assets/scss/variables.scss";

.social-icons__wrapper {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    .ico {
        font-size: 25px;
        svg {
            fill: $white;
            transition: 0.2s;
        }
        &:hover {
            svg {
                fill: rgba($white, 0.6);
            }
        }
    }
}

</style>
