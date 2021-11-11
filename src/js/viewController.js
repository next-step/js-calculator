const viewController = executor => {
  const $app = document.getElementById('app')
  const $total = document.getElementById('total')

  const clickHandler = e => {
    try {
      const { className, textContent } = e.target
      const res = executor.execute(textContent, className)
      if (res) $total.textContent = executor.state
    } catch (err) {
      console.error(err)
      alert(err.message)
    }
  }

  $app.addEventListener('click', clickHandler)
}

export default viewController
