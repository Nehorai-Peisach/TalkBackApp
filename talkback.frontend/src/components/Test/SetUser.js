import { setCurrentUser } from "../State/CurrentUser";
import { useDispatch } from "react-redux";

const SetUser = () => {
    const dispatch = useDispatch();
    
    const handleChange = (event) => {
        debugger
        dispatch(setCurrentUser(event.target.value));
    }
    return <div>
        <input onChange={handleChange}/>
    </div>
}

export default SetUser;