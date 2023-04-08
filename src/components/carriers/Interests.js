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
import AddInterest from '../follow/AddInterest'
import Axios from 'axios'
import { LikeOutlined } from '@ant-design/icons'
import Like from '../Profile/Answers/Like'
import Dislike from '../Profile/Answers/Dislike'
import ReactRoundedImage from "react-rounded-image"
// import {Divider,Card,Button} from 'react-daisyui'

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';



const Interests = (props) => {
    // console.log(props)
    // var comment = <FontAwesomeIcon icon ={faComment}/>
    // var share = <FontAwesomeIcon icon ={faShare}/>
    // var trash = <FontAwesomeIcon icon ={faTrashAlt}/>
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
  
    

    
    return (
                                
      // <button class="inline-block cursor-pointer rounded-md bg-gray-800 px-4 py-3 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-900"></button>


// {/* <Card background="black"> */}
//       {/* <Card.Image
      
      
//       /> */}
    //   <Card.Body className="items-center text-center">
    //     <Card.Title tag="h4"> <NavLink exact to={"/Interests/interes/"}
    //             target="_blank"
    //             onClick={(e)=>{Profile(props.answer.user_id)}}
    //             >{props.interest.name}</NavLink></Card.Title>
    //     {/* <p>{props.interest.description}</p> */}
    //     <Card.Actions className="justify-end">
    //       {
    //             userInfo1?<AddInterest
                    
    //                 id={props.interest._id}
    //             />:null
    //         }
    //     </Card.Actions>
    //   </Card.Body>
    // </Card> 
  

  // {props.notifications.subject}

            
  <Card style={{ width: '18rem',height:"290px"}}>
  <Card.Img variant="top" src="https://cdn-blog.novoresume.com/articles/hobbies-and-interests-to-put-on-a-resume/interests-for-resume.png" />
  <Card.Body>
    <Card.Title><NavLink exact to={"/Interests/interes/"}
                target="_blank"
                onClick={(e)=>{Profile(props.answer.user_id)}}
                >{props.interest.name}</NavLink>
    </Card.Title>
    <Card.Text numberOfLines={1} ellipsizeMode='tail' style={{textOverflow: "ellipsis",overflow: "hidden"}}>
      <div style={{textOverflow: "ellipsis",overflow: "hidden",width:"100%",maxHeight:"25px",whiteSpace: "nowrap"}}>
    {props.interest.description}</div>
    </Card.Text>
    {
                userInfo1?<AddInterest
                    
                    id={props.interest._id}
                />:null
            }
  </Card.Body>
</Card>
            )}
            export default Interests