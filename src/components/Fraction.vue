<template>
  <fragment>
    <div class="fraction">
      <input type="number" name="numerator" v-model="fraction.numerator" />
      <hr />
      <input type="number" name="denominator" v-model="fraction.denominator" />
    </div>
    <select v-if="!isLast">
      <option value="+">+</option>
      <option value="-">-</option>
      <option value="*">*</option>
      <option value="/">/</option>
    </select>
    <button v-if="isLast">=</button>
    <div v-if="isLast" class="fraction">
      <input type="number" />
      <hr />
      <input type="number" />
    </div>
  </fragment>
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
    }
  }
};
</script>

<style scoped>
.fraction {
  display: inline-block;
  vertical-align: middle;
  margin: 0 1em;
}
input {
  width: 3em;
}
</style>
