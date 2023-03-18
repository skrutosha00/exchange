<template>
  <a-select
    :value="lang"
    @change="(newValue) => $emit('update:lang', newValue)"
    style="width: 120px">
    <a-select-option value="en">English</a-select-option>
    <a-select-option value="ru">Русский</a-select-option>
  </a-select>
</template>

<style></style>

<script>
export default {
  props: {
    lang: String
  }
};
</script>
