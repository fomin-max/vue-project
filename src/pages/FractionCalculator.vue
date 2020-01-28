<template>
  <div>
    <h1>Fraction calculator</h1>
    <form name="calc">
      <div class="fraction-list">
        <Fraction
          v-for="(fraction, index) in fractions"
          :key="index"
          :isLast="index === fractions.length - 1"
          :isError="errorMessages.length > 0"
          :fraction="fraction"
          :operation="operations[index]"
          :calculatedValue="calculatedValue"
          @operationChange="handleOperationChange($event, index)"
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
        <button @click="handleAddFractionClick">
          ADD FRACTION
        </button>
      </p>
    </form>
  </div>
</template>

<script>
import { Fraction } from "@/components";
import { isInteger, calculate, isEmptyString } from "@/utils/helpers";

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
      fractions: [{ ...emptyFraction }, { ...emptyFraction }],
      errorMessages: [],
      calculatedValue: { ...emptyFraction }
    };
  },
  components: {
    Fraction
  },
  methods: {
    validate: function(currentFractions) {
      let newErrorMessages = [];

      currentFractions.forEach(({ numerator, denominator }) => {
        if (denominator === 0) {
          if (!newErrorMessages.includes("Division by zero")) {
            newErrorMessages.push("Division by zero");
          }
        } else if (
          (numerator && !isInteger(numerator)) ||
          (denominator && !isInteger(denominator))
        ) {
          if (!newErrorMessages.includes("Enter valid data")) {
            newErrorMessages.push("Enter valid data");
          }
        } else if (isEmptyString(numerator) || isEmptyString(denominator)) {
          if (!newErrorMessages.includes("")) {
            newErrorMessages.push("");
          }
        }
      });

      this.errorMessages = newErrorMessages;
    },
    handleExpressionChange: function() {
      this.validate(this.fractions);

      const isNoErrors = this.errorMessages.length === 0;

      if (isNoErrors) {
        this.calculatedValue = calculate(this.fractions, this.operations);
      }
    },
    handleOperationChange: function(value, index) {
      this.operations[index] = value;

      this.handleExpressionChange();
    },
    handleAddFractionClick: function(event) {
      event.preventDefault();

      this.fractions = [...this.fractions, { ...this.emptyFraction }];
      this.operations = [...this.operations, "+"];
    }
  },
  watch: {
    fractions: {
      handler: function() {
        this.handleExpressionChange();
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
