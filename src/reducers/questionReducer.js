import { QUESTION_FETCH_USER_REQUEST, QUESTION_FETCH_USER_SUCCESS, QUESTION_FETCH_USER_FAIL,QUESTION_FETCH_USER_UNLOAD,
     QUESTION_POST_REQUEST, QUESTION_POST_SUCCESS, QUESTION_POST_FAIL, QUESTION_POST_NULL, 
     QUESTION_EDIT_REQUEST, QUESTION_EDIT_SUCCESS, QUESTION_EDIT_FAIL, 
     QUESTION_DELETE_REQUEST, QUESTION_DELETE_SUCCESS, QUESTION_DELETE_FAIL, 
     QUESTION_FULL_REQUEST, QUESTION_FULL_SUCCESS, QUESTION_FULL_FAIL, QUESTION_PAGE_REQUEST, 
     QUESTION_PAGE_SUCCESS, QUESTION_PAGE_FAIL , QUESTION_REPORT_FAIL,QUESTION_REPORT_SUCCESS,QUESTION_REPORT_REQUEST, 
     QUESTION_REPORT_NULL, QUESTION_UPVOTE_REQUEST,QUESTION_UPVOTE_SUCCESS,QUESTION_UPVOTE_FAIL,QUESTION_UPVOTE_NULL,
     QUESTION_UNUPVOTE_REQUEST,QUESTION_UNUPVOTE_SUCCESS,QUESTION_UNUPVOTE_FAIL,QUESTION_UNUPVOTE_NULL,
     QUESTION_DOWNVOTE_REQUEST,QUESTION_DOWNVOTE_SUCCESS,QUESTION_DOWNVOTE_FAIL,QUESTION_DOWNVOTE_NULL,
     QUESTION_UNDOWNVOTE_REQUEST,QUESTION_UNDOWNVOTE_SUCCESS,QUESTION_UNDOWNVOTE_FAIL,QUESTION_UNDOWNVOTE_NULL,

    } from '../constants/questionConstants'

function questionsListReducer(state={questions:[]}, action){
    switch(action.type){
        case QUESTION_FULL_REQUEST:
            return {loading:true}
        case QUESTION_FULL_SUCCESS:
            return {loading:false, questions:action.payload}
        case QUESTION_FULL_FAIL:
            return {loading: false, error:action.payload}
        default:
            return state;        

    }
}

function questionsListUserReducer(state=[{}], action){
    switch(action.type){
        case QUESTION_FETCH_USER_REQUEST:
            return {loading:true}
        case QUESTION_FETCH_USER_SUCCESS:
            return {loading:false, questions:action.payload}
        case QUESTION_FETCH_USER_FAIL:
            return {loading: false, error:action.payload}
        case QUESTION_FETCH_USER_UNLOAD:
            return{}    
        default:
            return state;        

    }
}



function questionReportReducer(state=[{}], action){
    switch(action.type){
        case QUESTION_REPORT_REQUEST:
            return {loading:true}
        case QUESTION_REPORT_SUCCESS:
            return {loading:false, report:action.payload}
        case QUESTION_REPORT_FAIL:
            return {loading: false, report:action.payload}
        case QUESTION_REPORT_NULL:
            return{}    
        default:
            return state;        

    }
}



function questionsPostReducer(state={}, action){
    switch(action.type){
        case QUESTION_POST_REQUEST:
            return {loading:true}
        case QUESTION_POST_SUCCESS:
            return {loading:false, question:action.payload}
        case QUESTION_POST_FAIL:
            return {loading: false, error:action.payload}
        case QUESTION_POST_NULL:
            return {loading:false, question:action.payload}    
        default:
            return state;        

    }
}

function questionsEditReducer(state={}, action){
    switch(action.type){
       
        case QUESTION_EDIT_REQUEST:
            return {loading:true}
        case QUESTION_EDIT_SUCCESS:
            return {loading:false, question:action.payload}
        case QUESTION_EDIT_FAIL:
            return {loading: false, error:action.payload}    
        default:
            return state;        
    }
}

function questionsDeleteReducer(state={}, action){
    switch(action.type){
        case QUESTION_DELETE_REQUEST:
            return {loading:true}
        case QUESTION_DELETE_SUCCESS:
            return {loading:false, questiondelete:action.payload}
        case QUESTION_DELETE_FAIL:
            return {loading: false, error:action.payload}    
        default:
            return state;        
    }
}

function selectedQuestionReduer(state={}, action){
    switch(action.type){
        case QUESTION_PAGE_REQUEST:
            return {loading_question_page:true}
        case QUESTION_PAGE_SUCCESS:
            return {loading_question_page:false, question_data:action.payload}
        case QUESTION_PAGE_FAIL:
            return {loading_question_page: false, error:action.payload}    
        default:
            return state;        
    }
}


function questionUpvoteReducer(state={},action){
    switch(action.type){
        case QUESTION_UPVOTE_REQUEST:
            return {loading:true}
        case QUESTION_UPVOTE_SUCCESS:
            return {loading:false, qupvot:action.payload}
        case QUESTION_UPVOTE_FAIL:
            return {loading: false, error:action.payload}    
        default:
            return state;        
    }
}


function questionUnUpvoteReducer(state={},action){
    switch(action.type){
        case QUESTION_UNUPVOTE_REQUEST:
            return {loading:true}
        case QUESTION_UNUPVOTE_SUCCESS:
            return {loading:false, qunupvot:action.payload}
        case QUESTION_UNUPVOTE_FAIL:
            return {loading: false, error:action.payload}    
        default:
            return state;        
    }
}




function questionDownvoteReducer(state={},action){
    switch(action.type){
        case QUESTION_DOWNVOTE_REQUEST:
            return {loading:true}
        case QUESTION_DOWNVOTE_SUCCESS:
            return {loading:false, qdownvot:action.payload}
        case QUESTION_DOWNVOTE_FAIL:
            return {loading: false, error:action.payload}    
        default:
            return state;        
    }
}

function questionUnDownvoteReducer(state={},action){
    switch(action.type){
        case QUESTION_UNDOWNVOTE_REQUEST:
            return {loading:true}
        case QUESTION_UNDOWNVOTE_SUCCESS:
            return {loading:false, qundownvot:action.payload}
        case QUESTION_UNDOWNVOTE_FAIL:
            return {loading: false, error:action.payload}    
        default:
            return state;        
    }
}

export {questionsListUserReducer, 
    questionsPostReducer,
     questionsEditReducer, 
     questionsDeleteReducer,
      questionsListReducer,
    selectedQuestionReduer,
    questionReportReducer,
    questionUpvoteReducer,
    questionUnUpvoteReducer,
    questionDownvoteReducer,
    questionUnDownvoteReducer,
}