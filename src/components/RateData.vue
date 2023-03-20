<template>
  <h3 class="header">{{ this.translate.rateDataHeader[this.lang] }}</h3>

  <div class="data">
    <a-spin
      :tip="this.translate.loaderTip[this.lang]"
      class="spin"
      v-if="!dataLoaded" />

    <a-timeline v-if="dataLoaded" v-for="cryptoCurrency in ['UMI', 'GLZ']">
      <a-timeline-item v-for="value in valueList">
        <div class="inner">
          {{ value }} {{ cryptoCurrency }} =
          {{ (cryptoRate[cryptoCurrency].USD * value).toFixed(2) }} USD /
          {{ (cryptoRate[cryptoCurrency].RUB * value).toFixed(2) }} RUB /
          {{ (cryptoRate[cryptoCurrency].UZS * value).toFixed(2) }} UZS
        </div>
      </a-timeline-item>
    </a-timeline>
  </div>
</template>

<script>
export default {
  props: {
    cryptoRate: Object,
    lang: String,
    translate: Object
  },
  data() {
    return {
      valueList: [1, 4400, 44000, 66000, 88000, 100000]
    };
  },
  computed: {
    dataLoaded() {
      if (
        this.cryptoRate &&
        this.cryptoRate.UMI.USD &&
        this.cryptoRate.UMI.RUB &&
        this.cryptoRate.UMI.UZS &&
        this.cryptoRate.UMI.GLZ
      ) {
        return true;
      }

      return false;
    }
  }
};
</script>

<style scoped>
.header {
  margin-bottom: 20px;
}

.data {
  position: relative;
  min-height: 100px;
}

li {
  font-size: 11px;
  padding-bottom: 14px;
}

.inner {
  position: relative;
  top: 3px;
  left: -10px;
  width: calc(100% + 10px);
}

.spin {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
