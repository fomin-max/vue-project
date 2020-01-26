<template>
  <div>
    <h1>Application error</h1>
    <p>
      <router-link :to="URLS.HOME">Go to home page</router-link>
    </p>
  </div>
</template>

<script>
import { URLS } from "@/constants";

export default {
  name: "Error",
  data: () => ({
    URLS
  })
};
</script>

<style scoped></style>
