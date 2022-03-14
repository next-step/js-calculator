export const isValidMaxLength = (value) => {
	if (value.length > 2) {
		return false;
	}

	return true;
};
