import { useEffect, useRef } from 'react';

const useDebounce = (callback, delay = 500) => {
	// const [isLoading, setIsLoading] = useState(false);
	let timeoutId = useRef();

	useEffect(() => {
		timeoutId = setTimeout(() => {
			callback();
		}, delay);

		return () => {
			clearTimeout(timeoutId);
		};
	}, [callback, delay]);
	return timeoutId;
};

export default useDebounce;
