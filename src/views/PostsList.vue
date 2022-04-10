<template>
  <section>
    <div class="container-post">
      <div><NavBarPost /></div>
      <div class="card gedf-card"></div>

      <div class="container-fluid gedf-wrapper">
        <div v-for="post in posts" v-bind:key="post.id" class="bloclist">
          <div class="post-card">
            <div class="card gedf-card">
              <div class="card-header container-info">
                <div class="h5 m-0">
                  <!--{{ user.firstName }} {{ user.lastName }}-->
                </div>
                <div class="card-body">
                  <p class="card-text">{{ post.content }}</p>
                  <img v-bind:src="post.picture" alt="photo du post" />
                </div>
                <div class="card-footer d-flex flex-row fs-12">
                  <button
                    v-if="!post.user_id"
                    type="button"
                    class="btn btn-danger"
                    title="delete"
                    aria-label="bouton supprimer"
                    @click.prevent="deletePost(post.id)"
                  >
                    supprimer le post
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";

import NavBarPost from "@/components/NavBarPost.vue";

export default {
  name: "PostsList",
  components: {
    NavBarPost,
  },
  data() {
    return {
      posts: "",
    };
  },
  /*methods: {
    deletePost() {
      axios
        .delete("http://localhost:5000/api/post", {
          headers: {
            Authorization: "Bearer" + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          console.log(res);
          res.status(200).json({ message: "Supprimé !" });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },*/
  mounted() {
    axios({
      method: "GET",
      url: "http://localhost:5432/post/all",
      headers: {
        Authorization: "Bearer" + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        this.posts = res.data.data;
        console.log(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style scoped></style>
