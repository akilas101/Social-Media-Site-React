import React from 'react';
import './index.css';
import {  Redirect } from 'react-router'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import  NavBar  from './components/NavBar'
import  HomeScreen  from './components/HomeScreen/HomeScreen'
import SignIn from './components/SignIn'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import AccountCreated from './components/AccountCreated';
import Profile from './components/Profile/Profile';
import SearchResult from './components/SearchResult'
import Logout from './components/Logout';
import SelectedQuestion from './components/SelectedQuestion/SelectedQuestion';
import DeleteProfile from './components/Profile/DeleteProfile';
import EditProfile from './components/Profile/EditProfile';
import Following from './components/following/Following';
import PRO from './components/following/PRO';
import carrieres from './components/carriers/Carriers'
import SidebarOptions from './components/SidebarOptions';
import Sidebar from './components/Sidebar';
import Help from './components/help';
import Setting from './components/settings/Settings';
import Notifications from './components/notifications/Notifications'
import Verify from './components/Profile/Verify/verify'
import Recover from './components/Recovery'
// import Interest from './components/Interests/interest' 
// import { Dashboard } from '@material-ui/icons';
import intQ from './components/Interest/Interests'
import Dash from './components/Admin/Dashboard/Dash'
import AdminCarriers from './components/Admin/carriers/Carriers'
import profilePic from './components/profilePic'

import ReportDash from './components/Admin/reports/Reports'
import UsersDash from './components/Admin/Verify/Carriers'


function App() {
  return (
   <BrowserRouter><div>
   
   <NavBar/></div>
    <div className="grid-container">
    
   
    <Switch>
      
    <Route exact path="/feleg/interests" component={AdminCarriers}/> 
    <Route exact path="/feleg/users" component={UsersDash}/> 
   
    <Route exact path="/feleg/reports"component={ReportDash}/>
      <Route exact path ="/signin" component={SignIn}/>
      <Route exact path ="/recovery" component={Recover}/>
        <Route exact path="/" component={HomeScreen}/> 
        <Route exact path="/following/Following" component={Following}/>
        <Route exact path="/PRO" component={PRO}/>  
        <Route exact path="/carriers/Carriers" component={carrieres}/> 
        <Route exact path="/notifications/Notifications" component={Notifications}/> 
        <Route exact path="/profilePic" component={profilePic}/>
        {/* <Route exact path="/Interests/interest" component={Interest}/>  */}
       <Route exact path="/feleg/dashboard" component={Dash}/>
      <Route path="/user/account_created" component={AccountCreated}/>
      <Route exact path="/Interests/questions/:id" component={intQ}/>
     
      <Route path="/profile/delete_profile/:id" component={DeleteProfile}/>
      <Route  path="/profile/:username"  component={Profile}/>
      <Route  path="/settings/:username"  component={Setting}/>
      
      <Route  path="/feleg/help"  component={Help}/>
      <Route exact path="/EditProfile/:id" component={EditProfile}/>
      <Route exact path="/search/:id" component={SearchResult} />
      <Route path="/logout" component={Logout}/>
      <Route exact path="/SelectedQuestions/:id"  component={SelectedQuestion}/>




      {/* <Route exact path="/verify/:id" component={Verify}/> */}



            ​
       
      </Switch>

    </div>
   </BrowserRouter>
  );
}

export default App;
