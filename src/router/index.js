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
export const loginRouter = {
  path: '/',
  meta: {
    title: 'Login - 登录',
  },
  name: 'signin',
  component: () => import('../modules/login/login.vue'),
};

export const mainRouter = {
  path: '/home',
  meta: {
    title: 'Home - 主页',
  },
  name: 'home',
  component: () => import('../modules/home/home.vue'),
  children: [
    { path: 'main', name: 'main', component: () => import('../modules/pages/main.vue') },
    { path: 'root', name: 'root', component: () => import('../modules/pages/root.vue') },
    { path: 'text', name: 'text', component: () => import('../modules/pages/text.vue') },
    { path: 'markdown', name: 'markdown', component: () => import('../modules/pages/markdown.vue') },
    { path: 'dragtext', name: 'dragtext', component: () => import('../modules/pages/dragtext.vue') },
    { path: 'file-upload', name: 'file-upload', component: () => import('../modules/pages/file-upload.vue') },
    { path: 'article-publish', name: 'article-publish', component: () => import('../modules/pages/article-publish') },
  ],
};

const routers = [
  loginRouter,
  mainRouter,
];

export default routers;
