import React, { useEffect, useState } from 'react'
import {NavLink} from 'react-router-dom'
import {BrowserRouter,Switch, Route} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Cookie from 'js-cookie'
import { listQuestionsUser } from '../../actions/questionActions'
import { Link } from 'react-router-dom' 
import { LoaderDots } from '@thumbtack/thumbprint-react'
import ProfileQuestions from './Questions/ProfileQuestions'
import ProfileAnswers from './Answers/ProfileAnswers'
import {  faTrashAlt  } from '@fortawesome/free-solid-svg-icons'
// import {faUserPen} from '@fontawesome/free-solid-svg-icons'


import { LineChartOutlined  } from "@ant-design/icons";
import { SettingOutlined } from "@ant-design/icons";

import { UserSwitchOutlined } from "@ant-design/icons";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ReactTooltip from 'react-tooltip'
import EditDescriptionModal from '../modals/EditDescription'
import FollowButton from '../follow/FollowButton'
import Axios from 'axios'
import ProfileActivities from './Activities/ProfileActivities'
import Following from './Following/Following'
import Followers from './Followers/Follwers'
import ReactRoundedImage from "react-rounded-image"
import HomeScreen from '../HomeScreen/HomeScreen'
import Avatar from '@mui/material/Avatar';
import { Audio,Rings,TailSpin } from  'react-loader-spinner'

// import Avatar from 'react-daisyui'

import { Image } from 'cloudinary-react';


import Settings from '@mui/icons-material/Settings';

