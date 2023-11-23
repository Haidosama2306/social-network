import { combineReducers } from "redux";
import posts from "./posts";
import auth from "./auth";
import message from "./message";
import modal from "./modal";
import modalSearch from "./modalSearch";

export default combineReducers({
    posts,
    auth,
    message,
    modal,
    modalSearch,
});