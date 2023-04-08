import { 
      ANSWER_DELETE_FAIL, ANSWER_DELETE_REQUEST, ANSWER_DELETE_SUCCESS, 
    ANSWER_EDIT_FAIL, ANSWER_EDIT_NULL, ANSWER_EDIT_REQUEST, ANSWER_EDIT_SUCCESS,
     ANSWER_FETCH_USER_FAIL, ANSWER_FETCH_USER_REQUEST, ANSWER_FETCH_USER_SUCCESS, ANSWER_FETCH_USER_UNLOAD,
      ANSWER_POST_FAIL, ANSWER_POST_NULL, ANSWER_POST_REQUEST, ANSWER_POST_SUCCESS, 
      ANSWER_SHOW_FAIL, ANSWER_SHOW_REQUEST, ANSWER_SHOW_SUCCESS , 
      ANSWER_UPVOTE_REQUEST,ANSWER_UPVOTE_SUCCESS,ANSWER_UPVOTE_FAIL,ANSWER_UPVOTE_NULL,
      ANSWER_UNUPVOTE_REQUEST,ANSWER_UNUPVOTE_SUCCESS,ANSWER_UNUPVOTE_FAIL,ANSWER_UNUPVOTE_NULL,
      ANSWER_DOWNVOTE_REQUEST,ANSWER_DOWNVOTE_SUCCESS,ANSWER_DOWNVOTE_FAIL,ANSWER_DOWNVOTE_NULL,
      ANSWER_UNDOWNVOTE_REQUEST,ANSWER_UNDOWNVOTE_SUCCESS,ANSWER_UNDOWNVOTE_FAIL,ANSWER_UNDOWNVOTE_NULL,


    } from '../constants/answerConstants';

function answerPostReducer(state={}, action){
    switch(action.type){
        case ANSWER_POST_REQUEST:
            return {loading:true}
        case ANSWER_POST_SUCCESS:
            return {loading:false, answer:action.payload}
        case ANSWER_POST_FAIL:
            return {loading: false, error:action.payload}
            case ANSWER_POST_NULL:
                return {}         
        default:
            return state;        
        }
}

function answerShowReducer(state={}, action){
    switch(action.type){
        case ANSWER_SHOW_REQUEST:
            return {loading:true}
        case ANSWER_SHOW_SUCCESS:
            return {loading:false, details:action.payload}
        case ANSWER_SHOW_FAIL:
            return {loading: false, error:action.payload}    
        default:
            return state;        
        }
}

function answersListUserReducer(state=[{}], action){
    switch(action.type){
        case ANSWER_FETCH_USER_REQUEST:
            return {loading:true}
        case ANSWER_FETCH_USER_SUCCESS:
            return {loading:false, answers:action.payload}
        case ANSWER_FETCH_USER_FAIL:
            return {loading: false, error:action.payload}
        case ANSWER_FETCH_USER_UNLOAD:
            return{}    
        default:
            return state;        

    }
}
function answerEditReducer(state={}, action){
    switch(action.type){
       
        case ANSWER_EDIT_REQUEST:
            return {loading:true}
        case ANSWER_EDIT_SUCCESS:
            return {editloading:false, editedanswer:action.payload}
        case ANSWER_EDIT_FAIL:
            return {loading: false, editerror:action.payload}
        case ANSWER_EDIT_NULL:
            return {}        
        default:
            return state;        
    }
}

function answerDeleteReducer(state={}, action){
    switch(action.type){
        case ANSWER_DELETE_REQUEST:
            return {loading:true}
        case ANSWER_DELETE_SUCCESS:
            return {loading:false, answerdelete:action.payload}
        case ANSWER_DELETE_FAIL:
            return {loading: false, error:action.payload}    
        default:
            return state;        
    }
}

function answerUpvoteReducer(state={},action){
    switch(action.type){
        case ANSWER_UPVOTE_REQUEST:
            return {loading:true}
        case ANSWER_UPVOTE_SUCCESS:
            return {loading:false, upvot:action.payload}
        case ANSWER_UPVOTE_FAIL:
            return {loading: false, error:action.payload}    
        default:
            return state;        
    }
}



function answerUnUpvoteReducer(state={},action){
    switch(action.type){
        case ANSWER_UNUPVOTE_REQUEST:
            return {loading:true}
        case ANSWER_UNUPVOTE_SUCCESS:
            return {loading:false, unupvot:action.payload}
        case ANSWER_UNUPVOTE_FAIL:
            return {loading: false, error:action.payload}    
        default:
            return state;        
    }
}



function answerDownvoteReducer(state={},action){
    switch(action.type){
        case ANSWER_DOWNVOTE_REQUEST:
            return {loading:true}
        case ANSWER_DOWNVOTE_SUCCESS:
            return {loading:false, downvot:action.payload}
        case ANSWER_DOWNVOTE_FAIL:
            return {loading: false, error:action.payload}    
        default:
            return state;        
    }
}

function answerUnDownvoteReducer(state={},action){
    switch(action.type){
        case ANSWER_UNDOWNVOTE_REQUEST:
            return {loading:true}
        case ANSWER_UNDOWNVOTE_SUCCESS:
            return {loading:false, undownvot:action.payload}
        case ANSWER_UNDOWNVOTE_FAIL:
            return {loading: false, error:action.payload}    
        default:
            return state;        
    }
}
export {
    answerPostReducer, 
    answerShowReducer, 
    answersListUserReducer, 
    answerEditReducer, 
    answerDeleteReducer, 
    answerUpvoteReducer,
    answerUnUpvoteReducer,
    answerDownvoteReducer,
    answerUnDownvoteReducer,

    }

