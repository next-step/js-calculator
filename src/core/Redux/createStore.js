export default (reducer) => {
  let state

  const listeners = []

  const getState = () => ({ ...state })

  const dispatch = (action) => {
    state = reducer(state, action)
    publish()
  }

  const publish = () => {
    listeners.forEach(({ subscriber, context }) => {
      subscriber.call(null)
    })
  }

  const subscribe = (subscriber, context = null) => {
    listeners.push({
      subscriber,
      context,
    })
  }

  return {
    getState,
    dispatch,
    subscribe,
  }
}
