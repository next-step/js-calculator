const state = {
  inputArr: [],
  input: '',
}

const setState = (key, value) => {
  switch (key) {
    case 'inputArr':
      state.inputArr = value
      break
    case 'input':
      state.input = value
      break
  }
}

export { state, setState }
