import { createStore, combineReducers } from "redux";
import { mainConnectionReducer } from "./States/MainConnection";

export default createStore(combineReducers({
    mainConnection: mainConnectionReducer,
}));
