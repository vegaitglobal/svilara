<template>
    <div class="social-icons">
        <a href="https://www.facebook.com/svilara/" target="__blank">
            <facebook-box-icon class="social-icons--ico"/>
        </a>
        <a href="https://www.instagram.com/svilara_ks/?hl=en" target="__blank">
            <instagram-icon class="social-icons--ico"/>
        </a>
        <a href="mailto:svilarans@gmail.com" target="_top">
            <gmail-icon class="social-icons--ico"/>
        </a>
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

.social-icons {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin: 15px 0 25px;
    .social-icons--ico {
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
