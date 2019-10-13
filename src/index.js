function parseValue(value) {
	return {
		current: value % 10,
		next: (value - value % 10) / 10
	};
}

function setValues(array, index, value) {
	if (array[index]) {
		const sum = array[index] + value.current;
		const newValue = parseValue(sum);
		array[index] = newValue.current;
		if (newValue.next > 0) {
			setValues(array, index + 1, parseValue(newValue.next))
		}
	} else {
		array[index] = value.current;
	}
	if (value.next > 0) {
		setValues(array, index + 1, parseValue(value.next))
	}
}

module.exports = function multiply(first, second) {
	const firstReverseArray = first.split('').reverse();
	const secondReverseArray = second.split('').reverse();
	var resultArray = [];
	firstReverseArray.forEach(function(vFirst, iFirst){
		secondReverseArray.forEach(function(vSecond, iSecond) {
			const smallResult = parseInt(vFirst, 10) * parseInt(vSecond, 10);
			const value = parseValue(smallResult);
			setValues(resultArray, iFirst + iSecond, value);		
		});
	});
	return resultArray.reverse().join('');
}