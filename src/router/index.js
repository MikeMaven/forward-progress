import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

// route-level code splitting
const HomeView = () => import('../views/HomeView.vue');
const AboutView = () => import('../views/AboutView.vue');
const LoginView = () => import('../views/LoginView.vue');
const RegisterView = () => import('../views/RegisterView.vue');
const ProfileView = () => import('../views/profile/ProfileView.vue');
const ProfileUserInfoView = () =>
  import('../views/profile/ProfileUserInfoView.vue');
const ProfilePasswordView = () =>
  import('../views/profile/ProfilePasswordView.vue');
const NotFoundView = () => import('../views/NotFoundView.vue');
// All examples
const GamesView = () => import('../views/games/GamesView.vue');
// User views
const UsersView = () => import('../views/users/UsersView.vue');
const UserShow = () => import('../views/users/UserShow.vue');
// Note views
import NotesIndexWrapper from '../views/notes/NotesIndexWrapper.vue';
import NewNote from '../views/notes/NewNote.vue';
import EditNote from '../views/notes/EditNote.vue';
// Blog views
import BlogIndex from '../views/blog/BlogIndex.vue';
import NewBlogPost from '../views/blog/NewBlogPost.vue';
// Admin views
const AdminShow = () => import('../views/AdminDash.vue');
import NotesIndexAdminWrapper from '../views/notes/NotesIndexAdminWrapper.vue';
import NotesIndexSharedWrapper from '../views/notes/NotesIndexSharedWrapper.vue';

function createRouter() {
  return new Router({
    mode: 'history',
    linkActiveClass: 'active',
    fallback: false,
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      { path: '/', component: HomeView },
      { path: '/about', component: AboutView },
      {
        path: '/games',
        component: GamesView
      },
      { path: '/login', component: LoginView },
      { path: '/register', component: RegisterView },
      {
        path: '/profile',
        component: ProfileView,
        children: [
          { path: 'userinfo', component: ProfileUserInfoView },
          { path: 'userpassword', component: ProfilePasswordView }
        ]
      },
      { path: '/blog/index', component: BlogIndex },
      { path: '/blog/new', component: NewBlogPost },
      { path: '/users', component: UsersView },
      { path: '/users/:id', component: UserShow },
      { path: '/notes', component: NotesIndexWrapper },
      { path: '/newnote', component: NewNote },
      { path: '/editnote/:id', component: EditNote },
      { path: '/admin', component: AdminShow },
      { path: '/allnotes', component: NotesIndexAdminWrapper },
      { path: '/sharednotes', component: NotesIndexSharedWrapper },
      { path: '*', component: NotFoundView }
    ]
  });
}

export const router = createRouter();
