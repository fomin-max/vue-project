<template>
  <div>
    <div class="fraction">
      <input
        type="number"
        name="numerator"
        :class="{ 'danger-border': !isNumeratorFilled }"
        v-model.number="fraction.numerator"
        @blur="handleInputBlur"
      />
      <hr />
      <input
        type="number"
        name="denominator"
        :class="{
          'danger-border': !isDenominatorFilled || fraction.denominator === 0
        }"
        v-model.number="fraction.denominator"
        @blur="handleInputBlur"
      />
    </div>
    <select
      v-if="!isLast"
      v-model="operationValue"
      @change="handleSelectChange"
    >
      <option v-for="(operationValue, index) in operationValues" :key="index">
        {{ operationValue }}
      </option>
    </select>
    <button v-if="isLast" @click="event => event.preventDefault()">=</button>
    <div v-if="isLast" class="fraction">
      <span>{{ calculatedValue.numerator }}</span>
      <hr />
      <span>{{ calculatedValue.denominator }}</span>
    </div>
  </div>
</template>

<script>
import { isInteger } from "@/utils/helpers";

export default {
  name: "Fraction",
  props: {
    isLast: {
      type: Boolean,
      default: false
    },
    fraction: {
      type: Object,
      default: () => ({
        numerator: "",
        denominator: ""
      })
    },
    operation: {
      type: String,
      default: () => ""
    },
    calculatedValue: {
      type: Object,
      default: () => ({
        numerator: "",
        denominator: ""
      })
    }
  },
  data() {
    return {
      operationValues: ["+", "-", "*", "/"],
      operationValue: this.operation,
      isNumeratorFilled: false,
      isDenominatorFilled: false
    };
  },
  methods: {
    handleSelectChange() {
      this.$emit("operationChange", this.operationValue);
    },
    handleInputBlur({ target: { name, value } }) {
      const isValueInteger = isInteger(value);

      if (name === "numerator") {
        this.isNumeratorFilled = isValueInteger;
      } else {
        this.isDenominatorFilled = isValueInteger;
      }
    }
  },
  watch: {
    operation: function(operationValue) {
      this.operationValue = operationValue;
    }
  }
};
</script>

<style scoped>
div {
  display: inline-block;
}
.fraction {
  vertical-align: middle;
  margin: 0 1em;
}
input {
  width: 3em;
}
</style>
