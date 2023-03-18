<template>
  <h3 class="header">{{ this.translate.rateDataHeader[this.lang] }}</h3>

  <div class="data">
    <a-spin
      :tip="this.translate.loaderTip[this.lang]"
      class="spin"
      v-if="!dataLoaded" />

    <a-timeline v-if="dataLoaded">
      <a-timeline-item>{{ umiRate.USD }} USD</a-timeline-item>
      <a-timeline-item>{{ umiRate.RUB }} RUB</a-timeline-item>
      <a-timeline-item>{{ umiRate.UZS.toFixed(2) }} UZS</a-timeline-item>
    </a-timeline>
  </div>
</template>

<style scoped>
.header {
  margin-bottom: 20px;
}

.data {
  position: relative;
  height: 100px;
  margin: 20px auto;
}
.spin {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>

<script>
export default {
  props: {
    umiRate: Object,
    lang: String,
    translate: Object
  },
  computed: {
    dataLoaded() {
      if (
        this.umiRate &&
        this.umiRate.USD &&
        this.umiRate.RUB &&
        this.umiRate.UZS
      ) {
        return true;
      }

      return false;
    }
  }
};
</script>
