<template>
  <form>
    <a-input-number
      @focus="(event) => $emit('update:focusedInput', event.target.id)"
      @change="(newValue) => $emit('update:cryptoValue', newValue)"
      :value="cryptoValue"
      :min="0"
      id="cryptoInput">
      <template #addonAfter>
        <a-select
          :value="cryptoCurrency"
          @change="(newValue) => $emit('update:cryptoCurrency', newValue)"
          style="width: 80px">
          <a-select-option value="UMI">UMI</a-select-option>
          <a-select-option value="GLZ">GLZ</a-select-option>
        </a-select>
      </template>
    </a-input-number>

    <a-input-number
      @focus="(event) => $emit('update:focusedInput', event.target.id)"
      @change="(newValue) => $emit('update:fiatValue', newValue)"
      :value="fiatValue"
      :min="0"
      id="fiatInput">
      <template #addonAfter>
        <a-select
          :value="fiatCurrency"
          @change="(newValue) => $emit('update:fiatCurrency', newValue)"
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
    cryptoValue: Number,
    fiatValue: Number,
    cryptoCurrency: String,
    fiatCurrency: String,
    focusedInput: String
  }
};
</script>
