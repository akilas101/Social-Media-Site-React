import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faWifi,faCheck,faPlus } from '@fortawesome/free-solid-svg-icons'
import { faPencilAlt, faCaretUp, faCaretDown,  faShare,faCircleArrowUp,faArrowDown ,faAngleUp, faAngleDown,faTrashAlt, faTh  } from '@fortawesome/free-solid-svg-icons'
import ReactTooltip from 'react-tooltip'
import './FollowButton.css'
import Axios from 'axios'
import { useSelector,useDispatch } from 'react-redux'
import { downvoteQuestion,unDownvoteQuestion} from '../../actions/questionActions'

// import { SaveAltRounded } from '@material-ui/icons'
import {ArrowUpOutlined } from '@ant-design/icons'



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
    console.log(props)
    const dispatch = useDispatch()
    const [isUp, setIsUp] = useState(false)
    const [length, setLength] = useState('')
    
    const question_Upvote = useSelector(state=>state.questionUpvote)
    const {qupvot} = question_Upvote
    
    const question_Downvote = useSelector(state=>state.questionDownvote)
    const {qdownvot} = question_Downvote
    

    const userLoggedin = useSelector(state => state.userLoggedin)
    const {  userInfo1 } = userLoggedin

    console.log(userInfo1?.id)

    const handleNonLoggedin = ()=>{
        toast.warning('Please login to vote', {
            // Set to 15sec
            position: toast.POSITION.TOP_CENTER, autoClose:1000})
    }


    const handleChange=(e)=>{

        if(isUp){
            dispatch(unDownvoteQuestion(props?.id,userInfo1?.id))
                   setLength(length-1)
                setIsUp(false)
            }
        
        else{ 
            
            dispatch(downvoteQuestion(props?.id,userInfo1?.id))
           setLength(length+1)
        setIsUp(true)
       
   }


            
        }
    



    useEffect(() => {

     
            // console.log('This will run every second!');
       
        // console.log("from Upvote"+props.id)

        let url="/api/questions/downvoted/question";
               
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
                if(response.data.down){
                    setIsUp(true)
                    props.sdl(true)
                    Axios.post("/api/questions/votes/Tdownvotes",svar)
                    .then((result)=>{
                        setLength(result.data.length)
                    }).catch((err)=>{console.log(err)})
                }    
                else{
                    setIsUp(false)
                    props.sdl(false)
                    Axios.post("/api/questions/votes/Tdownvotes",svar)
                    .then((result)=>{
                        setLength(result.data.length)
                    }).catch((err)=>{console.log(err)})
                }
              
        }).catch((err)=>{console.log(err)})  
        Axios.post("/api/questions/votes/Tdownvotes",svar)
        .then((result)=>{
            setLength(result.data.length)
        }).catch((err)=>{console.log(err)})
   
   
        if(props.sdl===true){
            setIsUp(true)
        }
        if(props.sdl===false){
            setIsUp(false)
        } }
    
    ,[])


    useEffect(() => {

     
     if(qupvot){   // console.log('This will run every second!');
   
    // console.log("from Upvote"+props.id)

    let url="/api/questions/downvoted/question";
           
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
            if(response.data.down){
                setIsUp(true)
                props.sdl(true)
                Axios.post("/api/questions/votes/Tdownvotes",svar)
                .then((result)=>{
                    setLength(result.data.length)
                }).catch((err)=>{console.log(err)})
            }    
            else{
                setIsUp(false)
                props.sdl(false)
                Axios.post("/api/questions/votes/Tdownvotes",svar)
                .then((result)=>{
                    setLength(result.data.length)
                }).catch((err)=>{console.log(err)})
            }
          
    }).catch((err)=>{console.log(err)})  
    Axios.post("/api/questions/votes/Tdownvotes",svar)
    .then((result)=>{
        setLength(result.data.length)
    }).catch((err)=>{console.log(err)})


    if(props.sdl===true){
        setIsUp(true)
    }
    if(props.sdl===false){
        setIsUp(false)
    } }
}
,[question_Upvote])
       
useEffect(() => {

     
    if(qdownvot){   // console.log('This will run every second!');
  
   // console.log("from Upvote"+props.id)

   let url="/api/questions/downvoted/question";
          
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
           if(response.data.down){
               setIsUp(true)
               props.sdl(true)
               Axios.post("/api/questions/votes/Tdownvotes",svar)
               .then((result)=>{
                   setLength(result.data.length)
               }).catch((err)=>{console.log(err)})
           }    
           else{
               setIsUp(false)
               props.sdl(false)
               Axios.post("/api/questions/votes/Tdownvotes",svar)
               .then((result)=>{
                   setLength(result.data.length)
               }).catch((err)=>{console.log(err)})
           }
         
   }).catch((err)=>{console.log(err)})  
   Axios.post("/api/questions/votes/Tdownvotes",svar)
   .then((result)=>{
       setLength(result.data.length)
   }).catch((err)=>{console.log(err)})


   if(props.sdl===true){
       setIsUp(true)
   }
   if(props.sdl===false){
       setIsUp(false)
   } }
}
,[question_Downvote])
      
        
    
    return( 
        <div>
        <div className="upvote">
        <div data-tip data-for="dTip" >
        {
            (isUp)?<div>
            <div className="follow-button-success" onClick={(e)=>{userInfo1?handleChange(e):handleNonLoggedin(e)}}>
            <p>{Filled}</p> 
            <p className="follow-button-number">{length}</p>
            </div>
            
            </div>:
            <div className="follow-button-fail" onClick={(e)=>{userInfo1?handleChange(e):handleNonLoggedin(e)}}>
            
            <p>{UP}</p> 
            <p className="follow-button-number">{length}</p>
            </div>
        }
        
        </div>
            
            <ReactTooltip id="dTip" place="top" effect="solid">
                Downvote
            </ReactTooltip>
        </div>
        </div>



// <div>
// <div className="upvote">
// <div data-tip data-for="downvoteTip" >
// {
//     (isUp)?<div>
//     <DislikeFilled style={{fontSize:"15px", marginTop:"6px"}}
//     onClick={(e)=>{userInfo1?handleChange(e):handleNonLoggedin(e)}}
//     />  <p className="follow-button-number">{length}</p>
//     </div>
//     :<div>
//     <DislikeOutlined style={{fontSize:"15px", marginTop:"6px"}}
//     onClick={(e)=>{userInfo1?handleChange(e):handleNonLoggedin(e)}}/>
//      <p className="follow-button-number">{length}</p>
//     </div>
// }


//     </div>
    
//     <ReactTooltip id="downvoteTip" place="top" effect="solid">
//         Dislike
//     </ReactTooltip>
// </div>
// </div>
    )
}

export default Downvote
