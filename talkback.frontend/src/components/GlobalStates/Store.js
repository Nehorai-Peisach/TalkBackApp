import { createStore, combineReducers } from "redux";
import { currentUserReducer } from "./States/CurrentUser"
import { userListReducer } from "./States/UserList";
import { connectionLoginReducer } from "./States/ConnectionLogin";
import { connectionChatReducer } from "./States/ConnectionChat";
import { connectionGameReducer } from "./States/ConnectionGame";

export default createStore(combineReducers({
    currentUser: currentUserReducer,
    connectionLogin: connectionLoginReducer,
    connectionChat: connectionChatReducer,
    connectionGame: connectionGameReducer,
    userList: userListReducer
}));
