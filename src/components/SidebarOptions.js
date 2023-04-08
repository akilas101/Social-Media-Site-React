// import { Add } from "@material-ui/icons";
import React from "react";
import "./css/SidebarOptions.css";
import {Link,NavLink} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { profile, profile_details } from '../actions/userActions'
import {Theme,Button} from 'react-daisyui'
function SidebarOptions(props) {

  
  const dispatch = useDispatch()
  const [date, setDate] = useState('')



  const userLoggedin = useSelector(state=>state.userLoggedin)
  const p_d = useSelector(state=>state.userProfile)

  
  const {userInfo1} = userLoggedin
   
  const Profile = (id) =>{
  
    dispatch(profile(id))
  }

  

  return (
    <div className="sidebarOptions">
      <div className="sidebarOption">
     <div style={{display:''}}>
         <NavLink exact to ={"/SelectedQuestions/"+props.question._id}
                    target="_blank" >
                     <div className="sidebar-quests" style={{marginBottom:"0rem"}}>{props?.question?.question}   <div style={{fontSize:"10px",color:"grey"}}> {props?.question?.upvotes} Upvotes</div>
                   </div>  
        
                    </NavLink>
                    
                    </div>
                    <p  className="up" style={{right: "2.2%",
    position:"absolute",fontSize:"10px"}}></p>
      </div>
    </div>
  );
}

export default SidebarOptions;
