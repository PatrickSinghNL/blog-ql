import Vue from 'vue';
import VueRouter from 'vue-router';
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo';
import './bootstrap';
import PostList from './PostList';
import Post from './Post';
import TopicPostList from './TopicPostList';
import AuthorPostList from './AuthorPostList';
import NotFound from './NotFound';
import moment from 'moment';

window.Vue = Vue;
Vue.use(VueRouter);
Vue.use(VueApollo);

const routes = [
    {
        path: '/',
        name: 'index',
        component: PostList
    },
    {
        path: '/post/:id',
        name: 'post',
        component: Post
    },
    {
        path: '/topics/:slug',
        name: 'topic',
        component: TopicPostList
    },
    {
        path: '/authors/:id',
        name: 'author',
        component: AuthorPostList
    },
    {
        path: '*',
        name: '404',
        component: NotFound
    }
];

const httpLink = createHttpLink({
    uri: 'http://blog-ql.test/graphql',
});

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
    link: httpLink,
    cache,
});

const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
});

const router = new VueRouter({
    mode: 'history',
    routes
});

Vue.filter('timeago', value => moment(value).fromNow());
Vue.filter('longDate', value => moment(value).format('MMMM Do YYYY'));

const app = new Vue({
    el: '#app',
    apolloProvider,
    router
});
