<template>
  <nav class="navbar navbar-expand">
    <router-link to="/" class="navbar-brand"
      ><img
        class="logo"
        src="../assets/images/logo.png"
        alt="logo de groupomania"
    /></router-link>
    <div class="navbar-nav mr-auto">
      <li class="nav-item">
        <router-link to="/postlist" class="nav-link active"
          >Mes posts</router-link
        >
      </li>
      <li class="nav-item">
        <router-link to="/OnePost" class="nav-link active">Publier</router-link>
      </li>
      <li class="nav-item">
        <a class="nav-link active" @click="disconnectUser">Se deconnecter</a>
      </li>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavbarPost",
  methods: {
    disconnectUser() {
      localStorage.clear();
      this.$router.push("/");
    },
  },
};
</script>

<style>
.nav-link {
  cursor: pointer;
}
.logo {
  height: 60px;
}
.navbar-expand {
  flex-flow: wrap;
}
a {
  color: black;
}
</style>
