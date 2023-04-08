import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faWifi,faCheck,faPlus } from '@fortawesome/free-solid-svg-icons'
import { faPencilAlt, faCaretUp, faCaretDown,  faShare,faCircleArrowUp,faArrowDown ,faAngleUp, faAngleDown,faTrashAlt, faTh  } from '@fortawesome/free-solid-svg-icons'
import {DislikeOutlined, DislikeFilled} from '@ant-design/icons'
import './FollowButton.css'
import ReactTooltip from 'react-tooltip'
import Axios from 'axios'
import {useDispatch, useSelector} from 'react-redux'
// import { useSelector } from 'react-redux'
// import { SaveAltRounded } from '@material-ui/icons'
import { downvoteAnswer,unDownvoteAnswer } from '../../actions/answerActions'


// Importing toastify module
import {toast} from 'react-toastify';
 
// Import toastify css file
import 'react-toastify/dist/ReactToastify.css';
 
 // toast-configuration method,
 // it is compulsory method.
toast.configure()


function Downvote(props) {
    var  UP= <FontAwesomeIcon  icon={faArrowDown}  />
    var Filled= <FontAwesomeIcon icon={faArrowDown} />
    // console.log(props)
    const dispatch = useDispatch()
    
    const [isUp, setIsUp] = useState(false)
    const [length, setLength] = useState('')
    const answer_upvote=useSelector(state=>state.answerUpvote)
    const {upvot}=answer_upvote

    const userLoggedin = useSelector(state => state.userLoggedin)
    const {  userInfo1 } = userLoggedin

    // console.log(userInfo1?.id)

    const handleNonLoggedin = ()=>{
        toast.warning('Only verified users can like/dislike answers', {
            // Set to 15sec
            position: toast.POSITION.TOP_CENTER, autoClose:3000})
    }


    const handleChange=(e)=>{

        if(isUp){
          
    dispatch(unDownvoteAnswer(props.id,userInfo1?.id))
                setLength(length-1)
                setIsUp(false)
            }

    
        else{ 
            
            dispatch(downvoteAnswer(props.id,userInfo1?.id))
            
        
        setLength(length+1)
        setIsUp(true)
         
   }


            
        }
    



    useEffect(() => {



        // console.log("from Upvote"+props.id)

        let url="/api/like/downvoted/answer";
               
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
                if(response.data.down){
                    setIsUp(true)
                    props.sul(true)
                 
                }    
                else{
                    setIsUp(false)
                    props.sul(false)
                }
              
        }).catch((err)=>{console.log(err)})  
        Axios.post("/api/like/votes/Tdownvotes",svar)
        .then((result)=>{
            setLength(result.data.length)
        }).catch((err)=>{console.log(err)})
    }
    ,[]
    )


    useEffect(() => {

if(upvot){

        //  alert(upvot)

        let url="/api/like/downvoted/answer";
               
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
                if(response.data.down){
                    setIsUp(true)
                    props.sul(true)
                 
                }    
                else{
                    setIsUp(false)
                    props.sul(false)
                }
              
        }).catch((err)=>{console.log(err)})  
        Axios.post("/api/like/votes/Tdownvotes",svar)
        .then((result)=>{
            setLength(result.data.length)
        }).catch((err)=>{console.log(err)})
    }}
    ,[answer_upvote]
    )
       

      
        
    
    return( 
       <div>
        <div className="upvote">
        <div data-tip data-for="downvoteTip" >
        {
            (isUp)?<div>
            <DislikeFilled style={{fontSize:"15px", marginTop:"6px"}}
            onClick={(e)=>{userInfo1?handleChange(e):handleNonLoggedin(e)}}
            />  <p className="follow-button-number">{length}</p>
            </div>
            :<div>
            <DislikeOutlined style={{fontSize:"15px", marginTop:"6px"}}
            onClick={(e)=>{userInfo1?handleChange(e):handleNonLoggedin(e)}}/>
             <p className="follow-button-number">{length}</p>
            </div>
}
        
        
            </div>
            
            <ReactTooltip id="downvoteTip" place="top" effect="solid">
                Dislike
            </ReactTooltip>
        </div>
        </div>
    )
}

export default Downvote
