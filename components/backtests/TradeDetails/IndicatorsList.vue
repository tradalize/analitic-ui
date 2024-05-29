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
  <div class="grid sm:grid-cols-2 md:grid-cols-4 sm:gap-2 md:gap-4 mb-4">
    <template v-for="indicator in indicators">
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
    </template>
  </div>
</template>
