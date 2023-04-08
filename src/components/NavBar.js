import React, {useState} from 'react'
import {NavLink, Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faHome,faBell,faHouseDamage,faStarHalfAlt,faMeteor,faHouseUser, faListUl, faUserCircle } from '@fortawesome/free-solid-svg-icons'
// import { faBell } from '@fortawesome/free-light-svg-icons'
import Tooltip from '@mui/material/Tooltip';
import { useSelector, useDispatch } from 'react-redux'
import { profile } from '../actions/userActions'
import { searchText } from '../actions/searchActions'
import QuestionModal from '../components/modals/QuestionModal'


import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


import SearchModal from '../components/modals/SearchModal'
import {Collapse,Dropdown,Toggle,Item} from 'react-daisy'
import List from '@mui/material/List';
import { useEffect } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { FlagOutlined } from '@ant-design/icons'
import Account from './account'
import ProgressBar from 'react-bootstrap/ProgressBar'
import '../index.css';
// import { Dashboard } from '@material-ui/icons';

import Axios  from 'axios';
function NavBar(props){
    const userLoggedin = useSelector(state => state.userLoggedin)
    const [isOpen, setisOpen] = useState(false)
    const[isSearchOpen, setIsSearchOpen] = useState(false)
    const [text, setText] = useState("")
    const [progressbarshow,setProgressBarShow] = useState(true)
    const [status,setStatus] = useState('regular')
    const {  userInfo1 } = userLoggedin
    
    
    const dispatch = useDispatch()
    const [imageIds, setImageIds] = useState('');
    const loadImages = async () => {
        try {
            const res = await fetch('/api/images');
            const data = await res.json();
            console.log(data)
            setImageIds(data);
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
      loadImages();
  },[userInfo1]);
  
    // const Profile = () =>{
      
    //   dispatch(profile(userInfo1.id))
    // }
      
    const search = (e)=>{
      
      dispatch(searchText(e.target.value,false))
      setText(e.target.value)
    }
    var FS = <FontAwesomeIcon icon = {faSearch} size="1x"/>
    var FH = <FontAwesomeIcon icon = {faHouseUser} size="1x" />
    var FL = <FontAwesomeIcon icon ={faListUl} size="1x" />
    var FB = <FontAwesomeIcon icon ={faBell} size="1x"/>
    var FU = <FontAwesomeIcon icon ={faUserCircle} size="1x"/>
 
var CR = <FontAwesomeIcon icon = {faMeteor} size="1x"/>
  
const [countOfProgess, setCountOfProgess] = React.useState(0);
 
React.useEffect(() => {
  const timer = setInterval(() => {
    setCountOfProgess((oldProgress) => {
      if (100 == oldProgress) setProgressBarShow(false);
      return Math.min(oldProgress + Math.random() * 80, 100);
    });
  }, 499);

  return () => {
    clearInterval(timer);
  };
}, []);


//  alert(userInfo1.status)
       
{/* <h4>React-Bootstrap ProgressBar Component</h4> */}
{/* Current Progress is: {parseInt(countOfProgess)} % */}

return <div className="headers" style={{width:"100%",height:"70px",marginLeft:"0px",top:"0px"}} >
    { progressbarshow?<ProgressBar  now={countOfProgess} animated striped style={{width:"100%",top:"0px",height:"3px",marginLeft:"0px",position:"absolute"}} /> :null}
    <div className='home-logo'>
           <Link to="/" className="App-logo">ፈ</Link>
        </div>
          
       { userInfo1?(
                  status==='ADMIN'?null:
                  <div className="search-box">
        <input 
        type="text" 
        name="" 
        className="search-txt" 
        placeholder="Type to search"
        onChange={(e)=>{search(e)}}
        onFocus={()=>setIsSearchOpen(true)}
        />
		    <div className="search-btn" style={{color:"#007bff",cursor:"pointer"}} >
		      {FS}	
        </div>
        <SearchModal
          open={isSearchOpen}
          onClose={()=>setIsSearchOpen(false)}
          text={text}
        />
        </div>):<div className="search-box">
        <input 
        type="text" 
        name="" 
        className="search-txt" 
        placeholder="Type to search"
        onChange={(e)=>{search(e)}}
        onFocus={()=>setIsSearchOpen(true)}
        />
		    <div className="search-btn" style={{color:"#007bff",cursor:"pointer"}} >
		      {FS}	
        </div>
        <SearchModal
          open={isSearchOpen}
          onClose={()=>setIsSearchOpen(false)}
          text={text}
        />
        </div>}
        { userInfo1?(
                  userInfo1.status==='ADMIN'?
                     <div className="desposable-nav">{ 
        <Tooltip title="Dashboard">
               <NavLink exact to ="/feleg/dashboard/" className="homeLogo" 
        >
        <div  style={{color:'#007bff'}}>
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
          <path d="M0 0h24v24H0z" fill="none"/>
        <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/></svg>
        </div>
        </NavLink>
        </Tooltip>}

        {
    
        userInfo1?(<Tooltip title="Users"><NavLink exact to="/following/Following"  className=""
        style={{marginLeft:"30px"}}>
        <div className="following">
        
        <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24">
          <g><rect fill="none" height="24" width="24"/></g><g><g/>
          <g><g><path d="M16.67,13.13C18.04,14.06,19,15.32,19,17v3h4v-3 C23,14.82,19.43,13.53,16.67,13.13z" fillRule="evenodd"/></g>
          <g><circle cx="9" cy="8" fillRule="evenodd" r="4"/></g>
          <g><path d="M15,12c2.21,0,4-1.79,4-4c0-2.21-1.79-4-4-4c-0.47,0-0.91,0.1-1.33,0.24 C14.5,5.27,15,6.58,15,8s-0.5,2.73-1.33,3.76C14.09,11.9,14.53,12,15,12z" fillRule="evenodd"/></g>
        <g><path d="M9,13c-2.67,0-8,1.34-8,4v3h16v-3C17,14.34,11.67,13,9,13z" fillRule="evenodd"/></g></g></g></svg>
        
        </div>
        </NavLink></Tooltip>):(<Tooltip title="Following">
        <NavLink exact to="/signin"  className=""
        style={{marginLeft:"40px"}}>
        <div className="following">
       
        {FL}
        
        </div>
        </NavLink>
        </Tooltip>)
        } 
         {
    
    userInfo1?(<Tooltip title="Carriers"><NavLink exact to="/Feleg/Interests"  className=""
    style={{marginLeft:"30px"}}>
    <div className="following">
    
    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
      <path d="M0 0h24v24H0z" fill="none"/><path d="M4 20h16V4H4v16z" fill="none"/>
    <path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 18H4V4h16v16zM18 6h-5c-1.1 0-2 .9-2 2v2.28c-.6.35-1 .98-1 1.72 0 1.1.9 2 2 2s2-.9 2-2c0-.74-.4-1.38-1-1.72V8h3v8H8V8h2V6H6v12h12V6z"/></svg>
    
    </div>
    </NavLink></Tooltip>):(<Tooltip title="Following">
    <NavLink exact to="/signin"  className=""
    style={{marginLeft:"40px"}}>
    <div className="following">
   
    {FL}
    
    </div>
    </NavLink>
    </Tooltip>)
    } 
        { <Tooltip title="Requests"><NavLink exact to="/carriers/Carriers"  className=""
       style={{marginLeft:"30px"}} >
        <div className="" >
        
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
          <path d="M0 0h24v24H0z" fill="none"/>
        <path d="M0 0h24v24H0z" fill="none"/>
        <path d="M21 8V7l-3 2-3-2v1l3 2 3-2zm1-5H2C.9 3 0 3.9 0 5v14c0 1.1.9 2 2 2h20c1.1 0 1.99-.9 1.99-2L24 5c0-1.1-.9-2-2-2zM8 6c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm6 12H2v-1c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1zm8-6h-8V6h8v6z"/></svg>
        
        </div>
        </NavLink></Tooltip>}

        {<Tooltip title="Reports"><NavLink exact to="/notifications/Notifications"  className="x"
       style={{marginLeft:"30px"}} >
        <div className="" >
        
        <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24">
          <g><path d="M0,0h24v24H0V0z" fill="none"/></g><g>
          <g><path d="M15,3H5C3.9,3,3.01,3.9,3.01,5L3,19c0,1.1,0.89,2,1.99,2H19c1.1,0,2-0.9,2-2V9L15,3z M8,17c-0.55,0-1-0.45-1-1s0.45-1,1-1 s1,0.45,1,1S8.55,17,8,17z M8,13c-0.55,0-1-0.45-1-1s0.45-1,1-1s1,0.45,1,1S8.55,13,8,13z M8,9C7.45,9,7,8.55,7,8s0.45-1,1-1 s1,0.45,1,1S8.55,9,8,9z M14,10V4.5l5.5,5.5H14z"/></g></g></svg>
        
        </div>
        </NavLink></Tooltip>}
        </div>:status==='TEAM'?
          <div className="desposable-nav">{ 
        <Tooltip title="Home">
               <NavLink exact to ="/" className="homeLogo" 
        >
        <div  style={{color:'#007bff'}}>
       { FH }
        </div>
        </NavLink>
        </Tooltip>}



        {/* { <div>
      <List
        component="nav"
        aria-label="Device settings"
        sx={{ bgcolor: 'background.paper' }}
      >
        <ListItem
          button
          id="lock-button"
          aria-haspopup="listbox"
          aria-controls="lock-menu"
          aria-label="when device is locked"
          //aria-expanded={open ? 'true' : undefined}
         // onClick={handleClickListItem}
        >
          <ListItemText
            primary="When device is locked"
            //secondary={options[selectedIndex]}
          />
        </ListItem>
      </List>
      <Menu
        id="lock-menu"
        //anchorEl={anchorEl}
        //open={open}
        //onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'lock-button',
          role: 'listbox',
        }}
      >
        {
        //options.map((option, index) => (
          <MenuItem
        
          >
            <h2>start</h2>
          </MenuItem>
        //))
        }
      </Menu>
    </div>} */}
        {
    
        userInfo1?(<Tooltip title="Following"><NavLink exact to="/following/Following"  className=""
        style={{marginLeft:"30px"}}>
        <div className="following">
        
        {FL}
        
        </div>
        </NavLink></Tooltip>):(<Tooltip title="Following">
        <NavLink exact to="/signin"  className=""
        style={{marginLeft:"40px"}}>
        <div className="following">
       
        {FL}
        
        </div>
        </NavLink>
        </Tooltip>)
        } 
        { <Tooltip title="Interests "><NavLink exact to="/carriers/Carriers"  className=""
       style={{marginLeft:"30px"}} >
        <div className="" >
        
        {CR}
        
        </div>
        </NavLink></Tooltip>}

        {<Tooltip title="Notifications"><NavLink exact to="/notifications/Notifications"  className="x"
       style={{marginLeft:"30px"}} >
        <div className="" >
        
        {FB}
        
        </div>
        </NavLink></Tooltip>}
        </div>:
        <div className="desposable-nav">{ 
        <Tooltip title="Home">
               <NavLink exact to ="/" className="homeLogo" 
        >
        <div  style={{color:'#007bff'}}>
       { FH }
        </div>
        </NavLink>
        </Tooltip>}



        {/* { <div>
      <List
        component="nav"
        aria-label="Device settings"
        sx={{ bgcolor: 'background.paper' }}
      >
        <ListItem
          button
          id="lock-button"
          aria-haspopup="listbox"
          aria-controls="lock-menu"
          aria-label="when device is locked"
          //aria-expanded={open ? 'true' : undefined}
         // onClick={handleClickListItem}
        >
          <ListItemText
            primary="When device is locked"
            //secondary={options[selectedIndex]}
          />
        </ListItem>
      </List>
      <Menu
        id="lock-menu"
        //anchorEl={anchorEl}
        //open={open}
        //onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'lock-button',
          role: 'listbox',
        }}
      >
        {
        //options.map((option, index) => (
          <MenuItem
        
          >
            <h2>start</h2>
          </MenuItem>
        //))
        }
      </Menu>
    </div>} */}
        {
    
        userInfo1?(<Tooltip title="Following"><NavLink exact to="/following/Following"  className=""
        style={{marginLeft:"30px"}}>
        <div className="following">
        
        {FL}
        
        </div>
        </NavLink></Tooltip>):(<Tooltip title="Following">
        <NavLink exact to="/signin"  className=""
        style={{marginLeft:"40px"}}>
        <div className="following">
       
        {FL}
        
        </div>
        </NavLink>
        </Tooltip>)
        } 
        { <Tooltip title="Interests "><NavLink exact to="/carriers/Carriers"  className=""
       style={{marginLeft:"30px"}} >
        <div className="" >
        
        {CR}
        
        </div>
        </NavLink></Tooltip>}

        {<Tooltip title="Notifications"><NavLink exact to="/notifications/Notifications"  className="x"
       style={{marginLeft:"30px"}} >
        <div className="" >
        
        {FB}
        
        </div>
        </NavLink></Tooltip>}
        </div>): 
        <div className="desposable-nav">{ 
        <Tooltip title="home">
               <NavLink exact to ="/" className="homeLogo" 
        >
        <div  style={{color:'#007bff'}}>
       { FH }
        </div>
        </NavLink>
        </Tooltip>}



        {/* { <div>
      <List
        component="nav"
        aria-label="Device settings"
        sx={{ bgcolor: 'background.paper' }}
      >
        <ListItem
          button
          id="lock-button"
          aria-haspopup="listbox"
          aria-controls="lock-menu"
          aria-label="when device is locked"
          //aria-expanded={open ? 'true' : undefined}
         // onClick={handleClickListItem}
        >
          <ListItemText
            primary="When device is locked"
            //secondary={options[selectedIndex]}
          />
        </ListItem>
      </List>
      <Menu
        id="lock-menu"
        //anchorEl={anchorEl}
        //open={open}
        //onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'lock-button',
          role: 'listbox',
        }}
      >
        {
        //options.map((option, index) => (
          <MenuItem
        
          >
            <h2>start</h2>
          </MenuItem>
        //))
        }
      </Menu>
    </div>} */}
        {
    
        userInfo1?(<Tooltip title="Following"><NavLink exact to="/following/Following"  className=""
        style={{marginLeft:"30px"}}>
        <div className="following">
        
        {FL}
        
        </div>
        </NavLink></Tooltip>):(<Tooltip title="Following">
        <NavLink exact to="/signin"  className=""
        style={{marginLeft:"40px"}}>
        <div className="following">
       
        {FL}
        
        </div>
        </NavLink>
        </Tooltip>)
        } 
        { <Tooltip title="Interests "><NavLink exact to="/carriers/Carriers"  className=""
       style={{marginLeft:"30px"}} >
        <div className="" >
        
        {CR}
        
        </div>
        </NavLink></Tooltip>}

        {<Tooltip title="Notifications"><NavLink exact to="/notifications/Notifications"  className="x"
       style={{marginLeft:"30px"}} >
        <div className="" >
        
        {FB}
        
        </div>
        </NavLink></Tooltip>}
        </div>}
        {/* { <NavLink exact to="/SelectedQuestion/SelectedQuestion/"  className=""
       style={{marginLeft:"40px"}} >
        <div className="" >
        
        qwwwwww
        
        </div>
        </NavLink>} */}

        {
          userInfo1 ?(
            status==='ADMIN'?null:
          <div className="question" id="myBtn" >
     <div className="link-red"  onClick={()=>setisOpen(true)} style={{color:"#007bff"}}> Add Question</div>
          <QuestionModal open={isOpen} onClose={()=> setisOpen(false)}/>
         </div>):
          <div style={{width:"97px"}}></div>
        }
        
        {<div  style={{marginLeft:"40px"}} >
          <Account/>
          </div>} 
           
    </div>
  

    
}

export default NavBar
