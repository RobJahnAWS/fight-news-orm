import { lazy } from "react";
import { identity } from "rxjs";

const Dashboard = lazy(() => import("../views/dashboard/Dashboard"));
const NewArticle = lazy(() => import("../views/pages/NewArticle"));
const EditArticle = lazy(() => import("../views/pages/EditArticle"));
const Comment = lazy(() => import("../views/pages/Comment"));

var ThemeRoutes = [
    // {
    //     navlabel: true,
    //     name: "Personal",
    //     icon: "mdi mdi-dots-horizontal",
    // },
    {
        path: "/dashboard",
        name: "Articles",
        icon: "home",
        component: Dashboard,
    },
    {
        path: "/create_article",
        name: "Create Article",
        icon: "home",
        component: NewArticle,
    },
    {
        path: "/comment",
        name: "Comments",
        icon: "home",
        component: Comment,
    },
    {
        path: "/edit_article/:id",
        // name: "Edit Artcile",
        // icon: "home",
        component: EditArticle,
    },
    { path: "/", pathTo: "/dashboard", name: "Dashboard", redirect: true },
];
export default ThemeRoutes;
