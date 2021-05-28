import { $ } from '../utils/utils.js'

const init = () => {
  console.log(display)
}

const display = $('#total')

document.addEventListener('DOMContentLoaded', () => {
  init()
})