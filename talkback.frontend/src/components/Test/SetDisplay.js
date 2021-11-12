import { useSelector } from "react-redux";

const SetDisplay = () => {
    const user = useSelector(state => state.currentUser);
    return <h2>Current User: {user}</h2>
}

export default SetDisplay;