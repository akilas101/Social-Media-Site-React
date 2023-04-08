import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { postComment, removeComment } from '../../actions/commentActions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import ReactTooltip from 'react-tooltip'
import ReactRoundedImage from "react-rounded-image"
import SingleComment from './SingleComment'
import Axios from 'axios'
import ReplyComment from './ReplyComment'
import { LoaderDots } from '@thumbtack/thumbprint-react'
import { Audio,Rings,TailSpin } from  'react-loader-spinner'
import { Image } from 'cloudinary-react';
import Avatar from '@mui/material/Avatar';

import Badge from '@mui/material/Badge'

function Comment(props) {
    var trash_small = <FontAwesomeIcon icon ={faTrashAlt} size="sm"/>
    //console.log(props.comments)
    const dispatch = useDispatch()
    const [profilepic, setProfilePic] = useState('')
    const [commentText, setCommentText] = useState('')

    const userLoggedin = useSelector(state=>state.userLoggedin)
const [load,setLoad]=useState(false)
    const {userInfo1} = userLoggedin
const PHT = "Add a comment"

    const comment_post=useSelector(state=>state.commentPost)
    const {posted_comment}=comment_post

    
const [imageIds, setImageIds] = useState([]);


useEffect(async() => {  
  // const interval = setInterval(() => {

  loadImages();
// } ,3000);
// return () => clearInterval(interval);
}, []);


useEffect(()=>{
  if(posted_comment){
    setLoad(false)
   
    setCommentText('')
  
  // setComments(result.data)
 
  }      
},[comment_post])



useEffect(() => {  
  // const interval = setInterval(() => {
if(userInfo1)
  loadImages();
// } ,3000);
// return () => clearInterval(interval);
}, [userLoggedin])

useEffect(() => {  
  // const interval = setInterval(() => {
if(userInfo1!=true)
  loadImages();
// } ,3000);
// return () => clearInterval(interval);
}, [userLoggedin])

const loadImages = async () => {
  try {
     Axios.get('/api/profile/propics/'+userInfo1?.id)
     .then((res)=>{ console.log(res.data)
      setImageIds(res.data)})
     
  } catch (err) {
      console.error(err);
  }
};

    const registerComment=(answer_id)=>{
        dispatch(postComment(commentText, answer_id))
        setCommentText('')
      }

    const deleteComment= (comment_id)=>{
        
        dispatch(removeComment(comment_id))
     }

    //  useEffect(() => {
          
    //   Axios.get('/api/profile/image_url/'+userInfo1?.id)
    //   .then((res)=>{
    //     console.log(res.data)
    //     setProfilePic(res.data)
    //   })  
        
    //   },[])
    return (
        
        
            
            <div>
            { (userInfo1) &&
              <div className="comment-section">
            
              <div>
                
              {userInfo1?(userInfo1.status==='PRO')?<Badge
  overlap="rectangular"
  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
 color='info'
 badgeContent={"PRO"} 
 variant="string"
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

          <form className="comment-box" >
          <input type="text" name="" 
          className="comment-txt" 
          placeholder={PHT}
          onChange={(e)=>setCommentText(e.target.value)}
          value={commentText}/>
          </form>
              <div className="cs"
              onClick={(e)=>{registerComment(props.answer_id)
              setLoad(true)}}>
        { load?<div style={{marginTop:"7px"}}><TailSpin color="#00BFFF" height={20} width={20} /></div>   :  <div className="csac" style={{fontSize:"13px",marginTop:"0px"}}>  Add Comment
</div>  }            </div>
            </div>}
            
            {
              (props.comments.length>0) &&
              props.comments.map((comment)=>(
                ((!comment.responseToId) &&
                <React.Fragment key={comment._id}>
                <SingleComment comment={comment} deleteComment={deleteComment}  CommentLists={props.comments}/>

               </React.Fragment>
                )
              ))
              
              }
           
            </div>
    )
}

export default Comment
