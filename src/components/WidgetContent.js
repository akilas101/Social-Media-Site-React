
import "./css/WidgetContent.css";
import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { profile, profile_details } from '../actions/userActions'
import {Theme,Button} from 'react-daisyui'
import Axios from 'axios'
const WidgetContent = (props) => {
    
    const dispatch = useDispatch()
    const [date, setDate] = useState('')
const [length,setLength] = useState('')  
const[lengthA,setLengthA]=useState('')

    const userLoggedin = useSelector(state=>state.userLoggedin)
    const p_d = useSelector(state=>state.userProfile)

    
    const {userInfo1} = userLoggedin
     
    const Profile = (id) =>{
    
      dispatch(profile(id))
    }
  useEffect(()=>{
    if(props.interest._id){
    Axios.get('/api/interests/Tquestions/'+props.interest._id)
    .then((res)=>{
      setLength(res.data.q)
      setLengthA(res.data.a)
    }).catch(err=>{console.log(err+" in Tquestions")})
  
  }
},[])
 
  return (
    <div className=" widget__contents">
      <div className="widget__content">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUdyH03bdKGLoMipJggTh0OkjJugfqDlb5hw&usqp=CAU"
          alt=""
        />
        <div className="widget__contentTitle">
          <h5>{props.interest.name}</h5>
          <Theme dataTheme="dark">
          {/* <h5>{props.interest.questions} questions asked</h5> */}
       
       
        <p style={{fontSize:"13px"}}> {length} question(s) submitted</p>
       
       
        <p style={{fontSize:"13px"}}>{lengthA} answer(s) posted</p>
      </Theme>
        </div>
      </div>
    </div>
  );
}

export default WidgetContent;
