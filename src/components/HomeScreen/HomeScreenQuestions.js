import React, {useState, useEffect, Component} from 'react'
import {Link,NavLink} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faCaretUp, faCaretDown, faWifi,faEnvelopeOpenText,  faPenSquare,faShare,faTrashAlt} from '@fortawesome/free-solid-svg-icons'
import ReactTooltip from 'react-tooltip'
import EditModal from '../modals/EditModal'
import ReportModal from '../modals/ReportModal'

import DeleteQuestion from '../modals/DeleteQuestion'
import TextEditor from '../editor/Editor'
import {  profile_details } from '../../actions/userActions';
import { selectedQuestion } from '../../actions/questionActions'
import FollowButton from '../follow/FollowButton'
import Axios from 'axios'
import Upvote from './../follow/Upvote'
import Downvote from './../follow/Downvote'
import './HomeScreenQuestions.css'
import { FlagOutlined } from '@ant-design/icons'
import Alert from '../Alert'


function HomeScreenQuestion(props){

    //console.log(props)
var ans =  <FontAwesomeIcon icon ={faEnvelopeOpenText}/>
    var pencil = <FontAwesomeIcon icon ={faPencilAlt}/>
    var wifi = <FontAwesomeIcon icon ={faWifi}/>
    var share = <FontAwesomeIcon icon ={faShare}/>
    var trash = <FontAwesomeIcon icon ={faTrashAlt}/>
    var editIcon = <FontAwesomeIcon icon={faPenSquare}/>
    // var upvote = <FontAwesomeIcon icon={faAngleUp} size="2x" />
    // var downvote = <FontAwesomeIcon icon ={faAngleDown} size="2x"/>
    
    const [commentId, setCommentId]=useState('')
    const [commentNumbers, setCommentNumbers]=useState('')
    const [comments, setComments]=useState([])
    const comment_post=useSelector(state=>state.commentPost)
    const comment_delete=useSelector(state=>state.commentDelete)
    const question=useSelector(state=>state.selectedQuestion)
    const {posted_comment}=comment_post
   


    const dispatch = useDispatch()
    
    const [deleteOpen, setDeleteOpen] = useState(false)
    const [questionId, setQuestionId] = useState('')
    const [editId, setEditId] = useState('')
    const [deleteId, setDeleteId] = useState('')
    const [editOpen, setEditOpen] = useState(false)
    const [textvalue, setTextValue] = useState('')
    const [answers, setAnswers] = useState('')
    const[reportOpen,setReportOpen]= useState(false)
    const [loading, setLoading] = useState(false)
    const [date, setDate] = useState('')
const [ul,sul]=useState(false)
const [dl,sdl]=useState(false)
    const userLoggedin = useSelector(state=>state.userLoggedin)
    const pd = useSelector(state=>state.userProfile)
    const {loading1, userInfo1} = userLoggedin
    const {Profile} = pd
const [status,setStatus] = useState('regular')
    


const [errMsg, setErrMsg] = useState('');







const QuestionDispatch=(id)=>{
     
      dispatch(selectedQuestion(id))
    }
    


    const showComment =async (answer_id)=>{
      // setCommentId(answer_id)
      // setDeleteId('')
      // setAnswerId('')
      // const url ="/api/comment/"+answer_id
      // const data = await axios.get(url)
      // setComments(data.data)
      // if(posted_comment || message)
      // setCommentNumbers(data.data.length)
      // setLoading(false)
           
    }
    

    const hideComment = ()=>{

      setComments([]);    

    }
    const handleNonLoggedin = ()=>{
      setErrMsg('Only verified users can answer questions')
      setInterval(() => {
          setErrMsg(' ');
      }, 4000);
  }


  
    useEffect(() => {
   

      Axios.get('/api/answers/question/'+props.question._id)
      .then((response)=>{
        //console.log(props.question._id)
        setAnswers(response.data.length)
        setLoading(false)
      })
      Axios.get('/api/activity/date/'+props.question.date).
        then((date)=>{
          setDate(date.data)
          })
        .catch((err)=>{console.log(err)})
        
    }, [])
    
     return (
        <div className="homescreen-question-card-homescreen">
            <div className="homescreen-question-userinfo">
            {
              
              (userInfo1 && userInfo1.id===props.question.user_id)?
              <div>
                You have asked this(on) {date}
              </div>:
              <div>
              <Link to={'/profile/'+props.question.username}                
                className="username-link"
                >{props.question.username }</Link> has asked this (on) {date}
                </div>
            }
                
            </div>
            <NavLink exact to ={"/SelectedQuestions/"+props.question._id}
             
            >
              <h6 className="card-title"><strong>{props.question.question}</strong></h6>
              {(props.question.interest)?
                <h5 style={{fontSize:"10px"}} >#{props.question.interest.name}</h5>:
                null
}</NavLink>    
              <div className="card-question-details">
                  
                  
                    <NavLink exact to ={"/SelectedQuestions/"+props.question._id}
                   >
                    <div className="white-question">
                    <p><strong>{answers} Answer(s)</strong></p>
                    </div>
                    </NavLink>
                    
                  
                  
              </div>
    
              <div className="individual-answer-bottom-homescreen">
                  <div className="individual-answer-bottom-left-homescreen">
               
               
               {
                 <Upvote         
                      id={props.question._id}
                    sul={sul}
                    sdl={sdl}
                  />
              }

                  {<div>      <Downvote         
                      id={props.question._id}
                      sul={sul}
                      sdl={sdl}
                  /></div>}
                  
                 { userInfo1?(
                  userInfo1.status==='PRO'?
                      <div style={{marginLeft:"5px"}}
                      className="question-pencil"
                      data-tip data-for="answer question"
                      onClick={()=>{
                        setQuestionId(props.question._id)
                        dispatch(profile_details())
                        console.log(profile_details)
                        }}
                      
                        > Answer</div>:<div> <>
                        {errMsg?<><Alert msg={errMsg} type="danger" /></>
                          :null}
                        </><p style={{fontSize:"10px"}} onClick={(e)=>{handleNonLoggedin(e)}}>Answer</p></div>
                 ):<div> <>
                 {errMsg?<><Alert msg={errMsg} type="danger" /></>
                   :null}
                 </><p style={{fontSize:"10px"}} onClick={(e)=>{handleNonLoggedin(e)}}>Answer</p></div>
                        }
                        
                        {/* {
                          (userInfo1)?
                          // <FollowButton
                          // type="question"
                          // id={props.question._id}
                          // />
                          
                          :null
                          
                        } */}
                      
                     
                  </div>
                      
                  
                  <div className="hosr">
                  {/* {
                    (userInfo1 && userInfo1.id===props.question.user_id)?
                    <div className="question-edit">
                    <div data-tip data-for="editTip" className="share" 
                    onClick={()=>{
                        setEditOpen(true)
                        setEditId(props.question._id)
                        setTextValue(props.question.question)
                    }}>
                       {editIcon}
                    </div>
                    
                    <ReactTooltip id="editTip" place="top" effect="solid">
                       Edit
                    </ReactTooltip>   
                   </div>
                
                    :<div></div>
                  } */}
                  
                  {
                    (userInfo1 && userInfo1.id===props.question.user_id)
                    ? <div className="question-delete">
                    <div data-tip data-for="deleteTip" 
                    onClick={()=>{
                      setDeleteOpen(true)
                      setDeleteId(props.question._id)
                    }}>
                        {trash} 
                    </div>
                    
                    <ReactTooltip id="deleteTip" place="top" effect="solid">
                        Delete
                    </ReactTooltip>
                </div>
         
                    :<div></div>

                  }
                  {  <div>
                  <div 
                      // className="option-comment" 
                      // data-tip data-for="ansTip"
                      // onClick={(e)=>{
                      //   showComment(props.question._id)
                      //   }}
                      >
                      {ans} 
                      <div style={{paddingLeft:"5px",marginTop:"-4px"}}>
                        {commentNumbers}
                      </div>
                      
                      </div>
                      
                      <ReactTooltip id="ansTip" place="top" effect="solid">
                          Answers
                      </ReactTooltip> 
                      </div> }
                      {
          userInfo1 ?<div ><div className="option-comment"   data-tip data-for="FlagTip" onClick={()=>setReportOpen(true)} style={{color:"black"}}> <FlagOutlined/></div>
              
              <ReactTooltip id="FlagTip" place="top" effect="solid">
                          Report post
                      </ReactTooltip> 
          <ReportModal open={reportOpen}   postq={props.question._id} onClose={()=> setReportOpen(false)}/>
         </div>:
          <div ></div>
        }
                      </div>
                      </div>
            
              {
                (questionId===props.question._id)?              
                <div>
                <TextEditor 
                id={questionId}
                props={props}
                type="question"
                onClose={()=>{
                  setQuestionId("")
                }}/>
                </div>:<div></div>
              }
              {
                (deleteId===props.question._id)
              
                ?
                <DeleteQuestion 
                open={deleteOpen} 
                onClose={()=> {
                  setDeleteOpen(false)
                  
                }} 
                props={props}
                id={deleteId}
                />
                
                :<div></div>
              }
          
              {
                (editId===props.question._id)
              
                ?
                <EditModal 
                open={editOpen} 
                onClose={()=> setEditOpen(false)} 
                props={props}
                id={editId}
                textvalue={textvalue}
                />
                
                :<div>
                  
                </div>
              }
             
            </div>
          
              
    )
            
         }

export default HomeScreenQuestion