import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faWifi,faCheck,faPlus } from '@fortawesome/free-solid-svg-icons'
import { faPencilAlt, faCaretUp, faCaretDown,  faShare,faCircleArrowUp,faArrowUp ,faAngleUp, faAngleDown,faTrashAlt, faTh  } from '@fortawesome/free-solid-svg-icons'
import {LikeOutlined, LikeFilled } from '@ant-design/icons'
import './FollowButton.css'
import ReactTooltip from 'react-tooltip'
import Axios from 'axios'
import { useSelector,useDispatch } from 'react-redux'

import { upvoteQuestion,unUpvoteQuestion} from '../../actions/questionActions'

// import { SaveAltRounded } from '@material-ui/icons'
// Importing toastify module
import {toast} from 'react-toastify';
 
// Import toastify css file
import 'react-toastify/dist/ReactToastify.css';
 
 // toast-configuration method,
 // it is compulsory method.
toast.configure()

function Upvote(props) {
    var  UP= <FontAwesomeIcon  icon={faArrowUp}  />
    var Filled= <FontAwesomeIcon icon={faArrowUp} />
    // console.log(props)
    
    const [isUp, setIsUp] = useState(false)
    const [length, setLength] = useState('')
    
    const dispatch = useDispatch()
    const userLoggedin = useSelector(state => state.userLoggedin)
    const {  userInfo1 } = userLoggedin
    const question_Downvote = useSelector(state=>state.questionDownvote)
const {qdownvot} = question_Downvote


    console.log(userInfo1?.id)

    const handleNonLoggedin = ()=>{
        toast.warning('Please login to vote', {
            // Set to 15sec
            position: toast.POSITION.TOP_CENTER, autoClose:1000})
    }


    const handleChange=(e)=>{

        if(isUp){

            dispatch(unUpvoteQuestion(props?.id,userInfo1?.id))
        
               setIsUp(false)
               setLength(length-1)
        }
        else{ 
            dispatch(upvoteQuestion(props?.id,userInfo1?.id))
           setLength(length+1)
        setIsUp(true)
         
   }


            
        }
    



    useEffect(() => {



        // console.log("from Upvote"+props.id)

        let url="/api/questions/upvoted/question";
               
        let svar = {}
        svar.question=props.id
        svar.user=userInfo1?.id
        Axios.post(url,svar,{
                headers: {
                    Authorization: userInfo1?.token
                }
            })
            .then((response)=>{
                // console.log(" from upvotecheck"+response.data.up)
                if(response.data.up){
                    setIsUp(true)
                    props.sul(true)
                                   }    
                else{
                    setIsUp(false)
                    props.sul(false)
         
                }
              
        }).catch((err)=>{console.log(err)})  
        Axios.post("/api/questions/votes/Tupvotes",svar)
        .then((result)=>{
            setLength(result.data.length)
        }).catch((err)=>{console.log(err)})
  
        
        if(props.sul===true){
            setIsUp(true)
        }
        if(props.sul===false){
            setIsUp(false)
        }
    }
    
    
    
    
    
    ,[])

    useEffect(() => {


if(qdownvot){
        // console.log("from Upvote"+props.id)

        let url="/api/questions/upvoted/question";
               
        let svar = {}
        svar.question=props.id
        svar.user=userInfo1?.id
        Axios.post(url,svar,{
                headers: {
                    Authorization: userInfo1?.token
                }
            })
            .then((response)=>{
                // console.log(" from upvotecheck"+response.data.up)
                if(response.data.up){
                    setIsUp(true)
                    props.sul(true)
                                   }    
                else{
                    setIsUp(false)
                    props.sul(false)
         
                }
              
        }).catch((err)=>{console.log(err)})  
        Axios.post("/api/questions/votes/Tupvotes",svar)
        .then((result)=>{
            setLength(result.data.length)
        }).catch((err)=>{console.log(err)})
  
        
        if(props.sul===true){
            setIsUp(true)
        }
        if(props.sul===false){
            setIsUp(false)
        }
    }
    
    
    
    }
    
    ,[question_Downvote])  

      
        
    
    return( 
        <div>
        <div className="upvote">
        <div data-tip data-for="upTip" >
        {
            (isUp)?
            <div className="follow-button-success" onClick={(e)=>{userInfo1?handleChange(e):handleNonLoggedin(e)}}>
            <p>{Filled}</p> 
           
            <p className="follow-button-separator">.</p>
            <p className="follow-button-number">{length}</p>
            </div>:
            <div className="follow-button-fail" onClick={(e)=>{userInfo1?handleChange(e):handleNonLoggedin(e)}}>
              <p>{UP}</p> 
            <p className="follow-button-number">{length}</p>
            </div>
        }
        
        </div>
            
            <ReactTooltip id="upTip" place="top" effect="solid">
                Upvote
            </ReactTooltip>
        </div>
        </div>
    )
}

export default Upvote
