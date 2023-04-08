import React, {useEffect, useState} from 'react'
import { Button } from 'react-bootstrap'
import { Route } from 'react-router-dom'
import { Link ,NavLink,Switch} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import { profile } from '../actions/userActions'
import ReactRoundedImage from "react-rounded-image";
import {Alert} from 'react-daisyui'
import Cookie from "js-cookie"
import Axios from 'axios'
import { json } from 'body-parser'
import { handleBreakpoints } from '@mui/system'
import './help.css'

function Help(){
    const dispatch = useDispatch()
    
    const userLoggedin = useSelector(state => state.userLoggedin)
    const {  userInfo1 } = userLoggedin
    
const[asking,setAsking] = useState(false)
const[answering,setAnswering]=useState(false)
const[commenting,setCommenting] = useState(false)
const[verification,setVerification] = useState(false)
const[profileEdit,setProfileEdit] = useState(false)
const[hobbies,setHobies] = useState(false)


    const [fileInputState, setFileInputState] = useState('');
    const [previewSource, setPreviewSource] = useState('');
    const [selectedFile, setSelectedFile] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [errMsg, setErrMsg] = useState('');


    ///sending image to backend

    


    
    // return <div className="account" style={{  backgroundColor: "#fff",
    //     border: "2px solid lightgray",
    //     borderRadius: "5px",
    //     borderBlockColor:"#007bff"}}>
    //         <div className="details-box">
    //             <div className="inside-details">
                    
    //                 <p >Hi <b style={{color:"chocolate"}}>{userInfo1.username.split(" ")[0]}</b>, your account has been created. Complete your profile below</p>
    //                 <div className="inside-second">
    //                     <div className="add-image">
    //                     <div>
    //                     {
    //                         ( image!="") ?<div>
    //                         {console.log(image)}
    //                         <ReactRoundedImage
    //                         image={imageRender}
    //                         imageWidth="120"
    //                         imageHeight="120"
    //                         roundedSize="0"
    //                         />
    //                         </div>
    //                         :<ReactRoundedImage
    //                         image="/images/User.jpg"
    //                         imageWidth="120"
    //                         imageHeight="120"
    //                         roundedSize="0"
    //                         />
                            
    //                 }
                    

    //                     </div>
                       
    //                     <div style={{marginTop:"10px"}}>
    //                     <input type='file' className="account-file-input" onChange={fileSelectedHandeler}/>
    //                     </div>
    //                     </div>
    //                     <div className="add-profile-description">
    //                         <label>Add Profile Description:</label>
    //                     <textarea type="text" 
    //                     className="middle-content-input" 
    //                     placeholder="Enter Details for you profile"
    //                     onChange={(e)=>setTextAreaValue(e.target.value)}
    //                     rows={2}
    //                     />
    //                     </div>
    //                     <div className="save-details">
    //                     <Button type="" variant="success" className="sp" onClick={send}>Save Profile Details</Button>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //         </div>
    // }
  
        return <div className="grid-container">
             <div className="hoe">
    <div className="hoepae">
             
                <div className="homepae" style={{maxWidth:"auto-resize",width:"100%",paddingLeft:"10%",paddingRight:"10%",backgroundColor:"white"}}>
            <img style={{maxWidth:"100%",height:"auto",width:"auto",paddingLeft:"10%",paddingRight:"10%"}}
            src="https://images.squarespace-cdn.com/content/v1/586c225b1b631b210f7c2ae2/1554861834022-Z4F1QSI21814R3WPAQ5B/Test+image+v1.png">
            </img>
            </div>
            <div className="help-title">
                Welcome to Feleg!
            </div>
            <div className="help-description">Feleg is a social question-and-answer website based in Addis Ababa, Ethiopia. It was founded in 2022, and made available to the public on July of 2022. Users can collaborate by editing questions and commenting on answers that have been submitted by verified professionals</div>
<div className="help-options">Topics to find information</div>
<div className="profile-navbar-help">
        <div onClick={()=>{
            setAnswering(false)
            setVerification(false)
            setCommenting(false)
            setAsking(false)
        setHobies(false)
        setProfileEdit(true)
    }}
         className="profile-navlinks navlinks-color">Profile</div>
        
        <div onClick={()=>{
            setAnswering(false)
            setVerification(false)
            setProfileEdit(false)
            setCommenting(false)
            setHobies(false)
            setAsking(true)}}
         className="profile-navlinks navlinks-color">
        Asking Questions</div>
        
        <div onClick={()=>{
           
            setVerification(false)
            setProfileEdit(false)
            setHobies(false)
            setCommenting(false)
            setAsking(false)
            setAnswering(true)}}
         className="profile-navlinks navlinks-color">
        Answering Questions
        </div>

        {/* <NavLink exact to ="" className="profile-navlinks navlinks-color">Shares</NavLink> */}
        {/* <NavLink exact to ={'/profile/'+Profile.username+'/followers'} className="profile-navlinks navlinks-color">Followers</NavLink>*/}
        <div onClick={()=>{
            setAnswering(false)
            setVerification(false)
            setProfileEdit(false)
            setHobies(false)
            setAsking(false)
            setCommenting(true)}}
         className="profile-navlinks navlinks-color">Commenting on Answers</div> 
            <div onClick={()=>{
            setAnswering(false)
            setVerification(false)
                    setHobies(false)
            setCommenting(false)
            setAsking(false)
            setProfileEdit(true)}}
         className="profile-navlinks navlinks-color">Profile Management</div> 

        <div onClick={()=>{
            setAnswering(false)
            setVerification(false)
            setProfileEdit(false)
            setCommenting(false)
            setAsking(false)
            setHobies(true)
        }
        }
         className="profile-navlinks navlinks-color">Interests and Fields</div> 
</div>
        <div>
       
            {asking?<div>asking</div>:null }
           {answering? <div>answering</div>:null}
           { commenting?<div>commenting</div>:null}
          { verification? <div>verifying</div>:null}
           {profileEdit?<div>Profile</div>:null}
           {hobbies?<div>hobbies</div>:null}
         
      
    </div>
            </div>
        </div>
        </div>


}

export default Help