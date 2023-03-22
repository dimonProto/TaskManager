import { useDispatch } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { sectionActions } from '../redux/slices/sectionSlice';
import { appActions } from '../redux/slices/appSlice';

const allActions = {
	...sectionActions,
	...appActions
};

export const useAction = () => {
	const dispatch = useDispatch();
	return bindActionCreators(allActions, dispatch);
};
