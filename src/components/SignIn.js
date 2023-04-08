import React, {useState, useEffect} from 'react'
import {Link,NavLink} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {Button} from 'react-bootstrap'
import {deleteProfile,replaceUser, register, signin, verify_email} from '../actions/userActions'
import Cookie from 'js-cookie'
import { LoaderDots } from '@thumbtack/thumbprint-react'
import Spinner from 'react-bootstrap/Spinner';
import Axios  from 'axios'


function SignIn(props){

    const [email_submit, setEmailSumbit]= useState('')
    const [password_submit, setPasswordSubmit]= useState('')
    const [uname, setUname]= useState('')
    const [repassword, setRepassword]= useState('')
    const [email_check, setEmailCheck]= useState('')
    const [password_check, setPasswordCheck]= useState('')
    const [error, setError] = useState('')
    const [submit_disable, setSubmitDisable] = useState(true)
    // const [login_disable, setLoginDisable] = useState(true)
const [loading,setLoading] = useState(false)

const [loadingS,setLoadingS] = useState(false)
    
    const [email_login, setEmailLogin]=useState('')
    const [password_login, setPasswordLogin]=useState('')
    
    // const userLoggedin = useSelector(state => state.userLoggedin)
    const userRegistered = useSelector(state => state.userRegistered)
    const verifyEmail = useSelector(state => state.verifyEmail)
    const userLoggedin = useSelector(state => state.userLoggedin)
    // let {  loading, userLoggedin} = userLoggedinc
    if(userLoggedin){ Cookie.set('userLoggedin', JSON.stringify(userLoggedin))
    
    if(userLoggedin.error1)  Cookie.remove('userLoggedin')
    }
    
    const checkPassword =()=>{
        if(password_submit !== repassword)
        setError("Your password didnt match")
        
        checkSubmit()

    }

    const checkSubmit=()=>{
        if(uname!=='' && email_submit!=='' && password_submit===repassword && password_check!==''  && password_check===true && email_check===true)
        setSubmitDisable(false)   
    }

    // const checkLogin = () =>{
    //     if(email_login!=='' && password_login!=='')
    //     setLoginDisable(false)
    // }

    const {  userInfo1, error1} = userLoggedin
    
    const {  userInfo2 } = userRegistered
     
    var { verified } = verifyEmail
    if (email_submit ==='') verified=''
    
    
    
    const dispatch = useDispatch()

    
    
    useEffect(()=>{
        dispatch(replaceUser())
        if(userInfo2){
            Cookie.set('userLoggedin', JSON.stringify(userLoggedin))        
            dispatch(signin(email_submit, password_submit))
            
            props.history.push("/user/account_created")
        }
        
        
        return ()=>{}
    },[userInfo2])


    useEffect(()=>{
   
        if(userInfo1?.status==='ADMIN'){
            setLoading(false)
            props.history.push('/feleg/dashboard/')
        }     
        
       else if(userInfo1?.status==='PRO'){
            setLoading(false)
            // alert(r.data)
            props.history.push('/')
        }   
        else if(userInfo1?.status==='TEAM'){
            setLoading(false)
            props.history.push('/feleg/dashboard')
        } 
        else if(userInfo1?.status==='regular'){
            setLoading(false)
            props.history.push('/')
        } 
        return ()=>{}
    },[userInfo1])

    const submitLoginHandeler = (e)=>{
        e.preventDefault()
        // alert('ddd')
        setLoading(true)
        dispatch(signin(email_login, password_login))
        // setLoginDisable(true)
        // setSubmitDisable(true)
        

        // setLoading(false)
    }
    function ValidateEmail() 
        {   
            if(email_submit.length!==0){
            if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email_submit))
                {
                    setEmailCheck(true)
                    dispatch(verify_email(email_submit))
                }
            else{    
                setError('Please use a valid email address')
        }}}




        
    function ValidatePassword() 
        { 
            var paswd=  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
            if(password_submit.length!==0){
            if(password_submit.match(paswd)){setPasswordCheck(true)}
            else return setError(' Your password should contain characters 7 to 15, at least one numeric digit and a special character');
        }}

    const submitRegisterHandeler= (e) =>{
        e.preventDefault()
     setLoadingS(true)

           
        dispatch(register(uname, email_submit, password_submit))
        setLoadingS(false)
    }

    const nullify =()=>{
        setError('')
        verified=''
    }
    return<div className="signin-back"> 
    <div className="signin">
           

        <div className="signin-container">
        { error ? 
            <div className="error-message">
                {error}
            </div>:<div className="error-message-none"></div>}
            {
           <div className="left-right"> <div className="Left">
                <h4><b>Sign Up</b></h4>
                <form onSubmit={submitRegisterHandeler}>
                <div className="input-box">
                
                <input placeholder="Username" className="input-signin"
                name="uname"
                type="text"
                id="uname"
                onChange={(e)=>setUname(e.target.value)}
                onBlur={checkSubmit}
                />
                </div>  
                <div className="input-box">
                
                <input placeholder="Email" 
                className="input-signin"
                name="email"
                type="email"
                id="registeremail"
                onChange={(e)=>setEmailSumbit(e.target.value)}
                onBlur={ValidateEmail}
                onFocus={nullify}
                />
                {  (verified) ? <div  className="form-error-message">{verified.errormessage}</div>: <div></div>}                
                </div>
                <div className="input-box">
                
                <input placeholder="Password" 
                className="input-signin"
                name="password"
                type="password"
                id="registerpassword"
                onChange={(e)=>setPasswordSubmit(e.target.value)}
                onBlur={ValidatePassword}
                onFocus={nullify}
                />
                </div>
                <div className="input-box">
                
                
                <input placeholder="Re-Enter Password"
                className="input-signin" 
                name="repassword"
                type="password"
                id="repassword"
                onChange={(e)=>setRepassword(e.target.value)}
                onBlur={checkPassword}
                onFocus={nullify}
                />
              
                </div>
                <button type="submit" className="signup-button"  onClick={(e)=>submitRegisterHandeler}>{loadingS? <Spinner animation="border" role="status" size='sm'>
   
    </Spinner>:<div>Submit</div>}</button>
                </form>
            </div>
            
            
            <div className="Right">
            <h4><b>Login</b></h4>
            <form onSubmit={submitLoginHandeler}>
            <input placeholder="Email" className="input-signin"
            name="email"
            value={email_login}
            type="email"
            id="loginemail"
            onChange={(e)=>setEmailLogin(e.target.value)
            }
            />
            <input placeholder="Password" className="input-signin"
                name="password"
                value={password_login}
                type="password"
                id="loginpassword"
                onChange={(e)=>setPasswordLogin(e.target.value)}
                              
            />
            <NavLink exact to="/recovery"  className=""
        style={{marginLeft:"40px"}}>
        <div className="following" style={{color:"white"}}>
       
        Forgot Password?
        
        </div>
        </NavLink>
            <div className="login-button">
            <button type="submit" className='signup-button'>{loading?<div><LoaderDots size="small"/></div>:<div>Login</div>}</button>
            </div>
            {error1? 
                <div className="form-error-message">Please try to login with a valid Email ID or Password</div>
                :null
            }
            
            </form>
            </div>
            </div>}</div>
    </div></div>

}

export default SignIn