import Welcome from "@/pages/Welcome.vue";
import Admin from "@/pages/Admin.vue";
import Login from "@/pages/Login.vue";
import Register from "@/pages/Register.vue";
import VerifyEmail from "@/pages/VerifyEmail.vue";
import Logout from "@/pages/Logout.vue";
import ResetPasswordEmail from "@/pages/ResetPasswordEmail.vue";
import Formular from "../components/Formular.vue";

const routes = [
  {
    path: "/",
    component: Welcome,
    name: "Welcome"
  },
  {
    path: "/admin/login",
    component: Login,
    name: "Login"
  },
  {
    path: "/admin",
    component: Admin,
    name: "Admin"
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
    path: "/admin/reset-password/:token",
    component: ResetPasswordEmail,
    name: "ResetPasswordEmail"
  },
  {
    path: "/logout",
    component: Logout,
    name: "Logout"
  },

  {
    path: "/formular",
    component: Formular,
    name: "Formular"
  }
];

export default routes;
