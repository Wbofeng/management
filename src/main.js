/*
 * MIT License
 *
 * Copyright (c) 2017 SmartestEE Co,Ltd..
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the 'Software'), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/*
 * Revision History:
 *     Initial: 2017/10/19        Feng Yifei
 */

import Vue from 'vue';
import Vuex from 'vuex';
import iView from 'iview';
import VueI18n from 'vue-i18n';
import VueRouter from 'vue-router';
import vueResource from 'vue-resource';
import 'iview/dist/styles/iview.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';

import App from './App';
import Routes from './router';

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VueI18n);
Vue.use(iView);
Vue.use(ElementUI);
Vue.use(vueResource);

Vue.config.lang = 'zh-CN';

const store = new Vuex.Store({
  state: {
    currentPath: [
      {
        title: '首页',
        path: '/home/main',
        name: 'home_index',
      },
    ],
    historyPath: [],
    menuTheme: 'dark',
    openedSubmenuArr: [],
    pageOpenedList: [],
    currentPageName: '',
  },
  mutations: {
    setCurrentPath(state, pathArr) {
      this.state.currentPath = pathArr;
    },
  },
});
// 多语言配置
const router = new VueRouter({
  routes: Routes,
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});
