const viewController = executor => {
  const $app = document.getElementById('app')
  const $total = document.getElementById('total')

  const clickHandler = e => {
    try {
      const { className, dataset } = e.target
      const res = executor.execute(dataset.value, className)
      if (res) $total.textContent = executor.state
    } catch (err) {
      console.error(err)
      alert(err.message)
    }
  }

  $app.addEventListener('click', clickHandler)
}

export default viewController
