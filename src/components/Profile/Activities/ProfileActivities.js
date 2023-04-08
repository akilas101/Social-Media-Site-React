import { LoaderDots } from '@thumbtack/thumbprint-react'
import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import IndividualAnswer from '../Answers/IndividualAnswer'
import IndividualQuestion from '../Questions/IndividualQuestion'

function ProfileActivities(props) {

    const [activites, setActivites]=useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    useEffect(() => {
            
      fetchActivites()
      
    //   {Axios.get('/').then((res)=>{console.log(res.data)})    
    // }
  });
  
    const fetchActivites = () =>{
      Axios.post('/api/activity/'+props.profile_id)
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
    return <div key={index} >
            {
                <IndividualQuestion 
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
  return <div key={index}  >
            {
                <IndividualAnswer
  
                answer={answer}
                history={props.history}
                condition={true}
                />
            }
  </div> 
  }
  
  
  })
    return loading ? <div ><LoaderDots size="small" style={{marginLeft:"50%"}}/></div>:
    <div className="profile-details-section">
        
    <div className="profile-details-section-header">
      <div className="profile-details-section-header-content"><h6> Recent Activites</h6></div>
    </div>
    {renderActivites}
    </div> 
}

export default ProfileActivities
