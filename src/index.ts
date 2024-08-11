import './style.css';

// Components
import App from './App.vue';
import Home from './components/Home.vue';
import MarkdownEditor from './components/MarkdownEditor.vue';

import { createApp } from 'vue';
import { createMemoryHistory, createRouter } from 'vue-router';

const routes = [
    { path: '/', component: Home },
    { path: '/editor', component: MarkdownEditor },
];

const router = createRouter({
    history: createMemoryHistory(),
    routes: routes,
});

createApp(App).use(router).mount('#app');
