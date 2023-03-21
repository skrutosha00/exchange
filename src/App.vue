<template>
  <h1>Umi Rate</h1>

  <div class="link-cont">
    <a-button type="link" href="https://t.me/dostatok_start_bot" class="link">
      {{ translate.dostatokLink[lang] }}
    </a-button>

    <a-button type="link" href="https://t.me/umipay2_bot" class="link">
      {{ translate.umiBotLink[lang] }}
    </a-button>
  </div>

  <LangSelect v-model:lang="lang" class="lang-select" />

  <ExchangeForm
    v-model:cryptoValue="cryptoValue"
    v-model:fiatValue="fiatValue"
    v-model:cryptoCurrency="cryptoCurrency"
    v-model:fiatCurrency="fiatCurrency"
    v-model:focusedInput="focusedInput"
    class="app_form" />

  <RateData :cryptoRate="cryptoRate" :lang="lang" :translate="translate" />

  <p class="info">
    {{ translate.dateOfLastUpdate[lang] }}:
    {{ lastUpdate }}
  </p>
</template>

<script>
import { message } from "ant-design-vue";
import ExchangeForm from "@/components/ExchangeForm.vue";
import RateData from "@/components/RateData.vue";
import LangSelect from "@/components/LangSelect.vue";
import translate from "@/assets/translate.json";

export default {
  name: "App",
  data() {
    return {
      lang: "ru",
      translate: translate,
      cryptoValue: 0,
      fiatValue: 0,
      cryptoCurrency: "UMI",
      fiatCurrency: "USD",
      focusedInput: null,
      cryptoRate: {
        UMI: {
          USD: null,
          RUB: null,
          UZS: null,
          GLZ: null
        },
        GLZ: {
          USD: null,
          RUB: null,
          UZS: null
        }
      },
      lastUpdate: "..."
    };
  },
  methods: {
    async fetchCryptoRate() {
      return await fetch("https://stats.umi.top/rates").then((data) =>
        data.json()
      );
    },
    async fetchUzsRate() {
      return await fetch(
        // dev "https://corsanywhere.herokuapp.com/https://nbu.uz/exchange-rates/json/"
        "/get_uzs_rate"
      )
        .then((data) => data.json())
        .then((data) => data.filter((info) => info.code == "USD"))
        .then((data) => data[0].cb_price);
    },

    async setCryptoRate() {
      let ratesData = await this.fetchCryptoRate().catch((err) => {
        console.log(err);
        message.error(translate.messageUmiDataError[this.lang]);
      });

      if (!ratesData) {
        return;
      }

      this.cryptoRate.UMI.USD = +ratesData.data.USD.value;
      this.cryptoRate.UMI.RUB = +ratesData.data.RUB.value;
      this.cryptoRate.UMI.GLZ = +ratesData.tokens.GLZ.value;

      this.cryptoRate.GLZ.USD =
        this.cryptoRate.UMI.USD / this.cryptoRate.UMI.GLZ;

      this.cryptoRate.GLZ.RUB =
        this.cryptoRate.UMI.RUB / this.cryptoRate.UMI.GLZ;
    },
    async setUzsRate() {
      let uzsRate = await this.fetchUzsRate().catch((err) => {
        console.log(err);
        message.error(translate.messageUzsDataError[this.lang]);
      });

      if (!uzsRate) {
        return;
      }

      this.cryptoRate.UMI.UZS = this.cryptoRate.UMI.USD * uzsRate;

      this.cryptoRate.GLZ.UZS =
        this.cryptoRate.UMI.UZS / this.cryptoRate.UMI.GLZ;
    },

    async setRates(silent = false) {
      if (!silent) {
        this.cryptoRate = {
          UMI: {},
          GLZ: {}
        };
      }

      await this.setCryptoRate(false);
      await this.setUzsRate(false);

      this.lastUpdate = new Date().toLocaleString();
    },

    updateClickHandler() {
      this.setRates();
    }
  },
  components: {
    ExchangeForm,
    RateData,
    LangSelect
  },
  async mounted() {
    this.setRates();

    setInterval(() => {
      this.setRates(true);
    }, 58 * 1000);
  },
  watch: {
    cryptoValue(newValue) {
      if (this.focusedInput == "fiatInput") {
        return;
      }

      this.fiatValue = +(
        newValue * this.cryptoRate[this.cryptoCurrency][this.fiatCurrency]
      ).toFixed(2);
    },
    fiatValue(newValue) {
      if (this.focusedInput == "cryptoInput") {
        return;
      }

      this.cryptoValue = +(
        newValue / this.cryptoRate[this.cryptoCurrency][this.fiatCurrency]
      ).toFixed(2);
    },
    fiatCurrency(newValue) {
      this.fiatValue = +(
        this.cryptoValue * this.cryptoRate[this.cryptoCurrency][newValue]
      ).toFixed(2);
    },
    cryptoCurrency(newValue) {
      this.fiatValue = +(
        this.cryptoValue * this.cryptoRate[newValue][this.fiatCurrency]
      ).toFixed(2);
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

.link-cont {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 5px 35px;

  width: 100%;
  max-width: 380px;
  margin: auto;
}

.link {
  padding: 0 !important;
}

.app_form {
  margin: 20px auto;
}

.lang-select {
  position: absolute !important;
  right: 10px;
  top: 10px;
}

.info {
  margin: 0;
}
</style>
