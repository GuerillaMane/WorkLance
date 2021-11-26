<template>
  <header>
    <nav>
      <div class="container-row">
        <img :src="require('../../../public/hard-work.png')" alt="WorkLance icon">
        <h2>
          <router-link :to="{name: 'Home'}">WorkLance</router-link>
        </h2>
      </div>

      <ul>
        <li>
          <router-link :to="{name: 'Developers'}">See the Developers</router-link>
        </li>
        <li>
          <router-link :to="{name: 'Messages'}">Your Messages</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: "TheHeader"
}
</script>

<style scoped>
header {
  width: 100%;
  height: 6rem;
  background-color: #FEC8D8;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 -6px 10px 5px rgba(0,0,0,0.5);
}

header img {
  height: 3.5rem;
  width: 3.5rem;
}

header a {
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

h2 {
  margin: 0;
}

h2 a {
  color: black;
  margin: 0;
}

h2 a:hover,
h2 a:active,
h2 a.router-link-active {
  border-color: transparent;
}

header nav {
  width: 90%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

li {
  margin: 0 0.5rem;
}
</style>