<template>
  <div>
    <h1>Fraction calculator</h1>
    <form name="calc">
      <div class="fraction-list">
        <Fraction
          v-for="(fraction, index) in fractions"
          :key="index"
          :isLast="index === fractions.length - 1"
          :fraction="fraction"
          :operation="operations[index]"
          @operationChange="operations[index] = $event"
        />
      </div>
      <p
        class="error"
        v-for="(errorMessage, index) in errorMessages"
        :key="index"
      >
        {{ errorMessage }}
      </p>
      <p>
        <button
          @click="
            e => {
              e.preventDefault();
              fractions = [...fractions, { ...emptyFraction }];
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
import { isNumber } from "@/utils/helpers";

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
        ...emptyFraction,
        ...emptyFraction
      },
      fractions: [{ ...emptyFraction }, { ...emptyFraction }],
      errorMessages: []
    };
  },
  components: {
    Fraction
  },
  // computed: {
  //   calculatedValue: function() {}
  // },
  watch: {
    fractions: {
      handler: function(updatedFractions) {
        let newErrorMessages = [];

        updatedFractions.forEach(({ numerator, denominator }) => {
          if (!isNumber(numerator) || !isNumber(denominator)) {
            if (!newErrorMessages.includes("Enter valid data")) {
              newErrorMessages.push("Enter valid data");
            }
          } else if (Number(denominator) === 0) {
            if (!newErrorMessages.includes("Division by zero")) {
              newErrorMessages.push("Division by zero");
            }
          }
        });

        this.errorMessages = newErrorMessages;
      },
      deep: true
    }
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
