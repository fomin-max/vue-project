<template>
  <div>
    <h1>Fraction calculator</h1>
    <form name="calc">
      <div class="fraction-list">
        <Fraction
          v-for="(fraction, index) in fractions"
          :key="index"
          :fraction="fraction"
        />
      </div>
      <Fraction :isLast="true" />
      <p class="error"></p>
      <p><a>ADD FRACTION</a></p>
    </form>
  </div>
</template>

<script>
import { Fraction } from "@/components";

export default {
  name: "FractionCalculator",
  data: () => ({
    operations: [""],
    fractions: [
      {
        numerator: "12",
        denominator: "2"
      }
    ]
  }),
  components: {
    Fraction
  }
};
</script>

<style scoped>
form {
  display: inline-block;
  margin: 0 auto;
}
.fraction-list {
  display: inline-block;
}
.error {
  color: red;
}
</style>
