import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import ReactTooltip from 'react-tooltip'
import ReplyComment from './ReplyComment'
import ReactRoundedImage from "react-rounded-image"
import Axios from 'axios'

import { Image } from 'cloudinary-react';
import Avatar from '@mui/material/Avatar';

import Badge from '@mui/material/Badge'

function SingleComment(props) {
    const userLoggedin=useSelector(state=>state.userLoggedin)
    const {userInfo1} = userLoggedin
    console.log(props)
    var trash_small = <FontAwesomeIcon icon ={faTrashAlt} size="sm"/>
    const [date, setDate] = useState('')  
    const [profilepic, setProfilePic] = useState('')

    useEffect(()=>{
      Axios.get('/api/activity/date/'+props?.comment?.date).
        then((date)=>{
          setDate(date?.data)
          })
        .catch((err)=>{console.log(err)})
    },[])
    useEffect(() => {
          
      Axios.get('/api/profile/image_url/'+props?.comment?.user?._id)
      .then((res)=>{
        console.log(res?.data)
        setProfilePic(res?.data)
      })  
        
      },[])

          
const [imageIds, setImageIds] = useState([]);


useEffect(async() => {  
  // const interval = setInterval(() => {

  loadImages();
// } ,3000);
// return () => clearInterval(interval);
}, []);


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
     Axios.get('/api/profile/propics/'+props.comment?.user?._id)
     .then((res)=>{ console.log(res.data)
      setImageIds(res.data)})
     
  } catch (err) {
      console.error(err);
  }
};

    return (
        <div>
        
            <div className="individual-comment" key={props.comment?._id}>
            <div className="comment-user">
            <div>
                
                {props.comment?.user?(props.comment?.user?.status==='PRO')?<Badge
    overlap="rectangular"
    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
   color='info'
   badgeContent={"P"} 
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
              //  color='success'
                
              //  variant="dot"
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
            <div className="comment-user-details">
            <p className="" style={{paddingRight:"5px"}}><strong>{props.comment?.user?.username}</strong></p>
            <p className="white card-separator" style={{paddingRight:"5px"}}>.</p>
            <p className="white">{date}</p>  
            </div>
            </div>
            <div className="particular-comment">
              {
                props.comment.content
              }
            </div>
            
            <div className="comment-buttons">
            <div >
            {/* <ReplyComment CommentLists={props.CommentLists} parentCommentId={props.comment._id} answerId={props.comment.answerId}  /> */}
            </div>
            {
                (userInfo1?.id===props?.comment?.user?._id) &&
                <div> <div className="comment-delete"
                data-tip data-for="deleteCommentTip"
                onClick={(e)=>{props.deleteComment(props?.comment?._id)}}>
                  {trash_small}
                </div>
                <ReactTooltip id="deleteCommentTip" place="top" effect="solid">
               Delete Comment
             </ReactTooltip>   
                </div>
            }
            </div>
           
            </div>
            
        </div>
    )
}

export default SingleComment
