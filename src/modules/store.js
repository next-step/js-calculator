import createStore from '../core/Redux/createStore'
import reducer from './reducer.js'

const store = createStore(reducer)

export { store }
