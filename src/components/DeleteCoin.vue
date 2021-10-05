<template>
  <div class="back">
    <div class="add-coin">
      <h3>удалить коин</h3>
      <div class="mb-3 d-flex">
        <select class="form-select" v-model="currentValue">
          <option value="bitcoin" v-if="$store.state.portfolio.btcBalance">bitcoin</option>
          <option value="ethereum" v-if="$store.state.portfolio.ethBalance">ethereum</option>
        </select>
        <input type="number" min="0" :max="currentValue == 'bitcoin' ? $store.state.portfolio.btcBalance : $store.state.portfolio.ethBalance" class="left form-mm" @input="leftCalcExchange" v-model="inputNumber" aria-label="Text input with dropdown button">
      </div>
      <button class="btn btn-primary m-1" @click="addCoins">Добавать</button>
      <button class="close-pop" @click="$store.state.portfolio.popDeleteCoin = false">&times;</button>
    </div>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        currentValue: '',
        inputNumber: 0
      }
    },
    methods: {
      addCoins() {
        if(this.currentValue == 'bitcoin') {
          this.$store.state.portfolio.btcBalance -= (this.inputNumber*1)
          this.$store.state.portfolio.myBalance -= this.inputNumber * this.$store.state.portfolio.btcInfo.current_price
          this.$store.state.portfolio.series[0] -= this.inputNumber * this.$store.state.portfolio.btcInfo.current_price
          this.$store.state.portfolio.popDeleteCoin = false
        } else if (this.currentValue == 'ethereum') {
          this.$store.state.portfolio.ethBalance -= (this.inputNumber*1)
          this.$store.state.portfolio.myBalance -= this.inputNumber * this.$store.state.portfolio.ethInfo.current_price
          this.$store.state.portfolio.series[1] -= this.inputNumber * this.$store.state.portfolio.ethInfo.current_price
          this.$store.state.portfolio.popDeleteCoin = false
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .back {
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    width: 100vw;
    background: #00000095;
    display: flex;
    justify-content: center;
    align-items: center;
    .add-coin {
      position: relative;
      /*height: 70vh;*/
      /*width: 40vw;*/
      background: white;
      border-radius: 10px;
      display: flex;
      padding: 30px;
      flex-direction: column;
      .close-pop {
        position: absolute;
        top: -30px;
        right: -30px;
        font-size: 30px;
        padding: 0;
        width: 30px;
        height: 30px;
        border:none;
        background: none;
      }
    }
  }
</style>