function Profile(props){
    
    var trash = <FontAwesomeIcon icon ={faTrashAlt}/>
    var editUser = <FontAwesomeIcon icon="fa-solid fa-user-pen" />
    
    const [editDescriptionOpen, setEditDescriptionOpen] = useState(false)
    const [textValue, setTextValue] = useState('')
    const [followers, setFollowers] = useState('')
    const [Profile, setProfile] = useState('')
    const [loading, setLoading] = useState(true)
    
    // const userProfile = useSelector(state => state.userProfile)
    // const { loading,Profile,error } = userProfile
    // if(userProfile) {
    //     sessionStorage.setItem('userProfile', JSON.stringify(userProfile))
        
    // }
    
    const dispatch = useDispatch()
    
    
    const [imageIds, setImageIds] = useState([]);


useEffect(() => {

  loadImages();
},[]);

const loadImages = async () => {
  try {
      const res = await Axios.get('/api/profile/propics/'+userInfo1?.id)
     .then((res)=>{ console.log(res.data)
      setImageIds(res.data)})
     
  } catch (err) {
      console.error(err);
  }
};

    const questions=(id)=>{
        dispatch(listQuestionsUser(id))
    } 

    
    useEffect(() => {
        userInfo1.username?
        Axios.get('/api/profile/'+userInfo1.username)
        .then((res)=>{
            //if(res.status===404){
              
            setProfile(res.data)
    setLoading(false)
        })
        .catch((err)=>      
      console.log(err+"error fetching profile")
        ):     Axios.get('/api/profile/'+props.match.params.username)
        .then((res)=>{
            //if(res.status===404){
              
            setProfile(res.data)
    setLoading(false)
        })
        .catch((err)=>      
      console.log(err+"error fetching profile"))
    
      

        if(Profile){
        Axios.post("/api/following/followers",{userTo:Profile._id, type:"user"})
        .then((response)=>{
            setFollowers(response.data)
        })
    }
//     else{
      
//     //   return  <BrowserRouter>
//     //   <Route exact path="/" component={HomeScreen}/></BrowserRouter> 

//  }
 })

    const userLoggedin = useSelector(state => state.userLoggedin)
    const {  userInfo1 } = userLoggedin
    
    
    return  loading ? <div className="p-main"><div className="profile-main">
        <div className="profile">
    <div className="profile-headline">
    <div style={{paddingTop:"80px",paddingLeft:"50%"}}><TailSpin color="#00BFFF" height={30} width={30} /></div>
    </div></div></div></div>: 
     (Profile)?<div className="p-main"> <div className="profile-main">
     <div className="profile">
     <div className="profile-headline">
     <div style={{marginTop:"20px"}}  data-tip data-for="profilePicTip" className="profile-changepic"> 
     <NavLink exact to={"/profilePic"} >  <Avatar      style={{width: "70px",
    height: "70px"}}> {imageIds &&
              imageIds.map((imageId, index) => (
                  <Image
                      key={index}
                      cloudName='feleg'
                      publicId={imageId}
                      width="72"
                      crop="scale"
                  />
              ))}</Avatar></NavLink>
                    <ReactTooltip id="profilePicTip" place="top" effect="solid">
               Change Profile Picture
            </ReactTooltip>
    </div>
    <div className="headline-details">
        <div>
        <p className="profile-name">{Profile.username}</p>
        </div>
        
            <div className="details-description-profile2" >
            {Profile.description}
            </div>
            
        
        {(userInfo1 && (userInfo1.id===Profile._id))? 
        <div className="headline-details-links">
        <NavLink exact to={"/EditProfile/"+userInfo1.username}  data-tip data-for="profileEditTip"  className="red link extra-link" style={{color:"#007bff"}}>
            <div className="edit-profile-text">
            <UserSwitchOutlined />
            </div>
            </NavLink>
            <ReactTooltip id="profileEditTip" place="top" effect="solid">
                Edit Profile Details
            </ReactTooltip>
         
            <NavLink exact to={"/settings/"+Profile.username}  data-tip data-for="profileDeleteTip"  className="delete-profile-link headline-link" style={{color:"#007bff"}}>
            <div className="">
            <SettingOutlined />

            </div>
            </NavLink>
            <ReactTooltip id="profileDeleteTip" place="top" effect="solid">
                Settings
            </ReactTooltip>
        </div>:
        <div></div>
    }
    </div>
    </div>
    
   
   
    <div className="profile-details" >

        <div className="profile-navbar">
        <NavLink exact to ={'/profile/'+Profile.username}
         className="profile-navlinks navlinks-color">Profile</NavLink>
        
        <NavLink to ={'/profile/answers/'+Profile._id} 
        className=" profile-navlinks navlinks-color">
        Answers</NavLink>
        
        <NavLink to ={'/profile/questions/'+Profile._id} 
        className="profile-navlinks navlinks-color"
        onClick={(e)=>{questions(Profile._id)}}>
        Questions
        </NavLink>

        {/* <NavLink exact to ="" className="profile-navlinks navlinks-color">Shares</NavLink> */}
        {/* <NavLink exact to ={'/profile/'+Profile.username+'/followers'} className="profile-navlinks navlinks-color">Followers</NavLink>*/}
        <NavLink exact to ={'/profile/following/'+Profile._id} className="profile-navlinks navlinks-color">Following</NavLink> 
        </div>
    </div>
    {/* <div className='p-stat'> */}
        <div>
        <Switch>
            {/* <Route path={'/profile/'+Profile.username+'/followers'}
             render={()=><Followers profile_id={Profile._id}/>}/>*/}
          
            <Route path={'/profile/following/'+Profile._id} 
            render={()=><Following profile_id={Profile._id}/>}/> 

            <Route path={'/profile/questions/'+Profile._id} 
            render={()=><ProfileQuestions profile_id={Profile._id}/>}/>

            <Route path={'/profile/answers/'+Profile._id} 
            render={()=><ProfileAnswers profile_id={Profile._id}/>}/>
            
            <Route path={'/profile/'+Profile.username}
             render={()=><ProfileActivities profile_id={Profile._id}/>}/>
        </Switch>
        {/* </div> */}
    </div>
    </div>
    </div></div>    :
            <div className="profile-main">
    <div className="profile">
     <div className="profile-headline">
  
     </div></div>
            </div>
   
   
    }
  


export default Profile