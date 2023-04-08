import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faWifi,faCheck,faPlus } from '@fortawesome/free-solid-svg-icons'
import './FollowButton.css'
import Axios from 'axios'
import { useSelector } from 'react-redux'
// import { SaveAltRounded } from '@material-ui/icons'

function ADDButton(props) {
    var wifi = <FontAwesomeIcon icon={faCheck} />
    var addd= <FontAwesomeIcon icon={faPlus} />
    //console.log(props)
    
    const [isFollowing, setIsFollowing] = useState(false)
    const [length, setLength] = useState('')
    

    const userLoggedin = useSelector(state => state.userLoggedin)
    const {  userInfo1 } = userLoggedin


    const handleChange=(e)=>{

        if(isFollowing){
        
        let url= "/api/following/unfollow_request"
        let variables={
            interestTo:props.id,
            
        }    
        Axios.post(url,variables,{
            headers:{
                Authorization:userInfo1.token
            }
        }).then((response)=>{
            if(response.data.success){
                setLength(length+1)
                setIsFollowing(true)
            }
        })

    }
        else{
        let url= "/api/following/request"
        let variables={
            interestTo:props.id,
            
        }
        Axios.post(url,variables,{
            headers:{
                Authorization:userInfo1.token
            }
        }).then((response)=>{
            if(response.data.success){
                setLength(length+1)
                setIsFollowing(true)
            }
        }).catch(err=>{console.log(err + "from follow handler")})}


            
        }
    



    useEffect(() => {



        console.log("from add interest"+props.id)

        let url="/api/following/followed/interest";
               
        let svar = {}
        svar.interestTo=props.id
        Axios.post(url,svar,{
                headers: {
                    Authorization: userInfo1.token
                }
            })
            .then((response)=>{
                if(response.data.followed){
                    setIsFollowing(true)
                    Axios.post("/api/following/followers",svar)
                    .then((result)=>{
                        setLength(result.data.length)
                    }).catch((err)=>{console.log(err)})
                }    
                else{
                    setIsFollowing(false)
                    Axios.post("/api/following/followers",svar)
                    .then((result)=>{
                        setLength(result.data.length)
                    }).catch((err)=>{console.log(err)})
                }
        }).catch((err)=>{console.log(err)})  
    })

       

      
        
    
    return( 
        <div>
        <div className="follow-button">
        
        {
            (isFollowing)?
            <div className="follow-button-success" onClick={(e)=>{handleChange(e)}}>
            <p>{wifi}</p> 
            <p className="follow-button-text">Following</p>
            <p className="follow-button-separator">.</p>
            <p className="follow-button-number">{length}</p>
            </div>:
            <div className="follow-button-fail" onClick={(e)=>{handleChange(e)}}>
            
            <p>{addd}</p> 
            <p className="follow-button-text-fail">Follow</p>
            </div>
        }
        
        </div>
        </div>
    )
}

export default ADDButton
