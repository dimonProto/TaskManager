import { useCallback, useState } from 'react';

export const useToggle = (initial = false) => {
	const [isState, setIsState] = useState(initial);
	const toggle = useCallback(
		() => setIsState((prevState) => !prevState),
		[setIsState]
	);
	return [isState, toggle];
};
