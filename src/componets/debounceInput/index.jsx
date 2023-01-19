import React, { useEffect, useState } from 'react';

const DebounceInput = ({ value, onChange, setIsLoading }) => {
	const [timeoutId, setTimeoutId] = useState(null);
	const [debounceValue, setDebounceValue] = useState(value);

	useEffect(() => {
		setTimeoutId(
			setTimeout(() => {
				if (debounceValue !== value) {
					onChange(debounceValue);
				}
			}, 500)
		);

		return () => {
			clearTimeout(timeoutId);
		};
	}, [value, debounceValue]);

	return (
		<>
			<input
				type="text"
				value={debounceValue}
				onChange={(e) => setDebounceValue(e.target.value)}
			/>
		</>
	);
};

export default DebounceInput;
