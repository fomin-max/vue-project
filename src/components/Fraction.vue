<template>
  <div>
    <div class="fraction">
      <input
        type="number"
        name="numerator"
        v-model.number="fraction.numerator"
      />
      <hr />
      <input
        type="number"
        name="denominator"
        v-model.number="fraction.denominator"
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
      <input type="number" />
      <hr />
      <input type="number" />
    </div>
  </div>
</template>

<script>
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
    }
  },
  data() {
    return {
      operationValues: ["+", "-", "*", "/"],
      operationValue: this.operation
    };
  },
  methods: {
    handleSelectChange() {
      this.$emit("operationChange", this.operationValue);
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
