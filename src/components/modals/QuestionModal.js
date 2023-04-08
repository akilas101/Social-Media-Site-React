import React, {useState} from 'react'
import ReactDom from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import {useDispatch, useSelector} from 'react-redux'
import { registerQuestion } from '../../actions/questionActions';
import { LoaderDots } from '@thumbtack/thumbprint-react'
import { useEffect  } from 'react'

//modals imported from bootstrap
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form'
export default function QuestionModal({ open, onClose }){
   
  
  
  
  const dispatch = useDispatch()
    const [textAreaValue, setTextAreaValue]=useState('')    
    const [fieldValue, setFieldValue]=useState('')
    
    
    const postedQuesiton = useSelector(state => state.questionPost)
    let {  loading, question ,field} = postedQuesiton
    const q=postedQuesiton;
    
    /*------------*/
    const Close=()=>{
            
      onClose()
        
      question=null
    field=null
      dispatch(registerQuestion(question,field))
      // window.location.reload();
    }
    

    const askQuestion=()=>{
      question=null
      field=null
      dispatch(registerQuestion(question,field))
    }


    const postQuestion = (e) =>{
        const question=textAreaValue 
        const field=fieldValue       
        dispatch(registerQuestion(question,field))
        onClose()
    }

  
    

    if(!open) return null

    var FT = <FontAwesomeIcon icon={faTimes}/>
    return ReactDom.createPortal(
    <>
      {/* <div className='overlay-modal' onClick={Close}/>
      <div className='style-modal'>
      
        <div className="top bg-color">

          <div className="modal-title" onClick={postQuestion}>Add Question</div>
          <div className="close" style={{color:"red"}} onClick={Close}>{FT}</div>
        </div>

        <div className="middle">
        {
          loading ? <div><LoaderDots size="small"/></div>:
          question ? <div className="middle-content">
            Posted Successfully
          </div>:
        
        <div>
        <div className="middle-content">
        <textarea type="text" 
        className="middle-content-input" 
        placeholder="Enter Your Question"
        onChange={(e)=>setTextAreaValue(e.target.value)}
        rows={5}
        />
         <Form.Control
          placeholder="Enter Your Question"
          aria-label="Username"
          aria-describedby="basic-addon1"
          onChange={(e)=>setTextAreaValue(e.target.value)}
          as="textarea"
        />
            <div className="field">    
            <textarea type="text" 
        className="ftextarea" 
        placeholder="Enter field"
        onChange={(e)=>setFieldValue(e.target.value)}
        row={1}
        /> 
</div>
  
        </div>
          </div>
        }
        </div>
        <div className="bottom bg-color">
          <div className=" bottom-cancel" onClick={Close}>Cancel</div>
          { loading ? null:
            (question)?<div 
            className="bottom-add-question link-blue"
            onClick={askQuestion}
            >Another Question</div>:
            <div 
            className="bottom-add-question link-blue"
            onClick={postQuestion}
            >Add Question</div>
            
          }
          
        </div>
      </div> */}

      <Modal show={open} onHide={Close}>
        <Modal.Header closeButton>
          <Modal.Title>Post Question</Modal.Title>
        </Modal.Header>
        <Modal.Body>
       <div>  <Form.Control
          placeholder="Enter Your Question"
          aria-label="Username"
          aria-describedby="basic-addon1"
          onChange={(e)=>setTextAreaValue(e.target.value)}
          as="textarea"
        />
        </div>
        <div style={{marginTop:"5px"}}>
          <Form.Control
          // placeholder="Enter Your Question"
          aria-label="Username"
          aria-describedby="basic-addon1"
         
          placeholder="Enter field"
          onChange={(e)=>setFieldValue(e.target.value)} 
          as="textarea"
        />
        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={Close}>
              <div onClick={Close}>Cancel</div>
          </Button>
          <Button variant="primary" >
             { loading ? null:
            (question)?<div 
          
            onClick={askQuestion}
            >Another Question</div>:
            <div 
          
            onClick={postQuestion}
            >Add Question</div>
            
          }
          </Button>
        </Modal.Footer>
      </Modal>
    </>,
    document.getElementById('portal')
    )  
    }