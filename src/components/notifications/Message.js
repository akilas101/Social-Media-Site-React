import React, {useState, useEffect} from 'react'
import {Link,NavLink} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faShare, faTrashAlt, faTh, faCaretUp, faCaretDown, faComment  } from '@fortawesome/free-solid-svg-icons'
import ReactTooltip from 'react-tooltip'
import {useDispatch, useSelector} from 'react-redux'
import DeleteAnswer from '../modals/DeleteAnswer'
import TextEditor from '../editor/Editor'
// import './HomeScreenAnswers.css'
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
import {Divider,Card,Button} from 'react-daisyui'

import {toast} from 'react-toastify';
 
// Import toastify css file
import 'react-toastify/dist/ReactToastify.css';

toast.configure()
const Message = (props) => {
    // console.log(props)
    // var comment = <FontAwesomeIcon icon ={faComment}/>
    // var share = <FontAwesomeIcon icon ={faShare}/>
    var trash = <FontAwesomeIcon icon ={faTrashAlt}/>
    // var editIcon = <FontAwesomeIcon icon={faTh}/>
    // var upvote = <FontAwesomeIcon icon={faCaretUp} size="2x" />
    // var down = <FontAwesomeIcon icon ={faCaretDown} size="2x"/>
    
    
    const dispatch = useDispatch()
    
    
    // const [deleteOpen, setDeleteOpen] = useState(false)
    // const [deleteId, setDeleteId] = useState('')
    // const [answerId, setAnswerId] = useState('')
    // const [commentId, setCommentId]=useState('')
    // const [commentNumbers, setCommentNumbers]=useState('')
    // const [comments, setComments]=useState([])
    // const [loading_show_comment, setLoading]=useState(true)
    const [date, setDate] = useState('')
    // const [likeCount, setLikeCount] = useState('')
    // const [likeAction, setLikeAction] = useState('')
    // const [dislikeAction, setDislikeAction] = useState('')





    const userLoggedin = useSelector(state=>state.userLoggedin)
    const p_d = useSelector(state=>state.userProfile)
    // const comments_data = useSelector(state=>state.commentShow)
    // const comment_post=useSelector(state=>state.commentPost)
    // const comment_delete=useSelector(state=>state.commentDelete)
    // const question=useSelector(state=>state.selectedQuestion)
    
    // const {posted_comment}=comment_post
    // // const {loading_show_comment, comments} = comments_data
    // const {message} = comment_delete
    // const {question_data} = question
    
    
    
    const {userInfo1} = userLoggedin
     
    const Profile = (id) =>{
    
      dispatch(profile(id))
    }
  const handleDelete = async()=>{
    Axios.delete("/api/notification/",{id:props.notifications._id},{
      headers:{
Authorization: userInfo1?.token

    }
  }).catch(err=> toast.warning('Problem removing notification', {
    // Set to 15sec
    position: toast.POSITION.TOP_CENTER, autoClose:1000}))
}
   
    
    return (
                                
      // <button class="inline-block cursor-pointer rounded-md bg-gray-800 px-4 py-3 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-900"></button>


<Card background="black" style={{width:"750px", marginTop:"40px"}}>
      {/* <Card.Image
      
      
      /> */}
      <Card.Body className="items-center text-center">
        <Card.Title tag="h4"></Card.Title>
        <p><strong>{props.notifications.subject}</strong></p>
        <Card.Actions className="justify-end">
          {

<div>
{props.notifications.message}
{props.notifications.questionTo?<NavLink  exact to ={"/SelectedQuestions/"+props.notifications.questionTo} style={{fontSize:"10px"}}>
  Go to question</NavLink >:null
}
</div>
             
            }
        </Card.Actions>
        {(userInfo1&&userInfo1.id!==Profile._id) &&
                <div onClick={(e)=>handleDelete()} style={{cursor:"pointer"}}> {trash}</div>}
      </Card.Body>
    </Card> 

           

            )}
            export default Message