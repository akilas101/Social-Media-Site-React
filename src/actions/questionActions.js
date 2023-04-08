import { QUESTION_FETCH_USER_REQUEST, QUESTION_FETCH_USER_SUCCESS, QUESTION_FETCH_USER_FAIL, 
    QUESTION_POST_REQUEST, QUESTION_POST_SUCCESS, QUESTION_POST_FAIL, QUESTION_POST_NULL, 
    QUESTION_EDIT_REQUEST, QUESTION_EDIT_SUCCESS, QUESTION_EDIT_FAIL, 
    QUESTION_DELETE_REQUEST, QUESTION_DELETE_SUCCESS, QUESTION_DELETE_FAIL, 
    QUESTION_FULL_REQUEST, QUESTION_FULL_SUCCESS, QUESTION_FULL_FAIL, QUESTION_PAGE_REQUEST,
     QUESTION_PAGE_SUCCESS, QUESTION_PAGE_FAIL ,QUESTION_REPORT_REQUEST,QUESTION_REPORT_FAIL,
     QUESTION_REPORT_SUCCESS,QUESTION_REPORT_NULL,
     QUESTION_UPVOTE_REQUEST,QUESTION_UPVOTE_SUCCESS,QUESTION_UPVOTE_FAIL,QUESTION_UPVOTE_NULL,
     QUESTION_UNUPVOTE_REQUEST,QUESTION_UNUPVOTE_SUCCESS,QUESTION_UNUPVOTE_FAIL,QUESTION_UNUPVOTE_NULL,
     QUESTION_DOWNVOTE_REQUEST,QUESTION_DOWNVOTE_SUCCESS,QUESTION_DOWNVOTE_FAIL,QUESTION_DOWNVOTE_NULL,
     QUESTION_UNDOWNVOTE_REQUEST,QUESTION_UNDOWNVOTE_SUCCESS,QUESTION_UNDOWNVOTE_FAIL,QUESTION_UNDOWNVOTE_NULL,

    } from '../constants/questionConstants'
import axios from 'axios'

const listQuestions = () => async (dispatch) => {
    
    try {
        dispatch({type:QUESTION_FULL_REQUEST});
        const {data} = await axios.get('/api/questions/')
        
        dispatch({type:QUESTION_FULL_SUCCESS, payload:data})

    } catch (error) {
        dispatch({type:QUESTION_FULL_FAIL, payload:error.message})
    }
}


const listQuestionsUser = (id) => async (dispatch, getState) => {
    
    const url = '/api/questions/fetch/'+id
    try {
        dispatch({type:QUESTION_FETCH_USER_REQUEST});
        const {data} = await axios.get(url)
    
        dispatch({type:QUESTION_FETCH_USER_SUCCESS, payload:data})

    } catch (error) {
        dispatch({type:QUESTION_FETCH_USER_FAIL, payload:error.message})
    }
}


const registerQuestion= (question,field) => async (dispatch, getState) =>{
    
    const { userLoggedin: { userInfo1 } } = getState();
    
    if(question===null) dispatch({type:QUESTION_POST_NULL})
    else{
    try {
        dispatch({type:QUESTION_POST_REQUEST});
        const {data} = await axios.post("/api/questions/",{question,interest:field},
        {
            headers: {
                Authorization: userInfo1.token
            }
        })
        
        dispatch({type:QUESTION_POST_SUCCESS, payload:data})
    } catch (error) {
        dispatch({type:QUESTION_POST_FAIL, payload:error.message})
    }
}}




const reportQuestion = (post,issue,comment)=>async(dispatch,getState)=>{
const {userLoggedin:{userInfo1}}=getState();

if(post===null) dispatch({type:QUESTION_REPORT_NULL})
else{
    try{
        dispatch({type:QUESTION_REPORT_REQUEST});
        // console.log("From  QUestion Action"+post+issue+comment)
        
        const {data} = await axios.post("/api/reports/",{post,issue,comment},
        {
            headers: {
                Authorization: userInfo1.token
            }})
            dispatch({type:QUESTION_REPORT_SUCCESS, payload:data})
}catch(error){ dispatch({type:QUESTION_POST_FAIL, payload:error.message})}
}
}




