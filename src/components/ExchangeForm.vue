<template>
  <form>
    <a-input-number
      @focus="(event) => $emit('update:focusedInput', event.target.id)"
      @change="(newValue) => $emit('update:umiValue', newValue)"
      :value="umiValue"
      :min="0"
      addon-after="UMI"
      id="umiInput">
    </a-input-number>

    <a-input-number
      @focus="(event) => $emit('update:focusedInput', event.target.id)"
      @change="(newValue) => $emit('update:currencyValue', newValue)"
      :value="currencyValue"
      :min="0"
      id="currencyInput">
      <template #addonAfter>
        <a-select
          :value="currency"
          @change="(newValue) => $emit('update:currency', newValue)"
          style="width: 80px">
          <a-select-option value="USD">USD</a-select-option>
          <a-select-option value="RUB">RUB</a-select-option>
          <a-select-option value="UZS">UZS</a-select-option>
        </a-select>
      </template>
    </a-input-number>
  </form>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: left;
  gap: 20px;

  max-width: 480px;
}
</style>

<script>
export default {
  props: {
    umiValue: Number,
    currencyValue: Number,
    currency: String,
    focusedInput: String
  }
};
</script>
