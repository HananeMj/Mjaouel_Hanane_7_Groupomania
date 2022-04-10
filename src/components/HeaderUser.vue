<template>
  <header>
    <nav class="navbar navbar-expand">
      <router-link to="/" class="navbar-brand"
        ><img
          class="logo"
          src="../assets/images/logo.png"
          alt="logo de groupomania"
      /></router-link>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <a class="nav-link" @click="disconnectUser">Se deconnecter</a>
        </li>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: "HeaderUser",
  methods: {
    disconnectUser() {
      localStorage.clear();
      this.$router.push("/");
    },
  },
};
</script>

<style></style>
