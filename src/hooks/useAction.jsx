import React from 'react';
import {useDispatch} from "react-redux";
import {bindActionCreators} from "@reduxjs/toolkit";
import {sectionActions} from "../redux/slices/sectionSlice";

const allActions = {
    ...sectionActions
}

export const useAction = () => {
    const dispatch = useDispatch()
    return bindActionCreators(allActions, dispatch)
};
