import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { profile } from '../../actions/userActions'
import FollowButton from './FollowButton'
import AddInterest from './AddInterest'
import './FollowContent.css'
import ReactRoundedImage from "react-rounded-image"

function FollowContent(props) {
    console.log(props)

    const dispatch = useDispatch()
    const Profile = (id) =>{
      
        dispatch(profile(id))
      }

    const userLoggedin = useSelector(state => state.userLoggedin)
    const {userInfo1} = userLoggedin  
    if(props.condition==="following"){  
    return (<div style={{
        borderBottom:"2px solid #dee3e0", 
        display:"flex",
        width:"95%"
    }}>
        <div className="follow-page-content">
        <div className="follow-user-details">

            <div>   
                <ReactRoundedImage
           
            imageWidth="32"
            imageHeight="32"
            roundedSize="0"
            /></div>    
            
        <div className="follow-profile-name">
        {/* <Link to={'/profile/'+props.element.interestTo.name} */}
        {/* // onClick={(e)=>{Profile(props.element.userTo._id)}} */}
        {/* className="follow-links"> */}
        {props.element.interestTo.name}
        {/* </Link>,   */}
        {/* <span className="details-description-follow">{props.element.userTo.description}</span> */}
        </div></div>
        </div>
        {

        }
        <div className="button">
        <AddInterest
            
            id={props.element.interestTo._id}
            />
        </div>
        </div>
        
    )}
  
  
    if(props.condition==="followers"){
        return (<div style={{
            borderBottom:"2px solid #dee3e0", 
            display:"flex",
            width:"95%"
        }}>        
            <div className="follow-page-content">
            <div className="follow-user-details">
                <div><ReactRoundedImage
                image={props.element.userFrom.profilepic}
                imageWidth="32"
                imageHeight="32"
                roundedSize="0"
                /></div>    
                
            <div className="follow-profile-name">
            <Link to={'/profile/'+props.element.userFrom.username}
            onClick={(e)=>{Profile(props.element.userFrom._id)}}
            className="follow-links">
            {props.element.userFrom.username}
            </Link>,  
            <span className="details-description-follow">{props.element.userFrom.description}</span>
            </div></div>
            </div>
            {
                ((userInfo1&&userInfo1.id!==props.element.userFrom._id)) &&
                <div className="button">
                <FollowButton
                    type="user"
                    id={props.element.userFrom._id}
                    />
                </div>
                
            }
            </div> 
            
        )
    }
}

export default FollowContent
