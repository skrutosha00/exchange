<template>
  <h1>Umi Rate</h1>

  <LangSelect v-model:lang="lang" class="lang-select" />

  <RateData :umiRate="umiRate" :lang="lang" :translate="translate" />

  <ExchangeForm
    v-model:umiValue="umiValue"
    v-model:currencyValue="currencyValue"
    v-model:currency="currency"
    v-model:focusedInput="focusedInput"
    class="app_form" />

  <UpdateButton
    :lang="lang"
    :translate="translate"
    @btnClick="updateClickHandler"
    class="app_update" />

  <p class="info">
    {{ translate.dateOfLastUpdate[this.lang] }}:
    {{ lastUpdate }}
  </p>
</template>

<script>
import { message } from "ant-design-vue";
import ExchangeForm from "@/components/ExchangeForm.vue";
import RateData from "@/components/RateData.vue";
import LangSelect from "@/components/LangSelect.vue";
import translate from "@/assets/translate.json";
import UpdateButton from "@/components/UpdateButton.vue";

export default {
  name: "App",
  data() {
    return {
      lang: "en",
      translate: translate,
      umiValue: 0,
      currencyValue: 0,
      currency: "USD",
      focusedInput: null,
      umiRate: {
        USD: null,
        RUB: null,
        UZS: null
      },
      lastUpdate: "Loading..."
    };
  },
  methods: {
    async fetchUmiRate() {
      return await fetch("https://stats.umi.top/rates")
        .then((data) => data.json())
        .then((data) => data.data);
    },
    async fetchUzsRate() {
      return await fetch(
        // "https://corsanywhere.herokuapp.com/https://nbu.uz/exchange-rates/json/"
        // `${window.location}get_uzs_rate`
        "/get_uzs_rate"
      )
        .then((data) => data.json())
        .then((data) => data.filter((info) => info.code == "USD"))
        .then((data) => data[0].cb_price);
    },

    async setUmiRate(silent = false) {
      let ratesData = await this.fetchUmiRate().catch((err) => {
        console.log(err);

        if (!silent) {
          message.error(translate.messageUmiDataError[this.lang]);
        }
      });

      if (!ratesData) {
        return;
      }

      if (!silent) {
        message.success(translate.messageUmiDataSuccess[this.lang]);
      }

      this.umiRate.USD = +ratesData.USD.value;
      this.umiRate.RUB = +ratesData.RUB.value;
    },
    async setUzsRate(silent = false) {
      let uzsRate = await this.fetchUzsRate().catch((err) => {
        console.log(err);

        if (!silent) {
          message.error(translate.messageUzsDataError[this.lang]);
        }
      });

      if (!uzsRate) {
        return;
      }

      if (!silent) {
        message.success(translate.messageUzsDataSuccess[this.lang]);
      }

      this.umiRate.UZS = this.umiRate.USD * uzsRate;
    },

    async setRates() {
      this.umiRate = { USD: null, RUB: null, UZS: null };

      await this.setUmiRate(false);
      await this.setUzsRate(false);

      this.lastUpdate = new Date().toLocaleString();
    },
    async setRatesSilent() {
      await this.setUmiRate(true);
      await this.setUzsRate(true);

      this.lastUpdate = new Date().toLocaleString();
    },

    updateClickHandler() {
      this.setRates();
    }
  },
  components: {
    ExchangeForm,
    RateData,
    LangSelect,
    UpdateButton
  },
  async mounted() {
    this.setRates();

    setInterval(() => {
      this.setRatesSilent();
    }, 58 * 1000);
  },
  watch: {
    umiValue(newValue) {
      if (this.focusedInput == "currencyInput") {
        return;
      }

      this.currencyValue = +(newValue * this.umiRate[this.currency]).toFixed(2);
    },
    currencyValue(newValue) {
      if (this.focusedInput == "umiInput") {
        return;
      }

      this.umiValue = +(newValue / this.umiRate[this.currency]).toFixed(2);
    },
    currency(newValue) {
      this.currencyValue = +(this.umiValue * this.umiRate[newValue]).toFixed(2);
    }
  }
};
</script>

<style>
#app {
  position: relative;
  max-width: 800px;
  margin: auto;
  padding: 15px;
}

.app_form {
  margin: 20px auto;
}

.lang-select {
  position: absolute !important;
  right: 10px;
  top: 10px;
}

.app_update {
  margin: 30px auto 40px;
}
</style>
