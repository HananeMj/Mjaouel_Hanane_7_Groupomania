<template>
  <BarrNav />
  <div class="title">
    <h3>Bienvenue sur votre réseau social d'entreprise Groupomania</h3>
  </div>
</template>

<script>
import BarrNav from "@/components/BarrNav.vue";

export default {
  name: "HomeView",
  components: {
    BarrNav,
  },
};
</script>
<style scoped>
.title {
  margin-top: 50px;
}
</style>
