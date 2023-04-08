import React, {useState} from 'react'
import ReactDom from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import {useDispatch, useSelector} from 'react-redux'
import { reportQuestion } from '../../actions/questionActions';
import { LoaderDots } from '@thumbtack/thumbprint-react'
import {Select} from 'react-daisyui'

// Importing toastify module
import {toast} from 'react-toastify';
 
// Import toastify css file
import 'react-toastify/dist/ReactToastify.css';
 
 // toast-configuration method,
 // it is compulsory method.
toast.configure()




export default function QuestionModal({ open, onClose, postq,props }){
   
  
  
  
  const dispatch = useDispatch()
    const [textAreaValue, setTextAreaValue]=useState('')    
    const [IssueValue, setIssueValue]=useState('')
    
    
    const reportedQuesiton = useSelector(state => state.questionReport)
    let {  loading, report,issue ,comment,post} = reportedQuesiton
    
    
    /*------------*/
    const Close=()=>{
            
      onClose()
        
      post=null
    issue=null
    comment=null
report=null
      dispatch(reportQuestion(post,issue,comment))
    }
    


    // const addReport=()=>{
    //   question=null
    //   issue=null

    //   dispatch(reportQuestion(question,field))
    // }


    
    const postReport = (e) =>{
        const post= postq
        const issue=IssueValue  
        const comment =textAreaValue     
        dispatch(reportQuestion(post,issue,comment))
    }

    
    

    if(!open) return null

    var FT = <FontAwesomeIcon icon={faTimes}/>
    return ReactDom.createPortal(
    <>
      <div className='overlay-modal' onClick={Close}/>
      <div className='delete-modal'>
      
        <div className="topDlt">

          <div className="delete-modal-title" onClick={postReport} style={{fontFamily:"sans-serif",fontSize:"20px"}}>Why do you want to report this post?</div>
          <div className="close" onClick={Close}>{FT}</div>
        </div>

        <div className="delete-middle" style={{height:"130px"}}>
        <select color='secondary' bordered='true' 
      
      style={{marginLeft:"80px",marginTop:"20px", borderRadius:"3px",
  boxShadow:" 0 0 2px #3e5a70"}} placeholder="Issue"  onChange={(e)=>setIssueValue(e.target.value)}>
      <option selected="selected">
</option>
        <option value='Inappropriate for underage users'>Inappropriate for underage users</option>
        <option value='Offensive'>Offensive</option>
        <option value='Hate Speech'>Hate Speech</option>
        <option value='Misleading'>Misleading</option>
        <option value="Other">Other</option>
      </select>
        {
          loading ? <div><LoaderDots size="small"/></div>:
          issue ? <div className="middle-content">
            Report submitted Successfully
          </div>:
        
        <div>
       { (IssueValue==="Other")?<div className="middle-content">
        <textarea type="text" 
        className="middle-content-input" 
        placeholder="complaint you want to submit"
        onChange={(e)=>setTextAreaValue(e.target.value)}
        rows={2}
        /></div>:<div></div>}
{/* <div className="flex w-full component-preview p-4 items-center justify-center gap-2 font-sans">
     
    </div> */}
{/* </div> */}
  
       </div>
        
        }
        </div>
        <div className="delete-bottom" style={{height:"30px"}}>
          <div className=" bottom-cancel-button" style={{marginTop:"0px"}} onClick={Close}>Cancel</div>
          { loading ? null:
            (report)?<div 
           >
            { toast.success('Report sent!', {
         // Set to 15sec
         position: toast.POSITION.TOP_CENTER, autoClose:2000})}
           {Close()}</div>:
            <div 
            className="bottom-delete-button"
            onClick={postReport}style={{marginTop:"0px"}}
            >Submit</div>
            
          }
          
        </div>
      </div>
    </>,
    document.getElementById('portal')
    )  
    }