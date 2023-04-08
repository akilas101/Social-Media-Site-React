import '../constants/answerConstants'
import axios from 'axios'
import {
    ANSWER_DELETE_FAIL, ANSWER_DELETE_REQUEST, ANSWER_DELETE_SUCCESS,   
    ANSWER_EDIT_FAIL, ANSWER_EDIT_REQUEST, ANSWER_EDIT_SUCCESS, 
    ANSWER_FETCH_USER_FAIL, ANSWER_FETCH_USER_REQUEST, ANSWER_FETCH_USER_SUCCESS, 
    ANSWER_POST_FAIL, ANSWER_POST_NULL, ANSWER_POST_REQUEST, ANSWER_POST_SUCCESS, 
    ANSWER_SHOW_FAIL, ANSWER_SHOW_REQUEST, ANSWER_SHOW_SUCCESS,  ANSWER_EDIT_NULL ,
    ANSWER_UPVOTE_REQUEST,ANSWER_UPVOTE_SUCCESS,ANSWER_UPVOTE_FAIL,ANSWER_UPVOTE_NULL,
    ANSWER_UNUPVOTE_REQUEST,ANSWER_UNUPVOTE_SUCCESS,ANSWER_UNUPVOTE_FAIL,ANSWER_UNUPVOTE_NULL,
    ANSWER_DOWNVOTE_REQUEST,ANSWER_DOWNVOTE_SUCCESS,ANSWER_DOWNVOTE_FAIL,ANSWER_DOWNVOTE_NULL,
    ANSWER_UNDOWNVOTE_REQUEST,ANSWER_UNDOWNVOTE_SUCCESS,ANSWER_UNDOWNVOTE_FAIL,ANSWER_UNDOWNVOTE_NULL,


} from '../constants/answerConstants';

const postAnswer = (answer, question) => async(dispatch, getState) =>{
    const { userLoggedin: { userInfo1 } } = getState();
    const url = "/api/answers/post/"+question
    console.log(url)
    if(question===null) dispatch({type:ANSWER_POST_NULL})
    else{
    try {
        console.log("Question "+question+"   Answer "+answer)
        dispatch({type:ANSWER_POST_REQUEST});
        const {data} = await axios.post(url,{answer},
        {
            headers: {
                Authorization: userInfo1.token
            }
        })
        
        dispatch({type:ANSWER_POST_SUCCESS, payload:data})
       // dispatch({type:ANSWER_POST_NULL})
    } catch (error) {
        dispatch({type:ANSWER_POST_FAIL, payload:error.message})
    }
}}

const individualAnswer = (answer_id) => async(dispatch) =>{
    
    try {
        dispatch({type:ANSWER_SHOW_REQUEST});
        let url = "/api/answers/fetch/"+answer_id
        const answer_details = await axios.get(url)
    
        url = "/api/profile/"+answer_details.data.user
        const user_profile = await axios.get(url)
    
        url = '/api/questions/'+answer_details.data.question
        const question = await axios.get(url)
    
        const data={
                _id:answer_details.data._id,
                user:user_profile.data.username,
                answer:answer_details.data.answer,
                question:question.data[0].question,
                upvotes:answer_details.data.upvotes,
                downvotes:answer_details.data.downvotes,
                date:answer_details.data.date
            }    
        dispatch({type:ANSWER_SHOW_SUCCESS, payload:data})
            } 
        catch (error) {
        dispatch({type:ANSWER_SHOW_FAIL, payload:error.message})
    }
}

const listAnswersUser = (id) => async (dispatch, getState) => {
    
    
    try {
        dispatch({type:ANSWER_FETCH_USER_REQUEST});
        let url = '/api/answers/user_fetch/'+id
    
        const answers = await axios.get(url)
        dispatch({type:ANSWER_FETCH_USER_SUCCESS, payload:answers.data})

    } catch (error) {
        dispatch({type:ANSWER_FETCH_USER_FAIL, payload:error.message})
    }
}


const editAnswer =(answer,answer_id)=>async (dispatch, getState)=>{
    const url = '/api/answers/edit/'+answer_id
    const { userLoggedin: { userInfo1 } } = getState()
    if(answer===null)dispatch({type:ANSWER_EDIT_NULL})
    else{
    try {
        dispatch({type:ANSWER_EDIT_REQUEST});
        const {data} = await axios.post(url,{answer},
        {
            headers: {
                Authorization: userInfo1.token
            }
        })
        
        dispatch({type:ANSWER_EDIT_SUCCESS, payload:data})
    } catch (error) {
        dispatch({type:ANSWER_EDIT_FAIL, payload:error.message})
    }   
}
}



