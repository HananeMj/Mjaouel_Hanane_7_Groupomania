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
          <router-link to="/register" class="nav-link"
            >Créer un compte</router-link
          >
        </li>
      </div>
    </nav>
  </header>

  <div class="container">
    <Form @submit.prevent="handleSubmit">
      <h1>{{ title }}</h1>

      <label for="email"><b>E-mail</b></label>
      <input v-model="email" name="email" type="email" class="form-control" />
      <ErrorMessage name="email" class="error-feedback" />

      <label for="password"><b>Mot de passe</b></label>
      <input
        v-model="password"
        name="password"
        type="password"
        class="form-control"
      />
      <ErrorMessage name="password" class="error-feedback" />

      <button class="btn btn-primary btn-block" :disabled="loading">
        <span v-show="loading" class="spinner-border spinner-border-sm"></span>
        <span>Se connecter</span>
      </button>

      <div class="form-group">
        <div v-if="message" class="alert alert-danger" role="alert">
          {{ message }}
        </div>
      </div>
    </Form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "LoginView",
  components: {},
  data() {
    return {
      email: "",
      password: "",
      title: "Connexion",
      loading: false,
      message: "",
    };
  },
  methods: {
    handleSubmit() {
      if (this.email == "" || this.password == "") {
        this.message = "Veuillez entrer vos identifiants !";
      } else {
        axios
          .post("http://localhost:5000/api/user/login", {
            email: this.email,
            password: this.password,
          })
          .then((response) => {
            let resToken = response.data.token;
            let resUser = response.data.userId;
            localStorage.setItem("token", resToken);
            localStorage.setItem("user", JSON.stringify(resUser));
            this.$router.push("/postlist");
          })
          .catch((err) => {
            this.message = "Utilisateur non trouvé !";
            console.log(err);
          });
      }
    },
  },
};
</script>

<style>
.container {
  background-color: rgb(230, 227, 227);
  margin: 0 auto;
  margin-top: 10%;
  margin-bottom: 10%;
  border-radius: 5px;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
  border: 1px solid #f1f1f1;
}
.container h1 {
  margin: 0 auto;
  padding-bottom: 10px;
}

.form-control {
  width: 100%;
  padding: 12px 20px;
  margin-bottom: 8px;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
}
form {
  margin-top: 20px;
  margin-bottom: 30px;
}
.btn:not(:disabled):not(.disabled) {
  margin-top: 20px;
}
.alert-danger {
  margin-top: 20px;
}
</style>
