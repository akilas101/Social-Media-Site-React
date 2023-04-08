import React, { useState, useEffect, useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux'
//import { listQuestions } from '../actions/questionActions'
import { LoaderDots } from '@thumbtack/thumbprint-react'
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faWifi,  faShare, faTrashAlt, faTh  } from '@fortawesome/free-solid-svg-icons'
import ReactTooltip from 'react-tooltip'
//import EditModal from './modals/EditModal'
//import { editQuestion } from '../actions/questionActions'
//import DeleteQuestion from './modals/DeleteQuestion'
import TextEditor from '../editor/Editor'
//import { deleteProfile } from '../actions/userActions'
import { render } from 'react-dom'
import Axios from 'axios'
import IndividualAnswer from '../Profile/Answers/IndividualAnswer'
import IndividualQuestion from '../Profile/Questions/IndividualQuestion'
import { profile, profile_details } from '../../actions/userActions'

import './HomeScreen.css'
import HomeScreenAnswers from './HomeScreenAnswers'
import HomeScreenQuestion from './HomeScreenQuestions'
import SidebarOptions from '../SidebarOptions'
import Sidebar from '../Sidebar'
import { Audio,Rings,TailSpin } from  'react-loader-spinner'



function HomeScreen(props){
  
  const userLoggedin = useSelector(state=>state.userLoggedin)
  const pd = useSelector(state=>state.userProfile)
  const {loading1, userInfo1} = userLoggedin
  const {Profile} = pd
  const [activites, setActivites]=useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  useEffect(() => {
          
    fetchActivites()
  //   {Axios.get('/').then((res)=>{console.log(res.data)})    
  // }
});

  const fetchActivites = () =>{
    Axios.get('/api/activity/following/'+userInfo1.id)
    .then((res)=>{
        console.log(res.data)
       setActivites(res.data)
        setLoading(false)
        

    })  
    .catch((err)=>{console.log(err)})
}
 const loadMoreItems = () => {
  
   console.log('CurrentPage', page)
   setPage(page+1)
  
 }
let count=0
    
const renderActivites =activites.map((activity, index)=>{
  count=count+1
  console.log(count)
  if(activity?.type==="answer"){
  //console.log(activity)
  const answer={
      id:activity._id,
      answer:activity.answer,
      question:activity.question.question,
      question_id:activity.question._id,
      user:activity.user.username,
      downvotes:[],
      upvotes:[],
      user_id:activity.user._id,
      date:activity.date,
      description:activity.user.description,
      profilepic:activity.user.profilepic
  }
  console.log(answer?.answer)
return <div key={index} >
          {
              <HomeScreenAnswers

              answer={answer}
              history={props.history}
              condition={true}
              />
          }
</div> 
}

if(activity?.type==="question"){
  
  const question={
      _id:activity._id,
      question:activity.question,
      type:activity.type,
      interest:activity.interest,
      followers:[],
      following:[],
      user_id:activity?.user?._id,
      username:activity?.user?.username,
      date:activity.date
      
  }
  return <div key={index} className="posts-homescreen">
          {
              <HomeScreenQuestion 
                  question={question}
                  history={props.history}
              /> 
          }
</div> 
}

}) 
    return (<main className="main-homescreen" style={{display:"flex"}}>
       <div className="homee-homescreen">
    <div className="homepage-homescreen"style={{paddingTop:"80px"}}>
   
<div className="items">
    {
      loading ? <div style={{paddingTop:"80px",paddingLeft:"50%"}}><TailSpin color="#00BFFF" height={30} width={30} /></div>: 
      <div> 
           
          {renderActivites}
         
      </div>

    }
    </div>
     </div>
     <div className="side-homescreen">
     <Sidebar />
     </div>
     <div> </div> 
     </div>
    </main>)
}
export default HomeScreen