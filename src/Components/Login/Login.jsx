import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase.init";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";


const Login = () => {

    const [success ,setSuccess]=useState(false);

    const [loginError,setLoginError]=useState('')

    const emailRef = useRef();

    const handleLogin = event =>{
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        console.log(email,password);

        // reset status
        setSuccess(false);
        setLoginError('')

        // login user
        signInWithEmailAndPassword(auth,email,password)
        .then(result =>{
            console.log(result.user);
            
            if(!result.user.emailVerified){
                setLoginError('Please verify your Email');
            }
            else{
                setSuccess(true);
            }
        })
        .catch(error=>{
            console.log(error.message);
            setLoginError(error.message)
        });
        
    }

    const handleForgetPassword = ()=>{
        console.log(emailRef.current.value);
        const email = emailRef.current.value;
        setLoginError('');
        if(!email){
           setLoginError('Please provide e a valid email'); 
        }
        else{
            sendPasswordResetEmail(auth,email)
            .then(()=>{
                alert("reset email sent ,Please check your email")
            })
        }
    }

    return (
        <div className="hero bg-base-200 min-h-screen">
   <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <form className="card-body" onSubmit={handleLogin}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" placeholder="email" 
          name="email"
          ref={emailRef}
          className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" placeholder="password" 
          name="password"
          className="input input-bordered" required />
          <label onClick={handleForgetPassword} className="label">
            <p className="label-text-alt link link-hover">Forgot password?</p>
          </label>
          {
            success && <p className="text-green-700">User login successful</p>
          }
          {
            loginError && <p className="text-red-500">{loginError}</p>
          }
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Login</button>
        </div>
        <p>Don't have an account? Please <Link className="text-green-700 font-bold " to='/signUp'
        >SignUp</Link> </p>
      </form>
    </div>
</div>
    );
};

export default Login;