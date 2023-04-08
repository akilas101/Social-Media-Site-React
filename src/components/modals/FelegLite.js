// import { Avatar } from "@material-ui/core";
import React from "react";
// import { selectUser } from "../feature/userSlice";
import "../css/QuoraBox.css";
import ReactDom from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import {useDispatch, useSelector} from 'react-redux'
import { registerQuestion } from '../../actions/questionActions';
import { LoaderDots } from '@thumbtack/thumbprint-react'
import { useEffect  } from 'react'
import {useState} from 'react'
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form'

import {toast} from 'react-toastify';
 
import FieldSearchModal from '../../components/modals/fieldSearch'
import { searchFieldDispatch, searchFieldText } from '../../actions/searchActions'


// Import toastify css file
import 'react-toastify/dist/ReactToastify.css';
 import Alert from '../Alert'
 // toast-configuration method,
 // it is compulsory method.
toast.configure()


function FelegLite() {
//   const user = useSelector(selectUser);


const [successMsg, setSuccessMsg] = useState('success');
const [errMsg, setErrMsg] = useState('');
const[isSearchOpen, setIsSearchOpen] = useState(false)
  
const dispatch = useDispatch()
const [textAreaValue, setTextAreaValue]=useState('')    
const [fieldValue, setFieldValue]=useState('')
const [text, setText] = useState("")

const userLoggedin = useSelector(state => state.userLoggedin)
const {  userInfo1 } = userLoggedin

const postedQuesiton = useSelector(state => state.questionPost)
let {  loading, question ,field} = postedQuesiton
const q=postedQuesiton;

/*------------*/


const handleNonLoggedin = ()=>{
  toast.warning('Only logged in users can post questions', {
      // Set to 3sec
      position: toast.POSITION.TOP_CENTER, autoClose:3000})
}


const askQuestion=()=>{
  question=null
  field=null
  dispatch(registerQuestion(question,field))
}


const postQuestion =async (e) =>{
    const question=textAreaValue 
    const field=fieldValue       
    const x = await dispatch(registerQuestion(question,field))
    window.location.reload();
}

const search = (e)=>{
      
  dispatch(searchFieldText(e.target.value))
  setText(e.target.value)
}
  return (
    <div className="quoraBox">
      <div className="quoraBox__info">
        {/* <Avatar /> */}
      </div>
      <h5>Ask Anything</h5>
      <div className="quoraBox__quora">
        <>
        {errMsg?<><Alert msg={errMsg} type="danger" /></>
          :null}
        </>
      <div  style={{width:"100%"}}>
      <div>  <Form.Control
          placeholder="Enter Your Question"
          aria-label="Username"
          aria-describedby="basic-addon1"
          onChange={(e)=>setTextAreaValue(e.target.value)}
          as="textarea"
        /></div>
        
            <div className="field" style={{display:"flex"}}>    
            <div style={{marginTop:"5px"}}>
          <Form.Control
          // placeholder="Enter Your Question"
          aria-label="Username"
          aria-describedby="basic-addon1"
         
          placeholder="Enter field"
          onChange={(e)=>setFieldValue(e.target.value)} 
          
        />
             {/* <div className="search-box">
        <input 
        type="text" 
        name="" 
        className="search-txt" 
        placeholder="Type to search"
        onChange={(e)=>{search(e)}}
        onFocus={()=>setIsSearchOpen(true)}
        />
		    <div className="search-btn" style={{color:"#007bff",cursor:"pointer"}} >
		      	
        </div>
        <FieldSearchModal
          open={isSearchOpen}
          onClose={()=>setIsSearchOpen(false)}
          text={text}
        />
        </div> */}
        </div>
         
        
         { loading ? null:
            (question)?<div  style={{paddingTop:"10px"}}
            className="bottom-add-question-homescreen"
            onClick={(e)=>{userInfo1?askQuestion():handleNonLoggedin(e)}}
            >Another Question</div>:
            <div style={{paddingTop:"10px"}}
            className="bottom-add-question-homescreen"
            onClick={(e)=>{userInfo1?postQuestion():handleNonLoggedin(e)}}
            >Add Question
           
            </div>
            
          }
          
       
        </div>
       
      </div>
      </div>
     
    </div>
  );
}

export default FelegLite;