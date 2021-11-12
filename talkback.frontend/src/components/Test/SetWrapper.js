import { useState } from "react";
import SetUser from "./SetUser";
import SetDisplay from "./SetDisplay";

const SetWrapper = () => {
    return <div>
        <SetDisplay/>
        <SetUser/>
    </div>
}

export default SetWrapper;