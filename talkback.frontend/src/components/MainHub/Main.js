import Style from './Style.css'
import SignIn from './SignIn'
import SignUp from './SignUp'
import Slider from './Slider'

const Main = ({ loginUser })=>{


    return <div className='container'>
        <SignIn loginUser={loginUser}></SignIn>
        <SignUp></SignUp>
        <Slider></Slider>
    </div>
}

export default Main;