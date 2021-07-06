import createStore from '../core/Redux/createStore.js'
import reducer from './reducer.js'

const store = createStore(reducer)

export { store }
