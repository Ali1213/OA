import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login/login'
import home from '@/components/home/home'
import createproject from '@/components/createproject/createproject'
import projects from '@/components/projects/projects'
import tasks from '@/components/tasks/tasks'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'home',
    component: home
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/createproject',
    name: 'createproject',
    component: createproject
  },
  {
    path: '/projects',
    name: 'projects',
    component: projects
  },
  {
    path: '/tasks',
    name: 'tasks',
    component: tasks
  }
]
 const router = new Router({
  mode: 'abstract',
  routes
})

export {router}


