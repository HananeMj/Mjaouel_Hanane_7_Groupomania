<template>
  <div class="flex flex-col">
    <div class="p-5 bg-white mt-5 rounded-t-2xl shadow-sm">
      <div class="flex items-center space-x-2">
        <p class="font-medium">
          {{ post.user.firstName }} {{ post.user.lastName }}
        </p>
        <p v-if="timestamp" class="text-xs text-gray-400">
          {{ new Date(timestamp?.toDate()).toLocaleString() }}
        </p>
        <p v-else class="text-xs text-gray-400">Loading</p>
      </div>
    </div>
    <p class="pt-4">{{ post.content }}</p>
  </div>
  <div v-if="postImage" class="relative h-56 md:h-96 bg-white">
    <img :src="postImage" class="object-cover w-full" loading="lazy" />
  </div>
</template>

<script>
export default {
  name: "PostComp",
  data() {},
  methods: {
    createPost() {},
  },
};
</script>

<style></style>
