// import React from 'react';
import ReactDOM from 'react-dom'
import React, { useState, useEffect, useRef} from 'react'
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faShare, faTrashAlt, faTh, faCaretUp, faCaretDown, faComment  } from '@fortawesome/free-solid-svg-icons'
import ReactTooltip from 'react-tooltip'
import {useDispatch, useSelector} from 'react-redux'
import DeleteAnswer from '../modals/DeleteAnswer'
import TextEditor from '../editor/Editor'
//import '../HomeScreen/HomeScreen.css'
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
import './gridcar.css'
import Widgets from '../Widget'
import Interests from './Interests'
import Sidebar from '../Sidebar'
import ReactRoundedImage from "react-rounded-image"
import {Divider} from 'react-daisyui'
import daisyui from 'daisyui';
import { Audio,Rings,TailSpin } from  'react-loader-spinner'



function Carriers(props){
    

  const [interests, setInterests]=useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)

  
  useEffect(() => {
          
    fetchInterests()
    
  //   {Axios.get('/').then((res)=>{console.log(res.data)})    
  // }
},[]);

  const fetchInterests = async() =>{
   Axios.get('/api/interests/')
    .then((res)=>{
    //    console.log(res.data)
        setInterests(res.data)
        setLoading(false)
     

    })  
    .catch((err)=>{console.log(err)})
}

let count=0
    
const renderInterests =interests.map((field, index)=>{
  count=count+1
  console.log(count)
  
if(field){
  
  const interest={
      _id:field._id,
    name:field.name,
      followers:[],
      following:[],
      description:field.description
  }
//   console.log(field.name)
  return <div key={index} >
         {
            <Interests 
            interest={interest}
            history={props.history}
            />
         }
</div> 
}

}) 
    return(  <main className='gridmain'>
        <div className='homee-carriers'>
   
  
        <div className='wraper-carriers'>
       
        {
      loading ? <div style={{paddingTop:"40px"}}><TailSpin color="#00BFFF" height={30} width={30} /></div>: 
      <div className='wrapper-carriers' > 
           
       
          {renderInterests}
         
      </div>

    }
    </div>
    
    
    
     { <div className="widgets-carriers" > <Widgets/></div>}
     </div>
    </main>)
    }
        

export default Carriers;