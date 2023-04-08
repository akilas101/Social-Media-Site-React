
import "./css/WidgetContent.css";
import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { profile, profile_details } from '../actions/userActions'
import {Theme,Button} from 'react-daisyui'
import Axios from 'axios'
import {Link,NavLink} from 'react-router-dom'
import TermsAndConditionsModal from './TermsAndConditions'
import Terms from "./TermsAndConditions";


const WidgetContent = (props) => {
    
    const dispatch = useDispatch()
    const [date, setDate] = useState('')
const [length,setLength] = useState('')  
const[lengthA,setLengthA]=useState('')

    const userLoggedin = useSelector(state=>state.userLoggedin)
    const p_d = useSelector(state=>state.userProfile)

    
    const [isOpen, setisOpen] = useState(false)
    const {userInfo1} = userLoggedin
     
const Terms =()=>{
  setisOpen(true)
}


    const Profile = (id) =>{
    
      dispatch(profile(id))
    }

 
  return (
    <div className=" widget__contents" >
      <div className="widget__content">
      {/* <NavLink exact to ="/"> 
       <div
        //feleg logo
        style={{marginTop:"10px",fontSize:"9px"}}
          // src="/images/akilas.jpg"
          // alt="/images/akilas.jpg"
        >ፈለግ</div>
        </NavLink> */}
        <div className="widget__contentTitle">
          {/* <h5>{props.interest.name}</h5> */}
          <Theme dataTheme="dark">
          {/* <h5>{props.interest.questions} questions asked</h5> */}
          <div  style={{color:'#007bff',fontSize:"12px"}}>
         <div> {userInfo1? <NavLink exact to ="/logout" className="l" style={{marginLeft:"4px"}}
        >
      
          Logout -
     
        </NavLink>:<NavLink exact to ="/signin" className="l" style={{marginLeft:"4px"}}
        >
      
          Signin -
     
        </NavLink>}
         { <NavLink exact to ="/AboutUs" className="l" style={{marginLeft:"4px"}}
        >
   
          AboutFeleg - 
      
        </NavLink>}
          { <NavLink exact to ="/Feleg/help" className="l" style={{marginLeft:"4px"}}
        >
   
          Help -
      
        </NavLink>} { userInfo1?<NavLink exact to ={"/profile/"+userInfo1.username} className="l" style={{marginLeft:"4px"}}
        >
   
          Profile -
      
        </NavLink>:null}   { userInfo1?<NavLink exact to ={"/settings/"+userInfo1.username}  className="l" style={{marginLeft:"4px"}}
        >
   
          Settings -
      
        </NavLink>:null}
    { <div>
     <div  onClick={()=>Terms()} > Terms and Conditions</div>
          <TermsAndConditionsModal open={isOpen} onClose={()=> setisOpen(false)}/>
         </div>}
         </div>
        </div>


     
      </Theme>
        </div>
      </div>
    </div>
  );
}

export default WidgetContent;
