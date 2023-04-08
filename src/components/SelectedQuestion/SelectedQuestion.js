import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faWifi,  faShare, faCaretDown, faCaretUp, faTrashAlt, faTh, faComment  } from '@fortawesome/free-solid-svg-icons'
import ReactTooltip from 'react-tooltip'
import './SelectedQuestion.css'
import { postAnswer } from '../../actions/answerActions'
import TextEditor from '../editor/Editor'
import ReportModal from '../modals/ReportModal'
import EditModal from '../modals/EditModal'
import Comment from '../comment/Comment'
import DeleteAnswer from '../modals/DeleteAnswer'
import { LoaderDots } from '@thumbtack/thumbprint-react'
import { profile_details } from '../../actions/userActions'
import FollowButton from '../follow/FollowButton'
import Axios from 'axios'
import IndividualAnswer from '../Profile/Answers/IndividualAnswer'
import { set } from 'js-cookie'
import { FlagOutlined } from '@ant-design/icons'
import SelectedQuestionAnswer from './SelectedQuestionAnswer'
import Upvote from '../follow/Upvote'
import Downvote from '../follow/DownvoteA'


function SelectedQuestion(props) {
    var pencil = <FontAwesomeIcon icon ={faPencilAlt}/>
    var wifi = <FontAwesomeIcon icon ={faWifi}/>
    var share = <FontAwesomeIcon icon ={faShare}/>
    var trash = <FontAwesomeIcon icon ={faTrashAlt}/>
    var editIcon = <FontAwesomeIcon icon={faTh}/>
    var upvote = <FontAwesomeIcon icon={faCaretUp} size="2x" />
    var down = <FontAwesomeIcon icon ={faCaretDown} size="2x"/>
    var comment = <FontAwesomeIcon icon ={faComment}/>

    const dispatch = useDispatch()

    const [commentId, setCommentId]=useState('')
    const [answerId, setAnswerId] = useState('')
    const [deleteOpen, setDeleteOpen] = useState(false)
    const [deleteId, setDeleteId] = useState('')
    const [question, setQuestion] = useState('')
    const [editId, setEditId] = useState('')
    const[reportOpen,setReportOpen]= useState(false)
    
    const [editOpen, setEditOpen] = useState(false)
    const [textvalue, setTextValue] = useState('')
    const [commentNumbers, setCommentNumbers]=useState('')
    const [comments, setComments]=useState([])
    const [loading_show_comment, setLoading]=useState(true)
    const [answers, setAnswers] = useState([])
    const [loader, setLoader] = useState(true)

    const posted_answer= useSelector(state=>state.answerPost)
    
    const comment_post=useSelector(state=>state.commentPost)
    const comment_delete=useSelector(state=>state.commentDelete)
    //const questionState = useSelector(state=>state.selectedQuestion)
    const {answer} = posted_answer
    //const {loading_question_page,question_data} = questionState
    const userLoggedin = useSelector(state=>state.userLoggedin)
    const {userInfo1} = userLoggedin
    const {posted_comment}=comment_post
    
    const {message} = comment_delete

    const [status,setStatus] = useState('regular')
    const [questionId, setQuestionId] = useState('')
   
    
      
    useEffect(() => {
      console.log(userLoggedin)
      Axios.get('/api/profile/status/'+userInfo1?.id)
      .then((r)=>{setStatus(r.data)})})

    /*const showComment =async (answer_id)=>{
        setCommentId(answer_id)
        
        const url ="/api/comment/"+answer_id
        const data = await Axios.get(url)
        setComments(data.data)
        if(posted_comment || message)
        setCommentNumbers(data.data.length)
        setLoading(false)
             
      }
      const length =async ()=>{
      
        const url ="/api/comment/"+props.answer.id
        Axios.get(url)
        .then((result)=>{
          
          setCommentNumbers(result.data.length)
        })
        .catch((err)=>{console.log(err)})
             
      }
      */
      useEffect(()=>{
        if(posted_comment){
          //setLoading(true)
          //showComment(commentId)
          
        }
        
    },[comment_post])
    
    useEffect(() => {
        if(message){
          //setLoading(true)
          //showComment(commentId)
          
        }
      }, [comment_delete])
      useEffect(()=>{
      
        //length()
        console.log(props.match.params.id)
        Axios.get('/api/questions/'+props.match.params.id)
        .then((result)=>{
         
          console.log(result.data)
          setQuestion(result.data)
        }).catch((err)=>{console.log(err)})
        Axios.get('/api/answers/question/'+props.match.params.id)
        .then(({ data })=>{
          console.log(data)
          setAnswers(data)
          setLoader(false)
      })
      },[])

    useEffect(()=>{
        if(answer)
        {
            dispatch(postAnswer(null,null))
            props.history.push("/")

        }
    },[posted_answer])

    
    if(answers.length>0){        
    return ( <main><div>
      {
      (loader)?
       <div className="profile-main">
        <div style={{width:"800px", minHeight:"500px", backgroundColor:"white", paddingTop:"30px"}}>
        <LoaderDots size="small"/>
      </div></div>
      :
      
         <div className="profile-main">
         <div className="individual-question" style={{margin:"0"}}>
            <div className="individual-card">
                <div className="individual-title">
                <h4> Question: <strong> {question.question} </strong></h4>
                </div>
                {(userInfo1)&&<div>
                  <div >
              <div >
                
              { userInfo1?(
                  status==='PRO'?
                      <div style={{marginLeft:"5px"}}
                      className="question-pencil"
                      data-tip data-for="answer question"
                      onClick={()=>{
                        setQuestionId(props.match.params.id)
                        dispatch(profile_details())
                        // console.log(profile_details)
                        }}
                      
                        > Answer</div>:null
                 ):null
                        }
                   
                
                 
                  

              </div>
              <div className="">
                
               
               
              </div></div>
          </div>
        }
          
        </div>
            <div className="answers-section">
                <div className="answers-section-header">
                    <div className="answers-section-header-content">
                      <h6>{answers.length} Answer(s)</h6>
                    </div>
                </div>
                {
                 
                  answers.map(answer=>{
                    const obj={
                      answer:answer?.answer,
                      id:answer?._id,
                      question:answer.question?.question,
                      question_id:answer?.question?._id,
                      downvotes:[],
                      upvotes:[],
                      user:answer?.user?.username,
                      user_id:answer?.user?._id,
                      date:"",
                      description:answer.user.description,
                      profilepic:answer.user.profilepic
                    }

                    { console.log(answers) 
                      console.log(obj+" from selected question")}
                    return  <div key={answer?._id}  style={{
                      minHeight:"180px",
                      paddingBottom:"20px",
                      marginBottom:"10px"
                    }}>
                     {
                     <SelectedQuestionAnswer 
                     answer={obj}
                     history={props.history}
                     condition={false}
                     
                     />
                     }
                     </div>  
                 })             
                   
                }
               
                
   
                </div>
                {
                (questionId===props.match.params.id)?              
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
         </div>      
        </div>
    }
        </div> 

        </main>)
  }
  else{
    return( <main><div>{
        (loader)?
         <div className="profile-main">
          <div style={{width:"800px", minHeight:"500px", backgroundColor:"white", paddingTop:"30px"}}>
          <LoaderDots size="small"/>
        </div></div>
        :
        
           <div className="profile-main">
           <div className="individual-question" style={{margin:"0"}}>
              <div className="individual-card">
                  <div className="individual-title">
                  <h4><strong>{question.question} </strong></h4>
                  </div>
                  {(userInfo1)&&<div><div className="individual-question-bottom">
                <div className="card-question-bottom-left">
                  
                       <div className="question-pencil"
                          onClick={()=>{
                            setQuestionId(props?.match.params?.id)
                            dispatch(profile_details())
                            console.log(profile_details)
                            }}> Answer</div>       
                 
                </div>



                <div className="selected-question-bottom-right">
                <div className="card-question-bottom">
                  <div className="card-question-bottom-left">
               
               
               {
                 <Upvote         
                      id={props.question?._id}
                    
                  />
              }

                  {<div>      <Downvote         
                      id={props.question?._id}
                    
                  /></div>}
                  
                 { userInfo1?(
                  status==='PRO'?
                      <div style={{marginLeft:"5px"}}
                      className="question-pencil"
                      data-tip data-for="answer question"
                      onClick={()=>{
                        setQuestionId(props.question?._id)
                        dispatch(profile_details())
                        console.log(profile_details)
                        }}
                      
                        > Answer</div>:<div><p style={{fontSize:"10px"}}>Only Verified Professionals can answer questions</p></div>
                 ):null
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
                      
                  
                  <div className="hsr">
                  {
                    (userInfo1 && userInfo1.id===props.question?.user_id)?
                    <div className="question-edit">
                    <div data-tip data-for="editTip" className="share" 
                    onClick={()=>{
                        setEditOpen(true)
                        setEditId(props.question?._id)
                        setTextValue(props.question.question)
                    }}>
                       {editIcon}
                    </div>
                    
                    <ReactTooltip id="editTip" place="top" effect="solid">
                       Edit
                    </ReactTooltip>   
                   </div>
                
                    :<div></div>
                  }
                  
                  {
                    (userInfo1 && userInfo1.id===props.question?.user_id)
                    ? <div className="question-delete">
                    <div data-tip data-for="deleteTip" 
                    onClick={()=>{
                      setDeleteOpen(true)
                      setDeleteId(props.question?._id)
                    }}>
                        {trash} 
                    </div>
                    
                    <ReactTooltip id="deleteTip" place="top" effect="solid">
                        Delete
                    </ReactTooltip>
                </div>
         
                    :<div></div>

                  }
             
                      {
          userInfo1 ?<div ><div className="option-comment"   data-tip data-for="FlagTip" onClick={()=>setReportOpen(true)} style={{color:"black"}}> <FlagOutlined/></div>
              
              <ReactTooltip id="FlagTip" place="top" effect="solid">
                          Report post
                      </ReactTooltip> 
          <ReportModal open={reportOpen}   postq={props.question?._id} onClose={()=> setReportOpen(false)}/>
         </div>:
          <div ></div>
        }
                      </div>
                      </div>
                 
                 
                </div>
                </div>
            </div> }
              </div> 
              {
                (questionId===props?.match?.params?.id)?              
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
                (editId===props?.match?.params?.id)
              
                ?
                <EditModal 
                open={editOpen} 
                onClose={()=> setEditOpen(false)} 
                props={props}
                id={editId}
                textvalue={textvalue}
                />
                
                :<div></div>
              }
              </div>
                 
              </div>}  </div> </main>)   
             
}
}
export default SelectedQuestion
