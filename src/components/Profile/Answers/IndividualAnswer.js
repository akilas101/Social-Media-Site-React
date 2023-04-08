import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faShare, faTrashAlt, faTh, faCaretUp, faCaretDown, faComment  } from '@fortawesome/free-solid-svg-icons'
import ReactTooltip from 'react-tooltip'
import {useDispatch, useSelector} from 'react-redux'
import DeleteAnswer from '../../modals/DeleteAnswer'
import TextEditor from '../../editor/Editor'
import './IndividualAnswer.css'
import { LoaderDots } from '@thumbtack/thumbprint-react'
import { set } from 'js-cookie'
import { selectedQuestion } from '../../../actions/questionActions'
import Comment from '../../comment/Comment'
import {LikeOutlined, DislikeOutlined} from '@ant-design/icons'
import { profile, profile_details } from '../../../actions/userActions'
import axios from 'axios'
import FollowButton from '../../follow/FollowButton'
import Axios from 'axios'
import Dislike from './Dislike'
import Like from './Like'
import ReactRoundedImage from "react-rounded-image"
import UpvoteA from '../../follow/UpvoteA'
import DownvoteA from '../../follow/DownvoteA'


const IndividualAnswer = (props) => {
    console.log(props)
    var comment = <FontAwesomeIcon icon ={faComment}/>
    var share = <FontAwesomeIcon icon ={faShare}/>
    var trash = <FontAwesomeIcon icon ={faTrashAlt}/>
    var editIcon = <FontAwesomeIcon icon={faTh}/>
    var upvote = <FontAwesomeIcon icon={faCaretUp} size="2x" />
    var down = <FontAwesomeIcon icon ={faCaretDown} size="2x"/>
    
    
    const dispatch = useDispatch()
    
    
    const [deleteOpen, setDeleteOpen] = useState(false)
    const [deleteId, setDeleteId] = useState('')
    const [answerId, setAnswerId] = useState('')
    const [commentId, setCommentId]=useState('')
    const [commentNumbers, setCommentNumbers]=useState('')
    const [comments, setComments]=useState([])
    const [loading_show_comment, setLoading]=useState(true)
    const [date, setDate] = useState('')
    const [likeCount, setLikeCount] = useState('')
    const [likeAction, setLikeAction] = useState('')
    const [dislikeAction, setDislikeAction] = useState('')



    const userLoggedin = useSelector(state=>state.userLoggedin)
    const p_d = useSelector(state=>state.userProfile)
    //const comments_data = useSelector(state=>state.commentShow)
    const comment_post=useSelector(state=>state.commentPost)
    const comment_delete=useSelector(state=>state.commentDelete)
    const question=useSelector(state=>state.selectedQuestion)
    
    const {posted_comment}=comment_post
    //const {loading_show_comment, comments} = comments_data
    const {message} = comment_delete
    const {question_data} = question
    
    
    
    const {userInfo1} = userLoggedin
    const {Profile} = p_d

    
    
    
  
    
    const showComment =async (answer_id)=>{
      setCommentId(answer_id)
      setDeleteId('')
      setAnswerId('')
      const url ="/api/comment/"+answer_id
      const data = await axios.get(url)
      setComments(data.data)
      if(posted_comment || message)
      setCommentNumbers(data.data.length)
      setLoading(false)
           
    }
    
    const length =async ()=>{
      
      const url ="/api/comment/"+props.answer.id
      axios.get(url)
      .then((result)=>{
        
        setCommentNumbers(result.data.length)
      })
      .catch((err)=>{console.log(err)})
           
    }
   const QuestionDispatch=(id)=>{
     
    dispatch(selectedQuestion(id))
  }

    useEffect(()=>{
        if(posted_comment){
          setLoading(true)
          showComment(commentId)
          
        }
        
       
      
    },[comment_post])
    
  
    useEffect(() => {
      if(message){
        setLoading(true)
        showComment(commentId)
        
      }
    }, [comment_delete])

    useEffect(()=>{
      
      length()
      if(props.condition){
        Axios.get('/api/activity/date/'+props.answer.date).
        then((date)=>{
          setDate(date.data)
          })
        .catch((err)=>{console.log(err)})
      }else{
        setDate(props.answer.date)
      }

      Axios.get('/api/like/getLikes/'+props.answer.id)
      .then((result)=>{
        setLikeCount(result.data.likes.length)

        result.data.likes.map((like)=>{
          if (like.userId === props.answer.user_id) {
            setLikeAction('liked')
        }
        })
      })
      .catch((err)=>{console.log(err)})

      Axios.get('/api/like/getDislikes/'+props.answer.id)
      .then((result)=>{
        

        result.data.dislikes.map((dislike)=>{
          if (dislike.userId === props.answer.user_id) {
            setDislikeAction('disliked')
        }
        })
      })
      .catch((err)=>{console.log(err)})
      
    },[])
    
    

    return (
                                
            <div className="homescreen-question-card-homescreen"  style={{maxWidth:"450px",minWidth:"300px"}}>
           

              <div className="flex-container-homescreen" >
              <div className="homescreen-avatar">
            <ReactRoundedImage
            image={props.answer.profilepic}
            imageWidth="35"
            imageHeight="35"
            roundedSize="0"
            />
            </div>     
            <div className="user-details-homescreen">
                <div className="second-flex">
                <Link to={"/profile/"+props.answer.user}
                target="_blank"
                onClick={(e)=>{Profile(props.answer.user_id)}}
                >
                <p className="card-title-homescreen"><strong>{
                  
                  props.answer.user
                }</strong></p>
                </Link>
                <p className="white card-separator">.</p>
                <p className="white">{date}</p>
                </div>
                <div className="details-description" style={{marginTop:"-17px"}}>
                <p className="white" >{props.answer.description}</p>
                </div>
                </div>
            </div>



            <div style={{height:"30px"}}>
            { (props.condition)&&
            // <Link to ={'/questions/'+props.answer.question_id} 
            // target="_blank">
            //   <h6 className="card-title"><strong>{props.answer.question}</strong></h6>
            // </Link>
            <h6 className="card-title-homescreen-A" style={{marginTop:"15px"}}><strong>{props.answer.answer}</strong></h6>
            }
            </div>  


           { props.answer.question?
              <div className="answer-homescreen">
                  <p><b style={{fontSize:"13px"}}>Question</b>: {props.answer.question}</p>
              </div>:null}
               
              <div className="individual-answer-bottom-homescreen ">
              
                  <div className="individual-answer-bottom-left-homescreen">
                  <UpvoteA         
                      id={props.answer.id}
                    
                  />
                        <DownvoteA  
                        id={props.answer.id}
                  />  
                      <div 
                      className="option-comment" 
                      data-tip data-for="commentTip"
                      onClick={(e)=>{
                        showComment(props.answer.id)
                        }}
                        style={{display:"block",marginTop:"-4px"}}
                      >
                      {comment} 
                      <div style={{fontSize:"small",marginTop:"-4px",paddingLeft:"4px"}}>
                        {commentNumbers}
                      </div>
                      
                      </div>
                      
                      <ReactTooltip id="commentTip" place="top" effect="solid">
                          Comment
                      </ReactTooltip> 
                     
                     
                     </div>   

                  <div className="hosr">
                  {
                    (userInfo1 && userInfo1.id===props.answer.user_id)?
                    <div className="question-edit">
                    <div data-tip data-for="editTip" className="share" 
                    onClick={()=>{
                     setAnswerId(props.answer.id)
                     setCommentId('')
                     setDeleteId('')
                     dispatch(profile_details())
                   
                     }}>
                       {editIcon}
                    </div>
                    
                    <ReactTooltip id="editTip" place="top" effect="solid">
                       Edit Answer
                    </ReactTooltip>   
                   </div>
               
                    :
                     <div></div>
                  }
                  {/* {
                      <div  >
                     
                     <div  className="option-comment" data-tip data-for="moreTip"  onClick={(e)=>{
                      setLoading(true)
                         showComment(props.answer.id)
                         }}>{more}</div>
                            <ReactTooltip id="moreTip" place="top" effect="solid">
       View More
    </ReactTooltip> 
                    </div> }
{<div>
    <div 
 
    data-tip data-for="lessTip"
    onClick={(e)=>{
      setComments('')
      }}
      style={{marginLeft:"5px"}}
    >
    {less} 
   
    </div>
    
    <ReactTooltip id="lessTip" place="top" effect="solid">
       View Less
    </ReactTooltip> 
   </div>
} */}

                  {
                    (userInfo1 && userInfo1.id===props.answer.user_id)?
                    <div className="question-delete">
                  <div data-tip data-for="deleteTip" 
                  onClick={()=>{
                    setDeleteOpen(true)
                    setCommentId('')
                    setAnswerId('')
                    setDeleteId(props.answer.id)
                    
                  }} >
                          {trash} 
                      </div>
                      
                      <ReactTooltip id="deleteTip" place="top" effect="solid">
                          Delete
                      </ReactTooltip>
                  </div>:
                  <div></div>
                  }  
                
                  {/* <div className="question-share">
                      <div data-tip data-for="shareTip" className="share">
                          {share}
                      </div>
                      <ReactTooltip id="shareTip" place="top" effect="solid">
                          Share
                      </ReactTooltip>
                    </div> */}
                  </div>
                 
              </div>
              {
                (props.answer.id===answerId)?              
                <div>
                <TextEditor 
                id={answerId}
                props={props}
                type="editing"
                text={props.answer.answer}
                onClose={()=>{
                  setAnswerId("")
                }}
                />
                </div>:<div></div>
              }
              
              { 
                (commentId===props.answer.id) ?
                
                loading_show_comment?<div className="loaders-comment"><LoaderDots size="small"/></div>:
                
                <Comment
                props={props}
                comments={comments}
                answer_id={props.answer.id}
                />
                :<div></div>
              }
              {
                (deleteId===props.answer.id)
              
                ?
                <DeleteAnswer 
                open={deleteOpen} 
                onClose={()=> setDeleteOpen(false)} 
                props={props}
                id={deleteId}
                />
                
                :<div></div>
              }

            </div>)}

export default IndividualAnswer