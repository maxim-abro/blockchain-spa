<template>
  <div class="card shadow mx-2 my-3 p-2">
    <h2 class="card-title">Главная страница</h2>
  </div>
  <div class="card shadow mx-2 my-3 p-2">
    <hr>
    <h4>Конвертер валют</h4>
    <div class="card-body d-flex align-items-center justify-content-center">
         <div class="mm-cont">
           <div class="mb-3 d-flex">
             <select class="form-select" aria-label="Default select example" v-model="$store.state.home.rightChange" @change="$store.dispatch('home/getExchange')">
               <option value="bitcoin" selected>btc</option>
               <option value="ethereum">eth</option>
             </select>
             <input type="number" class="left form-mm" @input="leftCalcExchange" v-model="$store.state.home.leftInput" aria-label="Text input with dropdown button">
           </div>
           <div class="arrow"> &harr; </div>
           <div class="mb-3 d-flex">
             <select class="form-select" aria-label="Default select example" v-model="$store.state.home.leftChange" @change="$store.dispatch('home/getExchange')">
               <option value="btc">btc</option>
               <option value="usd" selected>usd</option>
               <option value="eth">eth</option>
             </select>
             <input type="number" class="right form-mm" @input="rightCalcExchange" v-model="$store.state.home.rightInput">
           </div>
         </div>
      </div>
  </div>

  <div class="card shadow mx-2 my-3 p-3">
    <h2 class="card-title">График измения курса за 14 дней</h2>
    <div class="card-body">
      Bitcoin:
      <apexcharts width="100%" h="350" type="area" :options="chartOptions" :series="seriesBtc"></apexcharts>
      <span>Etherium:</span>
      <apexcharts width="100%" h="350" type="area" :options="chartOptions" :series="seriesEth"></apexcharts>
    </div>
  </div>
</template>

<script>
  import VueApexCharts from 'vue3-apexcharts'

export default {
  data() {
    return {
      leftActive: 'btc',
      rightActive: 'usd',
      xaxisDates: [],
      chartOptions: {
        chart: {

        },
        dataLabels: {
          enabled: false
        },
        fill: {
          type: "gradient",
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.9,
            stops: [0, 90, 100]
          }
        },
        xaxis: {
          type: 'datetime',
          categories: this.$store.state.chart.dates
        },
        tooltip: {
          x: {
            format: 'dd/MM/yy'
          }
        }
      },
      seriesBtc: [{
        name: 'btc',
        data: this.$store.state.chart.dataSeriesBtc
      }],
      seriesEth: [{
        name: 'eth',
        data: this.$store.state.chart.dataSeriesEth,
        color: 'green'
      }]
    }
  },
  components: {
    apexcharts: VueApexCharts
  },
  created() {
    this.$store.dispatch('home/getExchange')
    this.$store.dispatch('chart/getBtcChart')
    this.$store.dispatch('chart/getEthChart')
  },
  mounted() {
    this.xaxisDates = this.$store.state.chart.dates
  },
  methods: {
    toggleMenu(e) {
    },
    leftCalcExchange() {
      this.$store.state.home.rightInput = this.$store.state.home.leftInput * this.$store.state.home.exchange.current_price
    },
    rightCalcExchange() {
      this.$store.state.home.leftInput = this.$store.state.home.rightInput / this.$store.state.home.exchange.current_price
    }
  }
}
</script>

<style scoped lang="scss">
  .btn-toggle {
    transition: 0.5s;
    background: none;
    color: #846c5a;
    border: 2px solid #846c5a;
    border-bottom-left-radius: 0.25rem;
    border-top-left-radius: 0.25rem;
    &:hover {
      transition: 0.5s;
      background: #846c5a;
      color: #fff;
    }
  }

  .form-mm {
    align-self: stretch;
    border: 1px solid #7a7a7b;
    border-top-right-radius:0.25rem;
    border-bottom-right-radius: 0.25rem;
  }

  .mm-cont {
    display: flex;
    flex-direction: row;
    align-self: center;
    align-items: center;
    width: 30%;
    .arrow {
      align-self: center;
    }
  }

  h4 {
    align-self: center;
  }
</style>