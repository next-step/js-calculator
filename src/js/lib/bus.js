const eventBus = {
	/**
	 * @param {string} type
	 * @param {unknown} [data]
	 */
	emit(type, data) {
		document.dispatchEvent(
			new CustomEvent(type, {
				detail: data,
			}),
		);
	},

	/**
	 * @param {string} type
	 * @param {EventListener} listener
	 */
	on(type, listener) {
		document.addEventListener(type, listener);
	},
};

export default eventBus;
