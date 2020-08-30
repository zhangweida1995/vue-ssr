<template>
  <div id="app">
    <img alt="Vue logo"
         :src="logo">
    <header>
      <template>
        <router-link v-for="item in getMenuRoute"
                     :key="item.name"
                     :to="item.path">{{item.meta.title}}</router-link>
      </template>
    </header>

    <transition name="fade"
                mode="out-in">
      <router-view class="view"></router-view>
    </transition>
  </div>
</template>

<script>
import logo from '@/assets/logo.png'
export default {
  name: 'App',
  components: {
  },
  data () {
    return {
      logo,
      route: this.routes.options.routes
    }
  },
  computed: {
    getMenuRoute () {
      return this.route.filter(item => item.meta)
    }
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
#app {
  text-align: center;
}
a {
  margin-right: 1em;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
