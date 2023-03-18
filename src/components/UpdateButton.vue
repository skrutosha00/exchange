<template>
  <div class="cont">
    <a-button @click="$emit('btnClick')" shape="round" type="primary">
      {{ this.translate.updateButtonText[this.lang] }}
    </a-button>

    <div class="hint">
      {{ this.translate.updateButtonHint[this.lang] }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    lang: String,
    translate: Object
  }
};
</script>

<style scoped>
.cont {
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  max-width: 480px;
}

.hint {
  font-size: 12px;
  text-align: right;
  max-width: 50%;
}
</style>
