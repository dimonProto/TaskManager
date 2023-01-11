import { useEffect, useState } from 'react';

const useDebounce = (value, delay = 500) => {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		const handler = setTimeout(() => {
			// if (callback) {
			// 	callback();
			// }
			setDebouncedValue(value);
		}, delay);

		return () => {
			clearTimeout(handler);
		};
	}, [value, delay]);

	return debouncedValue;
};

export default useDebounce;
