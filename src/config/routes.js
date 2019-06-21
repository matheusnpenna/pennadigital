import {
    Home,
    Login,
    NewPost
} from '../components';

export const routes = {
    login: { name: 'Login', path:'/login', component: Login },
    home: { name: 'Home', path:'/', component: Home },
    newPost:  { name: 'NewPost',  path:'/newpost', component: NewPost },
};