import { createStore } from 'vuex'
import home from './modules/home.module'
import chart from './modules/chart.module'
import portfolio from './modules/portfolio.module'

export default createStore({
    modules: {
        home,
        chart,
        portfolio,
    }
})