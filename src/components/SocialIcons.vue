<template>
  <div class="social-icons">
    <a :href="facebookLink" target="__blank" v-if="facebookLink !== ''">
      <facebook-box-icon class="social-icons--ico" />
    </a>
    <a :href="instagramLink" target="__blank" v-if="instagramLink !== ''">
      <instagram-icon class="social-icons--ico" />
    </a>
    <a :href="mailLink" target="_top" v-if="mailLink !== ''">
      <gmail-icon class="social-icons--ico" />
    </a>
    <a :href="twitterLink" target="__blank" v-if="twitterLink !== ''">
      <twitter-icon class="social-icons--ico" />
    </a>
    <a :href="youtubeLink" target="__blank" v-if="youtubeLink !== ''">
      <youtube-icon class="social-icons--ico" />
    </a>
  </div>
</template>

<script>
import FacebookBoxIcon from "vue-material-design-icons/FacebookBox.vue";
import InstagramIcon from "vue-material-design-icons/Instagram.vue";
import GmailIcon from "vue-material-design-icons/Gmail.vue";
import TwitterIcon from "vue-material-design-icons/Twitter.vue";
import YoutubeIcon from "vue-material-design-icons/Youtube.vue";

export default {
  name: "SocialIcons",
  components: {
    FacebookBoxIcon,
    InstagramIcon,
    GmailIcon,
    TwitterIcon,
    YoutubeIcon
  },
  computed: {
    settings: {
      get: function() {
        return this.$store.getters.getSettings();
      }
    },
    facebookLink() {
      if (this.settings.length && this.settings[3].value) {
        return this.settings[3].value;
      }
      return "";
    },
    instagramLink() {
      if (this.settings.length && this.settings[4].value) {
        return this.settings[4].value;
      }
      return "";
    },
    mailLink() {
      if (this.settings.length && this.settings[7].value) {
        return `mailto:+ ${this.settings[7].value}`;
      }
      return "";
    },
    twitterLink() {
      if (this.settings.length && this.settings[5].value) {
        return this.settings[5].value;
      }
      return "";
    },
    youtubeLink() {
      if (this.settings.length && this.settings[6].value) {
        return this.settings[6].value;
      }
      return "";
    },
  }
};
</script>

<style lang="scss">
@import "../assets/scss/variables.scss";

.social-icons {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 15px 0 25px;
  a {
    margin: 0 8px;
  }
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
