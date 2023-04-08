import React from "react";
import "./css/Sidebar.css";
import SidebarOptions from "./SidebarOptions";
import { useState, useEffect, useRef} from 'react'
import Axios from 'axios'
import Foot from './Foot'
function Sidebar(props) {


  const [frequent, setFrequent]=useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)


  
  useEffect(() => {
          
    fetchFAQ()
    
  //   {Axios.get('/').then((res)=>{console.log(res.data)})    
  // }
},[]);

  const fetchFAQ= async() =>{
   Axios.get('/api/activity/frequent')
    .then((res)=>{
    //    console.log(res.data)
        setFrequent(res?.data)
        setLoading(false)
     

    })  
    .catch((err)=>{console.log(err)})
}

let count=0
    
const renderFAQ =frequent.map((q, index)=>{
  count=count+1
  console.log(count)
  
if(q){
  
  const question={
    _id:q._id,
    question:q.question,
    upvotes:q.upvotes
  }
  console.log(q.quesiton)
  return <div key={index} >
         {
            <SidebarOptions 
            question={question}
            history={props.history}
            />
         }
</div> 
}
})

return (
  // <div className="side" style={{display:"inline-list-item", paddingLeft:"10px",
  // marginLeft:"10px",
  // width:"320px",
  //   borderBottom: "solid 2px #e3e8e5",
  //   backgroundColor:" #fff",
  //   border:"2px solid lightgray",
  //   borderRadius: "5px"}}>
  <div className="widget" >
    <div className="widget__header">
      <h5  style={{marginLeft:"18%"}}>Popular Questions</h5>
    </div>
    <div className="widget__contents" style={{marginTop:"2%"}}>
     {renderFAQ}
    </div>  
    <div className="widget__contents" style={{marginTop:"20%"}}>
    <Foot/>
    </div>  
   </div>
 

 

);
}

export default Sidebar;
