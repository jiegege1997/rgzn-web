import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true
  },
  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true
  },
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard/index"),
        meta: { title: "首页", icon: "dashboard" }
      }
    ]
  },
  //事件识别
  {
    path: "/example",
    component: Layout,
    redirect: "/example/table",
    children: [
      {
        path: "table",
        name: "Table",
        component: () => import("@/views/table/index"),
        meta: {
          title: "事件提取",
          icon: "table"
          // keepAlive: true,
          // ifDoFresh: false
        }
      }
    ]
  },
  {
    path: "/details",
    component: Layout,
    hidden: true,
    redirect: "/example/table",
    children: [
      {
        path: "details",
        name: "details",
        component: () => import("@/views/table/detail"),
        meta: { title: "详情" }
      }
    ]
  },
  // 算法
  {
    path: "/suanfa",
    component: Layout,
    hidden: true,
    redirect: "/example/table",
    children: [
      {
        path: "suanfa",
        name: "suanfa",
        component: () => import("@/views/table/suanfa"),
        meta: { title: "详情" }
      }
    ]
  },
  // 事件管理
  {
    path: "/manage",
    component: Layout,
    redirect: "/example/manage",
    children: [
      {
        path: "manage",
        name: "Manage",
        component: () => import("@/views/manage/index"),
        meta: { title: "事件管理", icon: "form" }
      }
    ]
  },
  {
    path: "/addevent",
    component: Layout,
    hidden: true,
    redirect: "/example/manage",
    children: [
      {
        path: "addevent",
        name: "addevent",
        component: () => import("@/views/manage/create"),
        meta: { title: "新增事件" }
      }
    ]
  },
  {
    path: "/detailevent",
    component: Layout,
    hidden: true,
    redirect: "/example/manage",
    children: [
      {
        path: "detailevent",
        name: "detailevent",
        component: () => import("@/views/manage/edit"),
        meta: { title: "事件详情" }
      }
    ]
  },
  // 事件预测
  {
    path: "/nested",
    component: Layout,
    redirect: "/nested/menu1",
    name: "Nested",
    meta: {
      title: "事件预测",
      icon: "nested"
    },
    children: [
      {
        path: "menu1",
        component: () => import("@/views/nested/menu1/index"), // Parent router-view
        name: "Menu1",
        meta: { title: "训练模型" }
      },
      {
        path: "creates",
        name: "creates",
        component: () => import("@/views/nested/menu1/create")
        // meta: { title: 'Table', icon: 'table' }
      },
      {
        path: "nestdetail",
        name: "nestdetail",
        component: () => import("@/views/nested/menu1/detail")
        // meta: { title: 'Table', icon: 'table' }
      },
      {
        path: "menu2",
        component: () => import("@/views/nested/menu2/index"),
        meta: { title: "事件预测" }
      },
      {
        path: "newEvent",
        name: "NewEvent",
        component: () => import("@/views/nested/menu2/newEvent")
      }
    ]
  },
  {
    path: "/treeSelect",
    component: Layout,
    redirect: "/example/tree",
    children: [
      {
        path: "tree",
        name: "Tree",
        component: () => import("@/views/tree/index"),
        meta: { title: "事理图谱", icon: "tree" }
      }
    ]
  },
  {
    path: "/peopleSelect",
    component: Layout,
    redirect: "/peopleSelect/tree",
    children: [
      {
        path: "people",
        name: "People",
        component: () => import("@/views/people/index"),
        meta: { title: "人员共现", icon: "example" }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: "*", redirect: "/404", hidden: true }
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
