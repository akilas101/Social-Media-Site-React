import React, {useState, useEffect} from 'react'
import {Link,NavLink} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {Button} from 'react-bootstrap'
import {deleteProfile, register, signin, verify_email} from '../actions/userActions'
import Cookie from 'js-cookie'


function SignIn(props){

    const [email_submit, setEmailSumbit]= useState('')
    const [password_submit, setPasswordSubmit]= useState('')
    const [uname, setUname]= useState('')
    const [repassword, setRepassword]= useState('')
    const [email_check, setEmailCheck]= useState('')
    const [password_check, setPasswordCheck]= useState('')
    const [error, setError] = useState('')
    const [submit_disable, setSubmitDisable] = useState(true)
    const [login_disable, setLoginDisable] = useState(true)

    
    const [email_login, setEmailLogin]=useState('')
    const [password_login, setPasswordLogin]=useState('')
    
    const userLoggedin = useSelector(state => state.userLoggedin)
    const userRegistered = useSelector(state => state.userRegistered)
    const verifyEmail = useSelector(state => state.verifyEmail)

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

    const checkLogin = () =>{
        if(email_login!=='' && password_login!=='')
        setLoginDisable(false)
    }

    const {  userInfo1, error1} = userLoggedin
    
    const {  userInfo2 } = userRegistered
     
    var { verified } = verifyEmail
    if (email_submit ==='') verified=''
    
    
    
    const dispatch = useDispatch()

    
    
    useEffect(()=>{
        dispatch(deleteProfile())
        if(userInfo2){
            Cookie.set('userLoggedin', JSON.stringify(userLoggedin))        
            dispatch(signin(email_submit, password_submit))
            props.history.push("/user/account_created")
        }
        
        
        return ()=>{}
    },[userInfo2])
    useEffect(()=>{
        
        if(userInfo1){
            props.history.push('/')
        }
        
        
        return ()=>{}
    },[userInfo1])

    const submitLoginHandeler = (e)=>{
        e.preventDefault()
        
        dispatch(signin(email_login, password_login))
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

    const submitRecoverHandeler= (e) =>{
       
    }

    const nullify =()=>{
        setError('')
        verified=''
    }
    return <div className="signin">
            { error ? 
            <div className="error-message">
                {error}
            </div>:<div className="error-message-none"></div>}

        <div className="signin-container">
            
            <div className="Left">
                <h4>Account Recovery</h4>
                <p style={{fontSize:"10px"}}>Insert the username and Email address your account is tagged with and we will send a confirmation message.</p>
                <form onSubmit={submitRecoverHandeler}>
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
                
                onFocus={nullify}
                />
                            
                </div>
               
                
                <Button type="submit" className="signup-button"  variant="success" onClick={(e)=>submitRecoverHandeler}>Submit</Button>
                </form>
            </div>
            
        </div>
    </div>

}

export default SignIn