const deleteAnswer =(answer_id)=>async (dispatch, getState)=>{
       
    const url = '/api/answers/delete/'+answer_id
    
    const { userLoggedin: { userInfo1 } } = getState()
    try {
        dispatch({type:ANSWER_DELETE_REQUEST});
        const {data} = await axios.delete(url,
        {
            headers: {
                Authorization: userInfo1.token
            }
        })
        
        dispatch({type:ANSWER_DELETE_SUCCESS, payload:data})
    } catch (error) {
        dispatch({type:ANSWER_DELETE_FAIL, payload:error.message})
    }   
}

const upvoteAnswer = (answer_id,user_id)=>async(dispatch, getState)=>{

     let url= "/api/like/upvote/"+answer_id
    //  console.log(url)
    const { userLoggedin: { userInfo1 } } = getState()

     const x= {
       answer:answer_id,
       user:user_id
     }
     try {
        dispatch({type:ANSWER_UPVOTE_REQUEST})
       const {data}= await axios.post(url,x,{
        headers:{
             Authorization:userInfo1?.token
        }})
        dispatch({type:ANSWER_UPVOTE_SUCCESS, payload:data})
        //   if(response.data.success){
    //         setLength(length+1)
    //         setIsUp(true)
    //           console.log("likedddddddddddddddddddd")
    //       }
    //   }).catch(err=>{console.log('handle change'+err)})

} catch (error) {
    dispatch({type:ANSWER_UPVOTE_FAIL, payload:error.message})
}   
}



const unUpvoteAnswer = (answer_id,user_id)=>async(dispatch, getState)=>{

    // let url= "/api/like/upvote/"+answer_id
   //  console.log(url)
//    console.log("from handlechange up   "+props.id)
let url= "/api/like/UnUpvote/"+answer_id
   const { userLoggedin: { userInfo1 } } = getState()

   const x= {
    answer:answer_id,
    user:user_id
  }
    try {
       dispatch({type:ANSWER_UNUPVOTE_REQUEST})
      const {data}= await axios.post(url,x,{
       headers:{
            Authorization:userInfo1?.token
       }})
       dispatch({type:ANSWER_UNUPVOTE_SUCCESS, payload:data})
       //   if(response.data.success){
   //         setLength(length+1)
   //         setIsUp(true)
   //           console.log("likedddddddddddddddddddd")
   //       }
   //   }).catch(err=>{console.log('handle change'+err)})

} catch (error) {
   dispatch({type:ANSWER_UNUPVOTE_FAIL, payload:error.message})
}   

}




const downvoteAnswer = (answer_id,user_id)=>async(dispatch, getState)=>{

    let url= "/api/like/downvote/"+answer_id
   //  console.log(url)
   const { userLoggedin: { userInfo1 } } = getState()

    const x= {
      answer:answer_id,
      user:user_id
    }
    try {
       dispatch({type:ANSWER_DOWNVOTE_REQUEST})
      const {data}= await axios.post(url,x,{
       headers:{
            Authorization:userInfo1?.token
       }})
       dispatch({type:ANSWER_DOWNVOTE_SUCCESS, payload:data})
       //   if(response.data.success){
   //         setLength(length+1)
   //         setIsUp(true)
   //           console.log("likedddddddddddddddddddd")
   //       }
   //   }).catch(err=>{console.log('handle change'+err)})

} catch (error) {
   dispatch({type:ANSWER_DOWNVOTE_FAIL, payload:error.message})
}   
}

const unDownvoteAnswer = (answer_id,user_id)=>async(dispatch, getState)=>{

    // let url= "/api/like/upvote/"+answer_id
   //  console.log(url)
//    console.log("from handlechange up   "+props.id)
let url= "/api/like/UnDownvote/"+answer_id
   const { userLoggedin: { userInfo1 } } = getState()

   const x= {
    answer:answer_id,
    user:user_id
  }
    try {
       dispatch({type:ANSWER_UNDOWNVOTE_REQUEST})
      const {data}= await axios.post(url,x,{
       headers:{
            Authorization:userInfo1?.token
       }})
       dispatch({type:ANSWER_UNDOWNVOTE_SUCCESS, payload:data})
       //   if(response.data.success){
   //         setLength(length+1)
   //         setIsUp(true)
   //           console.log("likedddddddddddddddddddd")
   //       }
   //   }).catch(err=>{console.log('handle change'+err)})

} catch (error) {
   dispatch({type:ANSWER_UNDOWNVOTE_FAIL, payload:error.message})
}   

}

export  {
    postAnswer, 
    individualAnswer, 
    listAnswersUser, 
    editAnswer, 
    deleteAnswer,
    upvoteAnswer,
    unUpvoteAnswer,
    downvoteAnswer,
    unDownvoteAnswer,
}