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

import Navbar from '../NavBar'
import Axios from 'axios'
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import IndividualAnswer from '../Profile/Answers/IndividualAnswer'
import IndividualQuestion from '../Profile/Questions/IndividualQuestion'
import Sidebar from '../Sidebar'
import './HomeScreen.css'
import HomeScreenAnswers from './HomeScreenAnswers'
import HomeScreenQuestion from './HomeScreenQuestions'
// import SelectedQuestion from './SelectedQuestion'
import FelegLite from '../../components/modals/FelegLite'
import { Audio,Rings,TailSpin } from  'react-loader-spinner'
import Alert from '../Alert';
import { Dashboard } from '@material-ui/icons';

function HomeScreen(props){
  

  const [activites, setActivites]=useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
const [posted,setPosted] =useState(false)
const postedQuestion = useSelector(state => state.questionPost)
const {question}=postedQuestion;

const postedAnswer = useSelector(state=>state.answerPost)
const {answer} = postedAnswer

const deletedQuestion = useSelector(state=>state.questionDelete)
const {questiondelete} = deletedQuestion

const deletedAnswer = useSelector(state=>state.answerDelete)
const {answerdelete} = deletedAnswer

  useEffect(() => {
          
    fetchActivites()
  //   {Axios.get('/').then((res)=>{console.log(res.data)})    
  // }
},[]);

useEffect(() => {
      if({question}) fetchActivites()
//   {Axios.get('/').then((res)=>{console.log(res.data)})    
// }
},[postedQuestion])
useEffect(() => {
  if({answer}) fetchActivites()
//   {Axios.get('/').then((res)=>{console.log(res.data)})    
// }
},[postedAnswer])


useEffect(() => {
  if({questiondelete}) fetchActivites()
//   {Axios.get('/').then((res)=>{console.log(res.data)})    
// }
},[deletedQuestion])


  const fetchActivites = async() =>{
    Axios.post('/api/activity/')
    .then((res)=>{
        console.log(res.data)
       setActivites(res.data)
        setLoading(false)
        

    })  
    .catch((err)=>{console.log(err)})
}
// const loadMoreItems = () => {
  
//   console.log('CurrentPage', page)
//   setPage(page+1)
  
  

// }
let count=0
    
const renderActivites =activites.map((activity, index)=>{
  count=count+1
  console.log(count)
  
if(activity.type==="question"){
  
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
if(activity?.type==="answer"){
  console.log(activity)
  const answer={
      id:activity?._id,
      answer:activity?.answer,
      question:activity?.question?.question,
      question_id:activity?.question?._id,
      user:activity?.user?.username,
      downvotes:[],
      upvotes:[],
      user_id:activity?.user?._id,
      date:activity?.date,
      description:activity?.user?.description,
      profilepic:activity?.user?.profilepic
  }
  console.log(answer.answer)
return <div key={index} className="posts-homescreen" >
          {
              <HomeScreenAnswers

              answer={answer}
              history={props.history}
              condition={true}
              />
          }
</div> 
}
return <div>
</div> 

}) 
    return(  <main className="main-homescreen" style={{display:"flex"}}>
   <div className="homee-homescreen">
    <div className="homepage-homescreen">
      <FelegLite/>
<div className="items">
    {
      loading ? <div style={{paddingTop:"40px",paddingLeft:"50%"}}><TailSpin color="#00BFFF" height={30} width={30} /></div>: 
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