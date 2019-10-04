import Welcome from "@/pages/Welcome.vue"
import Login from "@/pages/Login.vue"
import Register from "@/pages/Register.vue"
import VerifyEmail from "@/pages/VerifyEmail.vue"
import Logout from "@/pages/Logout.vue"
import ResetPasswordEmail from "@/pages/ResetPasswordEmail.vue"

const routes = [
    {
        path: "/",
        component: Welcome,
        name: "Welcome"
    },
    {
        path: "/login",
        component: Login,
        name: "Login"
    },
    {
        path: "/register",
        component: Register,
        name: "Register"
    },
    {
        path: "/verify-email/:token",
        component: VerifyEmail,
        name: "VerifyEmail"
    },
    {
        path: "/reset-password/:token",
        component: ResetPasswordEmail,
        name: "ResetPasswordEmail"
    },
    {
        path: "/logout",
        component: Logout,
        name: "Logout"
    }
]

export default routes;