export class Store {
	constructor(state, reducer) {
		this.state = state;
		this.reducer = reducer;
	}

	getState() {
		return this.state;
	}

	dispatch(action) {
		this.state = this.reducer(this.state, action);
		console.log(this.state);
	}
}
