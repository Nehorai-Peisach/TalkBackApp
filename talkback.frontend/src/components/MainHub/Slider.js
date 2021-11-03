const Slider = ( {signInButton,signInClick,signUpButton,signUpClick}) => {

return <div class="overlay-container">
    <div class="overlay">
        <div class="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>To keep connected with us please login with your personal info</p>
            <button class="ghost" id="signIn" ref={signInButton} onClick={signInClick}>Sign In</button>
        </div>
        <div class="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start journey with us</p>
            <button class="ghost" id="signUp" ref={signUpButton} onClick={signUpClick}>Sign Up</button>
        </div>
    </div>
</div>
}

export default Slider;