import Vue from 'vue';
import VueRouter from 'vue-router';
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo';
import './bootstrap';
import PostList from './components/PostList';
import Post from './components/Post';

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

const app = new Vue({
    el: '#app',
    apolloProvider,
    router
});
