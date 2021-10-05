import axios from "axios";

export default {
  namespaced: true,
  state() {
    return {
      popAddCoin: false,
      popDeleteCoin: false,
      loading: false,
      btcInfo: 1,
      ethInfo: null,
      myBalance: 0,
      btcBalance: 0,
      ethBalance: 0,
      series: [12,8]
    }
  },
  mutations: {

  },
  actions: {
    async getCoinsInfo(state) {
      const btcReq = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin&order=market_cap_desc&per_page=100&page=1&sparkline=false')
      this.state.portfolio.btcInfo = btcReq.data[0]
      const ethReq = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum&order=market_cap_desc&per_page=100&page=1&sparkline=false')
      this.state.portfolio.ethInfo = ethReq.data[0]
      console.log(this.state.portfolio.btcInfo)
      this.state.portfolio.loading = true
    }
  },
}