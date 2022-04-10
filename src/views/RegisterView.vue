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
          <router-link to="/login" class="nav-link">Se connecter</router-link>
        </li>
      </div>
    </nav>
  </header>
  <div class="container">
    <Form @submit.prevent="handleRegister">
      <h1>{{ title }}</h1>
      <div class="form-group">
        <label for="firstName"><b>Prénom</b></label>
        <input
          v-model="firstName"
          name="firstName"
          type="text"
          class="form-control"
        />
        <ErrorMessage name="firstName" class="error-feedback" />
      </div>
      <div class="form-group">
        <label for="lastName"><b>Nom</b></label>
        <input
          v-model="lastName"
          name="lastName"
          type="text"
          class="form-control"
        />
        <ErrorMessage name="lastName" class="error-feedback" />
      </div>
      <div class="form-group">
        <label for="email"><b>E-mail</b></label>
        <input v-model="email" name="email" type="email" class="form-control" />
        <ErrorMessage name="email" class="error-feedback" />
      </div>
      <div class="form-group">
        <label for="password"><b>Mot de passe</b></label>
        <input
          v-model="password"
          name="password"
          type="password"
          class="form-control"
        />
        <ErrorMessage name="password" class="error-feedback" />
      </div>
      <div class="form-group">
        <button class="btn btn-primary btn-block" :disabled="loading">
          <span
            v-show="loading"
            class="spinner-border spinner-border-sm"
          ></span>
          <span>S'inscrire</span>
        </button>
      </div>
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
  name: "RegisterView",
  data() {
    return {
      title: "Créer un compte",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      message: "",
    };
  },
  methods: {
    handleRegister() {
      if (
        this.firstName == "" ||
        this.lastName == "" ||
        this.email == "" ||
        this.password == ""
      ) {
        this.message = "Veuillez remplir tous les champs !";
      }
      axios
        .post("http://localhost:5000/api/user/signup", {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          this.$router.push("/login");

          console.log(response);
        })
        .catch((err) => {
          this.message = "Erreur !";
          console.log(err);
        });
    },
  },
};
</script>

<style>
.container {
  width: 40%;
}
</style>
