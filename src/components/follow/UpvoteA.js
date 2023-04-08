import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faWifi,faCheck,faPlus } from '@fortawesome/free-solid-svg-icons'
import { faPencilAlt, faCaretUp, faCaretDown,  faShare,faCircleArrowUp,faArrowUp ,faAngleUp, faAngleDown,faTrashAlt, faTh  } from '@fortawesome/free-solid-svg-icons'
import {LikeOutlined, LikeFilled } from '@ant-design/icons'
import './FollowButton.css'
import ReactTooltip from 'react-tooltip'
import Axios from 'axios'
import { upvoteAnswer,unUpvoteAnswer } from '../../actions/answerActions'

// import { useSelector } from 'react-redux'
import {useDispatch, useSelector} from 'react-redux'

// import { SaveAltRounded } from '@material-ui/icons'

// Importing toastify module
import {toast} from 'react-toastify';
 
// Import toastify css file
import 'react-toastify/dist/ReactToastify.css';
 
 // toast-configuration method,
 // it is compulsory method.
toast.configure()

function UpvoteA(props) {
    var  UP= <FontAwesomeIcon  icon={faArrowUp}  /> 
    var Filled= <FontAwesomeIcon icon={faArrowUp} />
    // console.log(props)
    const dispatch = useDispatch()
    
    const [isUp, setIsUp] = useState(false)
    const [length, setLength] = useState('')
    
    const answer_downvote=useSelector(state=>state.answerDownvote)
    const {downvot}=answer_downvote
    const userLoggedin = useSelector(state => state.userLoggedin)
    const {  userInfo1 } = userLoggedin

    console.log(userInfo1?.id)

    const handleNonLoggedin = ()=>{
        toast.warning('Only verified users can like/dislike answers', {
            // Set to 15sec
            position: toast.POSITION.TOP_CENTER, autoClose:3000})
    }


    const handleChange=async(e)=>{

        if(isUp){
            dispatch((unUpvoteAnswer(props.id,userInfo1?.id)))
            setLength(length-1)
            setIsUp(false)    

    }
        else{ 

dispatch(upvoteAnswer(props.id,userInfo1?.id))

        
        setLength(length+1)
        setIsUp(true)
   
   }


            
        }
    



    useEffect(() => {



        // console.log("from Upvote"+props.id)

        let url="/api/like/upvoted/answer";
               
        let svar = {}
        svar.answer=props.id
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
                    // Axios.post("/api/like/votes/Tupvotes",svar)
                    // .then((result)=>{
                    //     setLength(result.data.length)
                    // }).catch((err)=>{console.log(err)})
                }    
                else{
                    setIsUp(false)
                    props.sul(false)
                    // Axios.post("/api/like/votes/Tupvotes",svar)
                    // .then((result)=>{
                    //     setLength(result.data.length)
                    // }).catch((err)=>{console.log(err)})
                }
              
        }).catch((err)=>{console.log(err)})  
        Axios.post("/api/like/votes/Tupvotes",svar)
        .then((result)=>{
            setLength(result.data.length)
        }).catch((err)=>{console.log(err)})
    },[])

    useEffect(() => {

if(downvot){

        // console.log("from Upvote"+props.id)

        let url="/api/like/upvoted/answer";
               
        let svar = {}
        svar.answer=props.id
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
                    // Axios.post("/api/like/votes/Tupvotes",svar)
                    // .then((result)=>{
                    //     setLength(result.data.length)
                    // }).catch((err)=>{console.log(err)})
                }    
                else{
                    setIsUp(false)
                    props.sul(false)
                    // Axios.post("/api/like/votes/Tupvotes",svar)
                    // .then((result)=>{
                    //     setLength(result.data.length)
                    // }).catch((err)=>{console.log(err)})
                }
              
        }).catch((err)=>{console.log(err)})  
        Axios.post("/api/like/votes/Tupvotes",svar)
        .then((result)=>{
            setLength(result.data.length)
        }).catch((err)=>{console.log(err)})}
    },[answer_downvote])

      
        
    
    return( 
        <div>
            
        <div 
                    data-tip data-for="upvoteTip"
                    className="upvotes">
                    {
                        (isUp)?<div>
                        <LikeFilled style={{fontSize:"15px", marginTop:"6px"}}
                         onClick={(e)=>{userInfo1?handleChange(e):handleNonLoggedin(e)}}/>
                         <p className="follow-button-number">{length}</p></div>
                        :<div>
                        <LikeOutlined style={{fontSize:"15px", marginTop:"6px"}}
                        onClick={(e)=>{userInfo1?handleChange(e):handleNonLoggedin(e)}}
                        />  <p className="follow-button-number">{length}</p>
                        </div>
                    }
                    
                  
                      
                    <ReactTooltip id="upvoteTip" place="top" effect="solid">
                          Like
                    </ReactTooltip>    
                </div>
        </div>

        
    )
}

export default UpvoteA
