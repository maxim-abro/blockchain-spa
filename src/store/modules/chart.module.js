import axios from "axios";

export default {
  namespaced: true,
  state() {
    return {
      dates: [],
      dataSeriesBtc:[],
      dataSeriesEth:[],
      chartBtc: [],
      chartEth: [],
    }
  },
  mutations: {
    getLastDateBtc(state) {
      state.chartBtc.forEach((i,idx)=> {
        if (idx % 3 == 0) {
          state.dataSeriesBtc.push(i[1])
          let nowDate = new Date(i[0])
          // console.log(nowDate)
          // state.dates.push(`${nowDate.getDate()+1}/${nowDate.getMonth()+1}/${nowDate.getFullYear()}`)
          state.dates.push(nowDate.toISOString())
        }
      })
      console.log(state.dates)
    },
    getPricesEth(state) {
      state.chartEth.forEach((i,idx)=> {
        if(idx % 3 == 0) {
          state.dataSeriesEth.push(i[1])
        }
      })
    }
  },
  actions: {
    async getBtcChart({commit}) {
      const req = await axios.get('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=14')
      this.state.chart.chartBtc = req.data.prices
      commit('getLastDateBtc')
    },
    async getEthChart({commit}) {
      const req = await axios.get('https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=14')
      this.state.chart.chartEth = req.data.prices
      commit('getPricesEth')
    }
  }
}