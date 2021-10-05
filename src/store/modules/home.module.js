import axios from 'axios'

export default {
  namespaced: true,
  state() {
    return {
      exchange: null,
      leftChange: 'usd',
      rightChange: 'bitcoin',
      leftInput: 1,
      rightInput: 1,
      chartBtc: []
    }
  },
  mutations: {
    setUrl(state) {
      state.exchange = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${state.leftChange}&ids=${state.rightChange}`
    }
  },
  actions: {
    async getExchange({commit}) {
      let u = '1'
      commit('setUrl')
      console.log(this.state.home.exchange)
      const req = await axios.get(`${this.state.home.exchange}`)
      this.state.home.exchange = req.data[0]
      console.log(req.data[0].current_price)
      this.state.home.rightInput = this.state.home.leftInput * req.data[0].current_price
      console.log(this.state.home.exchange)
    },
  }
}