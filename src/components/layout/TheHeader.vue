<template>
  <header class="header">
    <!--:style="[isLogin ? 'display: none' : '']"-->
    <nav class="nav">
      <div class="container-row">
        <img :src="require('../../../public/hard-work.png')" alt="WorkLance icon">
        <h2>
          <router-link :to="{name: 'Home'}">WorkLance</router-link>
        </h2>
      </div>

      <div class="nav-menu" :class="{'show-menu': isMobileMenuShown}">
        <ul class="nav-list">
          <li>
            <router-link :to="{name: 'Developers'}">See the Developers</router-link>
          </li>
          <template v-if="isLogged">
            <li>
              <router-link :to="{name: 'Messages'}">Your Messages</router-link>
            </li>
            <li>
              <logout-link></logout-link>
            </li>
          </template>
          <li v-else>
            <router-link :to="{name: 'Login'}">Login</router-link>
          </li>
        </ul>

        <div class="nav-close" v-if="isMobileMenuShown" @click="showMobileMenu">
          <font-awesome-icon icon="times"></font-awesome-icon>
        </div>
      </div>

      <div class="nav-toggle" @click="showMobileMenu">
        <font-awesome-icon icon="bars"></font-awesome-icon>
      </div>
    </nav>
  </header>
</template>

<script>
import LogoutLink from "./LogoutLink";

export default {
  name: "TheHeader",

  components: {LogoutLink},

  data() {
    return {
      isMobileMenuShown: false,
    };
  },

  computed: {
    isLogged() {
      return !!this.$store.getters['getUserId'];
    }
  },

  methods: {
    showMobileMenu() {
      this.isMobileMenuShown = !this.isMobileMenuShown;
    }
  }
}
</script>

<style lang="scss" scoped>
header {
  width: 100%;
  height: 6rem;
  background-color: $base-bg;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 -6px 10px 5px rgba(0,0,0,0.5);

  .nav {
    width: 90%;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &-toggle, &-close {
      display: none;
    }

    &-list {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;

      li {
        margin: 0 0.5rem;
      }
    }
  }

  .container-row {
    img {
      height: 3.5rem;
      width: 3.5rem;
    }

    h2 {
      margin: 0;

      a {
        color: black;
        margin: 0;
      }

      a:hover, a:active,
      a.router-link-active {
        border-color: transparent;
      }
    }
  }

  a {
    text-decoration: none;
    color: black;
    display: inline-block;
    padding: 0.5rem 1rem;
    border: 1px solid transparent;
  }

  a:active, a:hover, a.router-link-active {
    border-bottom: 1px solid black;
  }

  a:visited {
    color: black;
  }
}

@media screen and (max-width: 1023px){
  .nav {
    &-menu {
      position: fixed;
      top: -100%;
      left: 0;
      background-color: $base-bg;
      box-shadow: 0 8px 16px hsla(230, 75%, 32%, .15);
      width: 100%;
      padding-block: 2.5rem 2rem;
      transition: top .4s;
    }

    &-list {
      display: flex;
      flex-direction: column;
      row-gap: 1em;
      text-align: center;
    }

    &-toggle {
      display: flex !important;
      cursor: pointer;
    }

    &-close {
      display: flex !important;
      cursor: pointer;
      position: absolute;
      top: 1.5em;
      right: 1.5em;
    }
  }
}

.show-menu{
   top: 0;
}
</style>