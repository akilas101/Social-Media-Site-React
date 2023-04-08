import React, { useEffect, useState } from 'react'
import {NavLink} from 'react-router-dom'
import {BrowserRouter,Switch, Route} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Cookie from 'js-cookie'
import { listQuestionsUser } from '../../actions/questionActions'
import { Link } from 'react-router-dom' 
import { LoaderDots } from '@thumbtack/thumbprint-react'
import ProfileQuestions from '../Profile/Questions/ProfileQuestions'
import ProfileAnswers from '../Profile/Answers/ProfileAnswers'
import {  faTrashAlt  } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ReactTooltip from 'react-tooltip'
import EditDescriptionModal from '../modals/EditDescription'
import FollowButton from '../follow/FollowButton'
import Axios from 'axios'
import ProfileActivities from '../Profile/Activities/ProfileActivities'
import Following from '../following/Following'
import Followers from '../following/Following'
import ReactRoundedImage from "react-rounded-image"
import HomeScreen from '../HomeScreen/HomeScreen'
import Avatar from 'react-daisyui'
import '../../index.css'
import Verify from '../Profile/Verify/verify'
import Petition from '../Profile/Verify/Petition'
import {deleteProfile, register, signin, verify_email} from '../../actions/userActions'




function Settings(props){
   
  
    const [Profile, setProfile] = useState('')
    const [loading, setLoading] = useState(true)
     
    const dispatch = useDispatch()
        
    useEffect(() => {
        
        Axios.get('/api/profile/'+props.match.params.username)
        .then((res)=>{
            //if(res.status===404){
              
            setProfile(res.data)
            setLoading(false)
            console.log(Profile._id+"from Settings")
        })
        .catch((err)=>      
      console.log(err+"error fetching profile"))
    }
,[]
    )


    const userLoggedin = useSelector(state => state.userLoggedin)
    const {  userInfo1 } = userLoggedin
    

const handleTerminate =  (e)=>{
    dispatch(deleteProfile())
    props.history.push('/')
}
    
    return  loading ? <div className="profile-main">
        <div className="profile">
    <div className="profile-headline">
        <div className="loaders"><LoaderDots size="small"/>
    </div></div></div></div>: 
     (Profile)? <div className="profile-main">
     <div className="profile">
     <div className="profile-headline">
    
    <div className="headline-details">
        <div>
        <p className="profile-name">{Profile.username}</p>
        </div>
        
            <div className="details-description">
            {Profile.description}
            </div>
            
        
        {(userInfo1 && (userInfo1.id===Profile._id))? 
        <div className="headline-details-links">
       
       
       
        <NavLink to={'/Profile/EditProfile/'+Profile._id} className="headline-link" data-tip data-for="profileEditTip" >
        <div style={{color:"rgb(0, 123, 255)"}}> Edit your profile</div>
      
        </NavLink>
        <ReactTooltip id="profileEditTip" place="top" effect="float">
                Edit Your Profile
            </ReactTooltip>



            <div
           onClick={ (e)=>{handleTerminate(e)}}
            data-tip data-for="profileDeleteTip" 
            className="delete-profile-link ">
               <div style={{color:"brown"}}> Terminate Profile</div>
            </div>
            <ReactTooltip id="profileDeleteTip" place="top" effect="float">
                Delete Your Profile
            </ReactTooltip>
            
        </div>:
        <div></div>
    }
    </div>
    </div>
    
   
   
    <div className="setting-specs" >
       <div></div>
        <div className="profile-navbar">
      
        
        <NavLink exact to ={'/settings/verify'+Profile._id} 
        className=" profile-navlinks navlinks-color">
        Verify as Professional</NavLink>
        
        <NavLink to ={'/profile/petition'+Profile._id} 
        className=" profile-navlinks navlinks-color">
            Send Petition
        </NavLink>
     
        
        

        {/* <NavLink exact to ="" className="profile-navlinks navlinks-color">Shares</NavLink> */}
        {/* <NavLink exact to ={'/profile/'+Profile.username+'/followers'} className="profile-navlinks navlinks-color">Followers</NavLink>
        <NavLink exact to ={'/profile/'+Profile.username+'/following'} className="profile-navlinks navlinks-color">Following</NavLink> */}
        </div>
    </div>
    <div>
        <Switch>
            <Route path={'/settings/verify'+Profile._id}
             render={()=><Verify profile_id={Profile._id}/>}/>
          
            <Route path={'/profile/petition'+Profile._id} 
            render={()=><Petition profile_id={Profile._id}/>}/>

            <Route path={'/profile/questions'+Profile._id} 
            render={()=><ProfileQuestions profile_id={Profile._id}/>}/>

            <Route path={'/profile/answers'+Profile._id} 
            render={()=><ProfileAnswers profile_id={Profile._id}/>}/>
            
            <Route path={'/profile/'+Profile.username}
             render={()=><ProfileActivities profile_id={Profile._id}/>}/>
        </Switch>
    </div>
    </div>
    </div>:
            <div className="profile-main">
    <div className="profile">
     <div className="profile-headline">
  
     </div></div>
            </div>
   
   
    }
    
  
  export default Settings