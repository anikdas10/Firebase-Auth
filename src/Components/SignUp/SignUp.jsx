import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import auth from "../../firebase.init";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { BsEyeSlash } from "react-icons/bs";
import { Link } from "react-router-dom";

const SignUp = () => {
    const [success,setSuccess]=useState(false);

    const [userError,setUserError]=useState('');
    const [showPAssword,setShowPassword]=useState(false)
    const handleSignUp = event =>{
        event.preventDefault();
        const email =event.target.email.value;
        const password=event.target.password.value;
        const terms = event.target.terms.checked;
        // reset error message
        setUserError('');
        setSuccess(false);

        if(password.length <6){
            setUserError('Password should be 6 character or longer');
            return;
        }
        // password validate
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

        if(!passwordRegex.test(password)){
            setUserError('Password should be At least one uppercase , one lowercase,one digit one special character');
            return;
        }
        // terms chekced
        if(!terms){
          setUserError('Please accept our terms and conditions.');
          return;  
        }
        createUserWithEmailAndPassword(auth,email,password,terms)
        .then(result =>{
            console.log(result.user);
            setSuccess(true);

            // send verification code 
            sendEmailVerification(auth.currentUser)
            .then(()=>{
              console.log('verification email sent');
            })
        })
        .catch(error =>{
            console.log(error.message);
            setUserError(error.message);
            setSuccess(false);
        })
    }
    return (
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mx-auto my-8">
      <form className="card-body" onSubmit={handleSignUp}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" placeholder="email"
          name="email"
           className="input input-bordered" required />
        </div>
        <div className="form-control relative">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input 
          type={showPAssword?'text':"password" }
          placeholder="password" 
          name='password'
          className="input input-bordered" required />
          <button 
          onClick={()=>setShowPassword(!showPAssword)}
          className="btn btn-xs absolute right-4 top-12">
            {
                showPAssword?<BsEyeSlash></BsEyeSlash>:<FaEye></FaEye>
            }
          </button>
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
          {
            userError && <p className="text-red-500">{userError}</p>
          }
          {
            success && <p className="text-green-600">Sign Up successful</p>
          }
        </div>
        <div className="form-control">
        <label className="label justify-start gap-4 cursor-pointer">
             <input type="checkbox" 
             name="terms"
             className="checkbox" />
        <span className="label-text">Remember       me</span>
            
        </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Sign Up</button>
        </div>
        <p>Already have an account? Please <Link className="text-green-600 font-bold" to='/login'>Login</Link> </p>
      </form>

    </div>
    );
};

export default SignUp;