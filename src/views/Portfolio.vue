<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <div class="card shadow my-2 p-2">
          <h2 class="card-title">Мой портфель</h2>
        </div>
      </div>
    </div>
    <div class="row justify-content-between">
      <div class="col-3">
        <div class="my-2 p-2">
          <h3 class="card-title">Мой баланс: {{$store.state.portfolio.myBalance}}$</h3>
        </div>
      </div>
      <div class="col-3">
        <div class="my-2 p-2 d-flex justify-content-end">
          <button class="btn btn-danger mx-3" @click="$store.state.portfolio.popDeleteCoin = true" v-if="$store.state.portfolio.btcBalance || $store.state.portfolio.ethBalance">удалить коины</button>
          <button class="btn btn-success align-self-end" @click="$store.state.portfolio.popAddCoin = true">добавить коины</button>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="card shadow my-2 p-2" v-if="$store.state.portfolio.loading">
          <table>
            <tr>
              <td>#</td>
              <td>валюта</td>
              <td>цена</td>
              <td>капитализация</td>
              <td>активы</td>
            </tr>
            <tr v-if="$store.state.portfolio.btcInfo.id">
              <td>1</td>
              <td><img width="15" height="15" :src="$store.state.portfolio.btcInfo.image" :alt="$store.state.portfolio.btcInfo.id"> {{ $store.state.portfolio.btcInfo.name }}</td>
              <td>{{ $store.state.portfolio.btcInfo.current_price }} $</td>
              <td>{{ $store.state.portfolio.btcInfo.market_cap }} $</td>
              <td>{{ $store.state.portfolio.btcBalance }}</td>
            </tr>
            <tr>
              <td>2</td>
              <td><img width="15" height="15" :src="$store.state.portfolio.ethInfo.image" :alt="$store.state.portfolio.ethInfo.id"> {{ $store.state.portfolio.ethInfo.name }}</td>
              <td>{{ $store.state.portfolio.ethInfo.current_price }} $</td>
              <td>{{ $store.state.portfolio.ethInfo.market_cap }} $</td>
              <td>{{ $store.state.portfolio.ethBalance }}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="card shadow my-2 p-2"  v-if="$store.state.portfolio.myBalance !== 0">
          <apexchart type="pie" width="380" :options="chartOptions" :series="$store.state.portfolio.series"></apexchart>
        </div>
      </div>
    </div>
    <add-coin v-if="$store.state.portfolio.popAddCoin"></add-coin>
    <delete-coin v-if="$store.state.portfolio.popDeleteCoin"></delete-coin>
  </div>
</template>

<script>
  import AddCoin from '../components/AddCoin'
  import DeleteCoin from "../components/DeleteCoin";
  import VueApexCharts from 'vue3-apexcharts'

  export default {
    data() {
      return {
        popAddCoin: false,
        chartOptions: {
          chart: {
            width: 380,
            type: 'pie'
          },
          labels:['BTC', 'ETH'],
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: 'bottom'
              }
            }
          }]
        }
      }
    },
    components: {
      AddCoin,
      DeleteCoin,
      apexcharts: VueApexCharts,
    },
    created() {
      this.$store.dispatch('portfolio/getCoinsInfo')
    }
  }
</script>

<style scoped lang="scss">
  table {

  }
</style>