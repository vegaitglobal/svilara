<template>
    <div>
        <Sidebar />
        <h3>Settings</h3>
        <div class="settings-input">
            <SettingsOption v-for="(option, index) in settings" :key="index" :option="option" />
            <h3>Questions</h3>
            <!-- {{questions}} -->
            <Question v-for="(question) in questions" :key="`${question.id}a`" :question="question" />
        </div>
    </div>
    
</template>

<script>
import Sidebar from "../components/Sidebar.vue";
import SettingsOption from "../components/SettingsOption.vue"
import Question from "../components/Question.vue"

export default {
    name: 'Settings',
    components:{
        Sidebar,
        SettingsOption,
        Question
    },
    created(){
        this.$store.dispatch('fetchSettings')
        this.$store.dispatch('fetchQuestions')
    },

    computed: {
        settings(){
            return this.$store.getters.getSettings
        },
        questions(){
            return this.$store.getters.getQuestions
        }
    }
}
</script>

<style lang="scss">
.settings-input {
    div {
        margin-bottom: 10px;
        display: flex;
        input {
            margin-right: 10px;
        }
        button {
            margin-right: 10px;
        }
    }
}
</style>