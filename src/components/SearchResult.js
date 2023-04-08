import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listQuestions, selectedQuestion } from '../actions/questionActions'
import { LoaderDots } from '@thumbtack/thumbprint-react'
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faWifi,  faShare, faTrashAlt, faTh, faSearch  } from '@fortawesome/free-solid-svg-icons'
import ReactTooltip from 'react-tooltip'
import EditModal from './modals/EditModal'
import { editQuestion } from '../actions/questionActions'
import DeleteQuestion from './modals/DeleteQuestion'
import TextEditor from './editor/Editor'
import { deleteProfile, profile } from '../actions/userActions'
import { searchDispatch } from '../actions/searchActions'
import Cookie from 'js-cookie'
import FollowButton from './follow/FollowButton'

function SearchResult(props) {  
   
    return (<div style={{marginTop:"100px"}}>asdfghfdfdsf</div>)        }

export default SearchResult
