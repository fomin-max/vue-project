<template>
  <div>
    <h1>Fraction calculator</h1>
    <form name="calc">
      <div class="fraction-list">
        <Fraction
          v-for="(fraction, index) in fractions"
          :key="index"
          :fraction="fraction"
          :operation="operations[index]"
          @operationChange="operations[index] = $event"
        />
      </div>
      <Fraction
        :isLast="true"
        :key="fractions.length"
        :fraction="fraction"
        :operation="operations[index]"
        @operationChange="operations[index] = $event"
      />
      <p class="error"></p>
      <p>
        <button
          @click="
            e => {
              e.preventDefault();
              fractions = [...fractions, emptyFraction];
              operations = [...operations, '+'];
            }
          "
        >
          ADD FRACTION
        </button>
      </p>
    </form>
  </div>
</template>

<script>
import { Fraction } from "@/components";

export default {
  name: "FractionCalculator",
  data() {
    const emptyFraction = {
      numerator: "",
      denominator: ""
    };

    return {
      operations: ["+"],
      emptyFraction: {
        ...emptyFraction
      },
      fractions: [{ ...emptyFraction }]
    };
  },
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
