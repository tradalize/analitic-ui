<script setup lang="ts">
import { SUPPORTED_INDICATORS } from "./TradeChart/indicators";
import type { BollingerBandsParams, EMAParams } from "./TradeChart/indicators";
import { IndicatorsListKey } from "./interface";

const { indicators, indicatorsLinesParams } = inject(IndicatorsListKey, {
  indicators: [],
  indicatorsLinesParams: {},
});

const EMAFormComp = defineAsyncComponent(
  () => import("./TradeChart/indicators/EMAForm.vue")
);

const BBFormComp = defineAsyncComponent(
  () => import("./TradeChart/indicators/BollingerBandsForm.vue")
);
</script>

<template>
  <v-row>
    <v-col v-for="indicator in indicators" cols="12" md="6" lg="3">
      <EMAFormComp
        v-if="RegExp(SUPPORTED_INDICATORS.ema).test(indicator.key)"
        v-bind="(indicator.indicatorParams as EMAParams)"
        v-model:line-params="indicatorsLinesParams[indicator.key]"
      />

      <BBFormComp
        v-if="indicator.key === SUPPORTED_INDICATORS.bb"
        v-bind="(indicator.indicatorParams as BollingerBandsParams)"
        v-model:line-params="indicatorsLinesParams[indicator.key]"
      />
    </v-col>
  </v-row>
</template>
