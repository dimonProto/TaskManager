import React, { useEffect } from 'react';

const DebounceInput = ({ value, setValue }) => {
	useEffect(() => {
		const timeOut = setTimeout(() => {
			setValue(value);
		}, 500);
		return () => {
			clearTimeout(timeOut);
		};
	}, [value]);

	console.log(value);

	return (
		<>
			<input
				type="text"
				value={value}
				onChange={(e) => setValue(e.target.value)}
			/>
		</>
	);
};

export default DebounceInput;
