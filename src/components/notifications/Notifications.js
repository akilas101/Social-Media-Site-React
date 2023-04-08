// import React from 'react';
import ReactDOM from 'react-dom'
import React, { useState, useEffect, useRef} from 'react'
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faShare, faTrashAlt, faTh, faCaretUp, faCaretDown, faComment  } from '@fortawesome/free-solid-svg-icons'
import ReactTooltip from 'react-tooltip'
import {useDispatch, useSelector} from 'react-redux'
import DeleteAnswer from '../modals/DeleteAnswer'
import TextEditor from '../editor/Editor'
//import '../HomeScreen/HomeScreen.css'
import { LoaderDots } from '@thumbtack/thumbprint-react'
import { set } from 'js-cookie'
import { selectedQuestion } from '../../actions/questionActions'
import Comment from '../comment/Comment'
import { profile, profile_details } from '../../actions/userActions'
import axios from 'axios'
import FollowButton from '../follow/FollowButton'
import Axios from 'axios'
import { LikeOutlined } from '@ant-design/icons'
import Like from '../Profile/Answers/Like'
import Dislike from '../Profile/Answers/Dislike'
import './gridcar.css'
import Widgets from '../Widget'
import Message from './Message'
import Sidebar from '../Sidebar'
import ReactRoundedImage from "react-rounded-image"
import {Divider} from 'react-daisyui'
import daisyui from 'daisyui';
import {toast} from 'react-toastify';
import { Audio,Rings,TailSpin } from  'react-loader-spinner'

 
// Import toastify css file
import 'react-toastify/dist/ReactToastify.css';

toast.configure()
function Notifications(props){
    

  const [interests, setInterests]=useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
const [notifications,setNotifications]=useState([])
  
const userLoggedin = useSelector(state=>state.userLoggedin)
  const pd = useSelector(state=>state.userProfile)
  const {loading1, userInfo1} = userLoggedin
  const {Profile} = pd
  const [activites, setActivites]=useState([])
  

  useEffect(() => {
          
    fetchNotifications()
    
  //   {Axios.get('/').then((res)=>{console.log(res.data)})    
  // }
},[]);

  const fetchNotifications = async() =>{
   Axios.get('/api/profile/notifications/fetch/'+userInfo1?.id)
    .then((res)=>{
        setNotifications(res.data)
        setLoading(false)
     

    })  
    .catch((err)=>{console.log(err)})
}

let count=0
    
const renderNotificaitons =notifications.map((notice, index)=>{
  count=count+1
  console.log(count)
  
if(notice){
  
  const message={
      _id:notice._id,
    from:notice.from,
      subject:notice.subject,
     
      user:notice.user,
      message:notice.message,
      date:notice.date  
  }
  if(notice.answerFrom){
    message.answerFrom=notice.answerFrom
    message.questionTo=notice.questionTo
  }
   console.log("MESSAGE FROM NOTIFICATIONS "+message)
  return <div key={index} >
         {
            <Message 
            notifications={message}
            history={props.history}
            />
         }
</div> 
}

})

const handleDelete = async()=>{
  Axios.post("/api/notification/clearAll",{},{
    headers:{
Authorization: userInfo1?.token

  }
}).catch(err=> toast.warning('Problem clearing notifications', {
  // Set to 15sec
  position: toast.POSITION.TOP_CENTER, autoClose:1000}))
}
 
    return(  <main>
        <div className='hom'>
   
  
        <div className='wrapper'>
       
    {
      loading ? <div style={{paddingTop:"40px",paddingLeft:"50%"}}><TailSpin color="#00BFFF" height={30} width={30} /></div>: 
      
      <div className='wrapper'> 
            {userInfo1?
                <div onClick={(e)=>handleDelete()} style={{cursor:"pointer"}}> Clear all notifications</div>:null}
       
          {renderNotificaitons}
         
      </div>

    }
    </div>
    
    
    
     {/* { <div> 
        <Widgets/>
        </div>} */}
     </div>
    </main>)
    }
        

export default Notifications;