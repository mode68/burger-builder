export const updateObject = (oldObject, updatedProperties) => {
	return {
		...oldObject,
		...updatedProperties,
	};
};

export const checkValidity = (value, rules) => {
	let isValid = true;

	if (rules.required) {
		isValid = value.trim() !== '' && isValid;
	}

	if (rules.minLength) {
		isValid = value.length >= rules.minLength && isValid;
	}

	if (rules.maxLength) {
		isValid = value.length <= rules.maxLength && isValid;
	}

	if (rules.isEmail) {
		const regEx = new RegExp(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/);
		isValid = regEx.test(value);
	}

	return isValid;
};
