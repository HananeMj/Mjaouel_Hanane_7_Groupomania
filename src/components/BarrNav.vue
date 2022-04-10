<template>
  <nav>
    <div class="navbar navbar-expand navbar-light">
      <router-link to="/" class="navbar-brand"
        ><img
          class="logo"
          src="../assets/images/logo.png"
          alt="logo groupomania"
      /></router-link>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link to="/login" class="nav-link">Se connecter</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/register" class="nav-link"
              >S'inscrire</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavComp",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.navbar-expand {
  flex-flow: wrap;
  justify-content: flex-start;
}
.navbar-light {
  background-color: #fff;
}
.navbar-light .navbar-nav .nav-link {
  color: rgb(0, 0, 0);
}
h3 {
  font-weight: 500;
  margin-top: 70px;
}

.logo {
  height: 50px;
}
</style>
