import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import {useState,useEffect} from 'react'
import Axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import {NavLink, Link} from 'react-router-dom'
import './account.css'
import { Image } from 'cloudinary-react';


export default function AccountMenu() {
    const userLoggedin = useSelector(state => state.userLoggedin)
   // const {  userInfo1 } = userLoggedin
   const [Profile, setProfile] = useState('')
    
    //const pd = useSelector(state=>state.userProfile)
    const {userInfo1} = userLoggedin
    //const {Profile} = pd
//  {userInfo1?{console.log(userInfo1.username)}:null}
   
// console.log(userInfo1)


const [imageIds, setImageIds] = useState([]);


useEffect(async() => {  
  // const interval = setInterval(() => {

  loadImages();
// } ,3000);
// return () => clearInterval(interval);
}, []);


useEffect(() => {  
  // const interval = setInterval(() => {
if(userInfo1)
  loadImages();
// } ,3000);
// return () => clearInterval(interval);
}, [userLoggedin])

useEffect(() => {  
  // const interval = setInterval(() => {
if(userInfo1!=true)
  loadImages();
// } ,3000);
// return () => clearInterval(interval);
}, [userLoggedin])

const loadImages = async () => {
  try {
     Axios.get('/api/profile/propics/'+userInfo1?.id)
     .then((res)=>{ console.log(res.data)
      setImageIds(res.data)})
     
  } catch (err) {
      console.error(err);
  }
};

 

  const [openn,setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <React.Fragment 
    //   backgroundColor= 'transparent'
    // marginRight="200px"
    // position='absolute'
 >
     <Box >
      
        <Tooltip title="Account settings">
          <IconButton
             onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={openn ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={openn ? 'true' : undefined}
          >
            {userInfo1?(userInfo1.status==='PRO')?<Badge
  overlap="rectangular"
  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
 color='info'
 badgeContent={"PRO"} 
 variant="string"
 sx={{ "& .MuiBadge-badge": { fontSize: 9, height: 10, Width: 15 } }}
 >          <Avatar sx={{ width: 32, height: 32 }} >  {imageIds &&
              imageIds.map((imageId, index) => (
                  <Image
                      key={index}
                      cloudName='feleg'
                      publicId={imageId}
                      width="32"
                      crop="scale"
                  />
              ))}</Avatar></Badge>:<Badge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
             color='success'
              
             variant="dot"
             sx={{ "& .MuiBadge-badge": { fontSize: 9, height: 10, Width: 15 } }}
             >          <Avatar sx={{ width: 32, height: 32 }} >  {imageIds &&
                          imageIds.map((imageId, index) => (
                              <Image
                                  key={index}
                                  cloudName='feleg'
                                  publicId={imageId}
                                  width="32"
                                  crop="scale"
                              />
                          ))}</Avatar></Badge>
              :
               <Avatar sx={{ width: 32, height: 32 }} >  
                 {imageIds &&   imageIds.map((imageId, index) => (   <Image
                            key={index}
                            cloudName='feleg'
                            publicId={imageId}
                
                        width="32"
                        crop="scale"
                    /> ))}
                </Avatar>
}
          </IconButton>
        </Tooltip>
             </Box>
           
               <Menu
               style= {{ 
                backgroundColor: 'transparent',
                boxShadow: 'none',
                marginRight:'115px',
                position:'relative',
                top:'-180px'
                } }
        open={openn}
        // id="menu-item"
        //anchorEl={anchorEl}
        position= 'relative'
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
            style: {
              backgroundColor:"rgb(215 215 215)",
            boxShadow: 'none',
            marginLeft:'85%',
            top:'30px',
            position:'relative',
            backdropFilter:"blur(6px)",
            opacity: 1,
            transform: 'none',
            // top: "16px",
            right: "16px",
            width: 'fit-content'
            },
          elevation: 0,
          sx: { 
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
              position: 'relative',
            },
            '&:before': {
              // content: '""',
              display: 'block',
              position: 'relative',
              top: 0,
              // right: 20,
              width: 20,
              height: 40,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      >
  <div style={{backgroundColor: "rgba(255, 255, 255, 0.601)",backdropFilter:"blur(6px)"}}>
    <div>{ userInfo1 ? 
       ( <MenuItem>
          <Avatar />
          
            <NavLink exact to={"/profile/"+userInfo1?.username} style={{color:"#007bff"}}>
            <div className="">
            MyAccount
            </div>
            </NavLink>
            </MenuItem>): 
           null
       }
           </div>
      
       
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          <NavLink exact to="/help" style={{color:"#007bff"}}>
            <div className="">
           help
            </div>
            </NavLink>
        </MenuItem>
      
        <div>{ userInfo1 ? 
       (  <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
        
          <NavLink exact to={"/settings/"+userInfo1?.username}  style={{color:"#007bff"}}>
            <div className="">
            Settings
            </div>
            </NavLink>

        </MenuItem>): 
           null
       }
           </div>
        <MenuItem>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          {userInfo1 ? (
            <NavLink exact to="/logout" style={{color:"#007bff"}}>
            <div className="">
            Logout
            </div>
            </NavLink>
          ) : (
            <NavLink exact to="/signin" >
            <div className=" signin_tab">
            Sign In
            </div>
            </NavLink>
           
          )
        
          }
        </MenuItem>
        <MenuItem>
         
          {userInfo1 ? (
            <NavLink exact to="/PRO" style={{color:"#007bff"}}>
            <div className="" style={{marginLeft:"79px"}}>
            PRO
            </div>
            </NavLink>
          ) : (null
           
          )
        
          }
        </MenuItem>
        </div>
      </Menu>
   
    </React.Fragment> 
  );
}
