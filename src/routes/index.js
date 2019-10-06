import Welcome from "@/pages/Welcome.vue";
import Admin from "@/pages/Admin.vue";
import Editor from "../pages/Editor.vue";
import Login from "@/pages/Login.vue";
import NewEvent from "@/pages/NewEvent.vue";
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
    path: "/admin/editor/:id",
    component: Editor,
    name: "Editor"
  },
  {
    path: "/new-event",
    component: NewEvent,
    name: "NewEvent"
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
