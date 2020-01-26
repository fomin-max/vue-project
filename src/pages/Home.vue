<template>
  <div>
    <h1>Home Page</h1>
    <p>
      Test task for Aline digital agency company,<br />
      check this pages
    </p>
    <ul>
      <li><router-link :to="URLS.COMMENTS">Comments</router-link></li>
      <li>
        <router-link :to="URLS.FRACTION_CALCULATOR">
          Fraction calculator
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { URLS } from "@/constants";

export default {
  name: "Home",
  data: () => ({
    URLS
  })
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
</style>
