<template>
  <header>
    <nav class="navbar navbar-expand">
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <a class="nav-link" @click="disconnectUser">Se deconnecter</a>
        </li>
        <li class="nav-item">
          <router-link to="/postlist" class="nav-link"
            >Fil d'actualités</router-link
          >
        </li>
      </div>
    </nav>
  </header>
  <form class="submit-form">
    <div>
      <div class="form-group">
        <label for="content">Quoi de neuf ?</label>
        <input
          v-model="content"
          type="text"
          class="form-control"
          id="content"
          required
          name="content"
        />
      </div>
      <div class="form-group">
        <label for="picture">Publier une photo</label>
        <input
          class="form-control-label upload-File"
          type="file"
          ref="picture"
          accept="image/*"
          @change="selectFile"
          id="picture"
          name="picture"
        />
      </div>
      <button @click.prevent="savePost" class="btn btn-success">Publier</button>
    </div>
    <div class="submitOk">
      <h4 v-show="ifOk">Publié !</h4>
    </div>
  </form>
</template>

<script>
import axios from "axios";
export default {
  name: "AddPost",
  components: {},
  data() {
    return {
      ifok: false,

      content: "",
      picture: "",
    };
  },
  methods: {
    selecFile() {
      this.picture = this.$refs.image.files[0];
      this.picture = URL.createObjectURL(this.picture);
    },

    savePost() {
      axios({
        method: "POST",
        url: "http://localhost:5432/post",
        headers: {
          Authorization: "Bearer" + localStorage.getItem("token"),
        },
        content: this.content,
        picture: this.picture,
      })
        .then((res) => {
          console.log(res);
          res.status(200).json({ message: "Post publié !" });
          this.$router.push("/postlist");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.submit-form {
  max-width: 300px;
  margin: auto;
}
.custom-file-input :hover {
  cursor: pointer;
}
.submitOk {
}
</style>
