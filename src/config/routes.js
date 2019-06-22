import {
    HomeScreen,
    LoginScreen,
    NewPostScreen
} from '../views';

export const routes = {
    login: { name: 'Login', path:'/login', component: LoginScreen },
    home: { name: 'Home', path:'/', component: HomeScreen },
    newPost:  { name: 'NewPost',  path:'/newpost', component: NewPostScreen },
};