const editQuestion =(question,question_id)=>async (dispatch, getState)=>{
    const url = '/api/questions/edit/'+question_id
    const { userLoggedin: { userInfo1 } } = getState()
    console.log(userInfo1.id)
    try {
        dispatch({type:QUESTION_EDIT_REQUEST});
        const {data} = await axios.post(url,{question,user:userInfo1.id},
        {
            headers: {
                Authorization: userInfo1.token,
                
            }
        })
        
        dispatch({type:QUESTION_EDIT_SUCCESS, payload:data})
    } catch (error) {
        dispatch({type:QUESTION_EDIT_FAIL, payload:error.message})
    }   
}

const deleteQuestion =(question_id)=>async (dispatch, getState)=>{
    
    
    const url = '/api/questions/delete/'+question_id
    const { userLoggedin: { userInfo1 } } = getState()
    try {
        dispatch({type:QUESTION_DELETE_REQUEST});
        const {data} = await axios.delete(url,
        {
            headers: {
                Authorization: userInfo1.token
            }
        })
        
        dispatch({type:QUESTION_DELETE_SUCCESS, payload:data})
    } catch (error) {
        dispatch({type:QUESTION_DELETE_FAIL, payload:error.message})
    }   
}

const selectedQuestion = (id) =>async(dispatch)=>{
    try {
        let url = "/api/answers/question/"+id
        dispatch({type:QUESTION_PAGE_REQUEST});
        const {data} = await axios.get(url)
        
        dispatch({type:QUESTION_PAGE_SUCCESS, payload:data})
    } catch (error) {
        dispatch({type:QUESTION_PAGE_FAIL, payload:error.message})
    } 
}
const upvoteQuestion = (question_id,user_id)=>async(dispatch, getState)=>{
    let url= "/api/questions/upvote/"+question_id
    const { userLoggedin: { userInfo1 } } = getState()

    const x= {
      question:question_id,
      user:user_id
    }
    try {
        dispatch({type:QUESTION_UPVOTE_REQUEST})
        const {data}= await axios.post(url,x,{
            headers:{
                 Authorization:userInfo1?.token
            }})
        dispatch({type:QUESTION_UPVOTE_SUCCESS, payload:data})



    } catch (error) {
        dispatch({type:QUESTION_UPVOTE_FAIL, payload:error.message})
    }   

}
const unUpvoteQuestion = (question_id,user_id)=>async(dispatch, getState)=>{
    let url= "/api/questions/UnUpvote/"+question_id
    const { userLoggedin: { userInfo1 } } = getState()

    const x= {
      question:question_id,
      user:user_id
    }
    try {
        dispatch({type:QUESTION_UNUPVOTE_REQUEST})
        const {data}= await axios.post(url,x,{
            headers:{
                 Authorization:userInfo1?.token
            }})
        dispatch({type:QUESTION_UNUPVOTE_SUCCESS, payload:data})



    } catch (error) {
        dispatch({type:QUESTION_UNUPVOTE_FAIL, payload:error.message})
    }   

}
const downvoteQuestion = (question_id,user_id)=>async(dispatch, getState)=>{
    let url= "/api/questions/downvote/"+question_id
    const { userLoggedin: { userInfo1 } } = getState()

    const x= {
      question:question_id,
      user:user_id
    }
    try {
        dispatch({type:QUESTION_DOWNVOTE_REQUEST})
        const {data}= await axios.post(url,x,{
            headers:{
                 Authorization:userInfo1?.token
            }})
        dispatch({type:QUESTION_DOWNVOTE_SUCCESS, payload:data})



    } catch (error) {
        dispatch({type:QUESTION_DOWNVOTE_FAIL, payload:error.message})
    }   


}
const unDownvoteQuestion = (question_id,user_id)=>async(dispatch, getState)=>{
    let url= "/api/questions/UnDownvote/"+question_id
    const { userLoggedin: { userInfo1 } } = getState()

    const x= {
      question:question_id,
      user:user_id
    }
    try {
        dispatch({type:QUESTION_UNDOWNVOTE_REQUEST})
        const {data}= await axios.post(url,x,{
            headers:{
                 Authorization:userInfo1?.token
            }})
        dispatch({type:QUESTION_UNDOWNVOTE_SUCCESS, payload:data})



    } catch (error) {
        dispatch({type:QUESTION_UNDOWNVOTE_FAIL, payload:error.message})
    }   

}




export {listQuestionsUser, 
    registerQuestion, 
    editQuestion, 
    deleteQuestion, 
    listQuestions, 
    selectedQuestion,
     reportQuestion,
     upvoteQuestion,
     unUpvoteQuestion,
     downvoteQuestion,
     unDownvoteQuestion,
    }
