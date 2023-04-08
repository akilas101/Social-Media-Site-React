import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faShare, faTrashAlt, faTh, faCaretUp,faAngleDoubleDown, faPenSquare,faAngleDoubleUp,faCaretDown, faComments } from '@fortawesome/free-solid-svg-icons'
import ReactTooltip from 'react-tooltip'
import {useDispatch, useSelector} from 'react-redux'
import DeleteAnswer from '../modals/DeleteAnswer'
import TextEditor from '../editor/Editor'
import './HomeScreenAnswers.css'
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
import ReactRoundedImage from "react-rounded-image"
import { Divider } from 'react-daisyui'
import UpvoteA from '../follow/UpvoteA'
import DownvoteA from '../follow/DownvoteA'
import { Image } from 'cloudinary-react';
import Avatar from '@mui/material/Avatar';

import Badge from '@mui/material/Badge'


const HomeScreenAnswers = (props) => {
    //console.log(props)
    var comment = <FontAwesomeIcon icon ={faComments}/>
    var share = <FontAwesomeIcon icon ={faShare}/>
    var trash = <FontAwesomeIcon icon ={faTrashAlt}/>
    var editIcon = <FontAwesomeIcon icon={faPenSquare}/>
    var upvote = <FontAwesomeIcon icon={faCaretUp} size="2x" />
    var down = <FontAwesomeIcon icon ={faCaretDown} size="2x" style="regular"/>
    var more = <FontAwesomeIcon icon= {faAngleDoubleDown}/>
    var less = <FontAwesomeIcon icon={faAngleDoubleUp}/>

    
    const dispatch = useDispatch()
    
    
    const [deleteOpen, setDeleteOpen] = useState(false)
    const [deleteId, setDeleteId] = useState('')
    const [answerId, setAnswerId] = useState('')
    const [commentId, setCommentId]=useState('')
    const [commentNumbers, setCommentNumbers]=useState('')
    const [comments, setComments]=useState([])
    const [backupComments, setBackupComments]=useState([])

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
    
    const [ul,sul]=useState('')
const [dl,sdl]=useState('')
    
    const {userInfo1} = userLoggedin
     
    
  
    const [imageIds, setImageIds] = useState([]);






    const showComment =async (answer_id)=>{
      setCommentId(answer_id)
      setDeleteId('')
      setAnswerId('')
      setComments(backupComments)
      // const url ="/api/comment/"+answer_id
      // const data = await axios.get(url)
      // setComments(data.data)
      if(posted_comment || message)
      setCommentNumbers(comments?.length)
      setLoading(false)
           
    }
    

    const hideComment = ()=>{

      setComments([]);    

    }


    const length =async ()=>{
      const url ="/api/comment/"+props.answer.id
      axios.get(url)
      .then((result)=>{
        setComments(result.data)
        setBackupComments(result.data)
        setCommentNumbers(result.data.length)
      })
      .catch((err)=>{console.log(err)})
           
    }


   const QuestionDispatch=(id)=>{
     
    dispatch(selectedQuestion(id))
  }


  const Profile = (id) =>{
    
    dispatch(profile(id))
  }



    useEffect(()=>{
        if(posted_comment){
          setLoading(false)
          // setCommentId(answer_id)
          setDeleteId('')
          setAnswerId('')
          const url ="/api/comment/"+props.answer.id
      axios.get(url)
      .then((result)=>{
        
        setComments(result.data)
        setBackupComments(result.data)
        setCommentNumbers(result.data.length)
      })
      .catch((err)=>{console.log(err)})
        }      
    },[comment_post])
    

  
    useEffect(() => {
      if(message){
        const url ="/api/comment/"+props.answer.id
        axios.get(url)
        .then((result)=>{
          setComments(result.data)
          setBackupComments(result.data)
          setCommentNumbers(result.data?.length)
        })
        .catch((err)=>{console.log(err)})
          
      }
    }, [comment_delete])



    useEffect(()=>{
      
      length()
      if(props.condition){
        Axios.get('/api/activity/date/'+props.answer?.date).
        then((date)=>{
          setDate(date.data)
          })
        .catch((err)=>{console.log(err)})
      }else{
        setDate(props?.answer?.date)
      }


    },[])
    
    useEffect(() => {

      loadImages();
    
    
    
    },[])
    const loadImages = async () => {
      try {
          const res = Axios.get('/api/profile/propics/'+props?.answer?.user_id)
         .then((res)=>{ console.log(res.data)
          setImageIds(res.data)})
          // alert(props?.answer?.user_id)
      } catch (err) {
          console.error(err);
      }
    };
    return (
                                
            <div className="homescreen-question-card-homescreen" style={{width:"100%",paddingTop:"0"}}>
              <div className="flex-container-homescreen">
            <div className="homescreen-avatar">
            {/* <ReactRoundedImage
            image={props.answer.profilepic}
            imageWidth="35"
            imageHeight="35"
            roundedSize="0"
            /> */}

        
{userInfo1?(userInfo1.status==='PRO')?<Badge
    overlap="circular"
    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
   color='info'
   badgeContent={"p"} 
   variant="string"
   sx={{ "& .MuiBadge-badge": { fontSize: 9, height: 8 ,width:10} }}
   >          <Avatar sx={{ width: 32, height: 32 }} >  {imageIds &&
                imageIds.map((imageId, index) => (
                    <Image
                        key={index}
                        cloudName='feleg'
                        publicId={imageId}
                        width="32"
                        crop="scale"
                    />
                ))}</Avatar></Badge>:<Badge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
               color='success'
                
               variant="dot"
               sx={{ "& .MuiBadge-badge": { fontSize: 9, height: 10, Width: 15 } }}
               >          <Avatar sx={{ width: 32, height: 32 }} >  {imageIds &&
                            imageIds.map((imageId, index) => (
                                <Image
                                    key={index}
                                    cloudName='feleg'
                                    publicId={imageId}
                                    width="32"
                                    crop="scale"
                                />
                            ))}</Avatar></Badge>
                :
                 <Avatar sx={{ width: 32, height: 32 }} >  
                   {imageIds &&   imageIds.map((imageId, index) => (   <Image
                              key={index}
                              cloudName='feleg'
                              publicId={imageId}
                  
                          width="32"
                          crop="scale"
                      /> ))}
                  </Avatar>
  }
        
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
                      sul={sul}
                      sdl={sdl}
                  />
                        <DownvoteA  
                        id={props.answer.id}
                        sul={sul}
                    sdl={sdl}
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
                  {
                      <div  >
                     
                     <div  className="option-comment" data-tip data-for="moreTip"  onClick={(e)=>{
                      setLoading(true)
                         showComment(props?.answer?.id)
                         }}>{more}</div>
                            <ReactTooltip id="moreTip" place="top" effect="solid">
       View More
    </ReactTooltip> 
                    </div> }
{<div>
    <div 
 
    data-tip data-for="lessTip"
    onClick={(e)=>{
      setComments([])
    }}
      style={{marginLeft:"5px"}}
    >
    {less} 
   
    </div>
    
    <ReactTooltip id="lessTip" place="top" effect="solid">
       View Less
    </ReactTooltip> 
   </div>
}

                  {
                    (userInfo1 && userInfo1?.id===props.answer?.user_id)?
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
                (commentId===props?.answer?.id) ?
                
                loading_show_comment?<div className="loaders-comment"><LoaderDots size="small"/></div>:
                
                <Comment
                props={props}
                comments={comments}
                answer_id={props?.answer?.id}
                />
                :<div></div>
              }
              {
                (deleteId===props?.answer?.id)
              
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

export default HomeScreenAnswers