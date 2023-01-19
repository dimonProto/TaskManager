import React, { useEffect, useState } from 'react';

const DebounceInput = ({ value, onChange }) => {
	const [timeoutId, setTimeoutId] = useState(null);
	const [debounceValue, setDebounceValue] = useState(value);
	const [isFocusInput, setIsFocusInput] = useState(false);

	useEffect(() => {
		!isFocusInput && setDebounceValue(value);
	}, [value]);

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
	}, [debounceValue]);

	return (
		<>
			<input
				type="text"
				value={debounceValue}
				onChange={(e) => setDebounceValue(e.target.value)}
				onFocus={() => setIsFocusInput(true)}
				onBlur={() => setIsFocusInput(false)}
			/>
		</>
	);
};

export default DebounceInput;
