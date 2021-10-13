import { createStore } from "redux";
import { rootreducer } from "./AppState";

const configureStore = () => {
    return createStore(rootreducer, {})
}
export default configureStore