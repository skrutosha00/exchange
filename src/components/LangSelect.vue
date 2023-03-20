<template>
  <div class="lang-select">
    <img src="@/assets/ru.svg" alt="" @click="$emit('update:lang', 'ru')" />
    <img src="@/assets/gb.svg" alt="" @click="$emit('update:lang', 'en')" />
  </div>
</template>

<script>
export default {
  props: {
    lang: String
  }
};
</script>

<style>
.lang-select {
  display: flex;
  justify-content: space-between;
  width: 70px;
}

.lang-select img {
  width: 30px;
}
</style>
