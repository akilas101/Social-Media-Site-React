// import React from 'react';

import React, { useState, useEffect, useRef} from 'react'
import { useSelector } from 'react-redux';
import Axios from 'axios'
import WidgetContent from "./WidgetContent";
import "./css/Widget.css";


function Widget(props){
    

  const [interests, setInterests]=useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
const[length,setLength] = useState(1)



const userLoggedin = useSelector(state=>state.userLoggedin)
const p_d = useSelector(state=>state.userProfile)
  
const {userInfo1} = userLoggedin
  
  
  useEffect(() => {
          
    fetchInterests()
    
  //   {Axios.get('/').then((res)=>{console.log(res.data)})    
  // }
},[]);

  const fetchInterests = async() =>{
    if(userInfo1){
   Axios.post('/api/following/'+userInfo1.id)
    .then((res)=>{
    //    console.log(res.data)
        setInterests(res.data)
        setLoading(false)
     

    })  
    .catch((err)=>{console.log(err)})}
    else{
    Axios.get('/api/interests/')
    .then((res)=>{
    //    console.log(res.data)
        setInterests(res.data)
        setLoading(false)
     

    })  
    .catch((err)=>{console.log(err)})

}
  }

let count=0
    
const renderInterests =interests.map((field, index)=>{
  count=count+1
  console.log(count)
  
if(field){
 

  const interest={
      _id:field.interestTo?._id,
    name:field.interestTo?.name,
      followers:[],
      following:[],
      description:field.interestTo?.description,
     
  }
  console.log(field.name)
  return <div key={index} >
         {
            <WidgetContent 
            interest={interest}
            history={props.history}
            />
         }
</div> 
}
})

  return (
    <div className="widget">
      <div className="widget__header">
        
        
        
        
      {userInfo1?  <h6 >Carrier interests you follow</h6>:<h6>stats</h6>
      }
      
      
      </div>
      <div className="widget__contents">
       {renderInterests}
      </div>
    </div>
  );

}

export default Widget
