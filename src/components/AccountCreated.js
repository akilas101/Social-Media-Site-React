import React, {useEffect, useState} from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import { profile } from '../actions/userActions'
import ReactRoundedImage from "react-rounded-image";
import {Alert} from 'react-daisyui'
import Cookie from "js-cookie"
import Axios from 'axios'
import { json } from 'body-parser'
import { handleBreakpoints } from '@mui/system'

// import { Image } from 'cloudinary-react';



function AccountCreated(props){
    const dispatch = useDispatch()
    
    const userLoggedin = useSelector(state => state.userLoggedin)
    const {  userInfo1 } = userLoggedin
    const userCreated = useSelector(state=> state.userRegistered)
    const { userInfo2 } = userCreated
    const [textAreaValue, setTextAreaValue] = useState('')
    const [image, setImage] = useState('')
    const [imageRender, setImageRender] = useState('')



    const [fileInputState, setFileInputState] = useState('');
    const [previewSource, setPreviewSource] = useState('');
    const [selectedFile, setSelectedFile] = useState();
    const [successMsg, setSuccessMsg] = useState('');
    const [errMsg, setErrMsg] = useState('');




    
    ///sending image to backend
    const send=(e)=>{
    
        console.log("send")
        let image_check=false
        let description_check=false        
        let image_file= new FormData()
        image_file.append("file", image)

        //variables.image_file.append("File", image)
        //console.log(variables)


        let description= textAreaValue

        Axios.post('/api/profile/EditProfile/',{description},{
            headers:{
                Authorization:userInfo1.token
            }
        }).then(()=>{
            console.log("Updated")
            description_check=true
        }).catch((err)=>{console.log(err)})
      //console.log(variables)
      
      if(description_check===true){}
      dispatch(profile(userInfo1.id))
    //   handleSubmitFile();
  
      props.history.push("/profilePic")
    }
    // const fileSelectedHandeler =(e) =>{
    //     setImageRender(URL.createObjectURL(e.target.files[0]))
    //     setImage(e.target.files[0])
    //     setSelectedFile(e.target.files[0]);
    // }
    useEffect(() => {
        Cookie.set('userLoggedin', JSON.stringify(userLoggedin)) 
      
    }, [userInfo1])


    // const handleSubmitFile = () => {
    //     alert("upload?")
    //     // e.preventDefault();
    //     // if (!selectedFile) return;
    //     const reader = new FileReader();
        
    //     reader.readAsDataURL(image);
    //     reader.onloadend = () => {
    //        alert(reader.result+"from upload?");
    //         uploadImage(reader.result);
    //     };
    //     reader.onerror = () => {
    //         console.error('AHHHHHHHH!!');
    //         setErrMsg('something went wrong!');
    //     };
    // };

    // const uploadImage = async (base64EncodedImage) => {
    //     try {
    //         alert('upload?'+base64EncodedImage)

    //         const x =await JSON.stringify(base64EncodedImage)
    //         alert(x)
    //         await Axios.post('/api/profile/image/upload',{data:x},{
    //             headers: { 'Content-Type': 'application/json' }}
    //         );
    //         setFileInputState('');
    //         setPreviewSource('');
    //         setSuccessMsg('Image uploaded successfully');
    //     } catch (err) {
    //         console.error(err);
    //         setErrMsg('Something went wrong!');
    //     }
    // };



    if(userInfo1)
    {
    return     <div className="account" style={{  backgroundColor: "#fff",
        border: "2px solid lightgray",
        borderRadius: "5px",
        borderBlockColor:"#007bff"}}>
            <div className="details-box">
                <div className="inside-details">
                    
                    <p >Hi <b style={{color:"chocolate"}}>{userInfo1.username.split(" ")[0]}</b>, your account has been created. Complete your profile below</p>
                    <div className="inside-second">
                        <div className="add-image">
                        <div>
                        {/* {
                            ( image!="") ?<div>
                            {console.log(image)}
                            <ReactRoundedImage
                            image={imageRender}
                            imageWidth="120"
                            imageHeight="120"
                            roundedSize="0"
                            />
                            </div>
                            :<ReactRoundedImage
                            image="/images/User.jpg"
                            imageWidth="120"
                            imageHeight="120"
                            roundedSize="0"
                            />
                            
                    } */}
                    

                        </div>
                       
                        <div style={{marginTop:"10px"}}>
                        {/* <input type='file' className="account-file-input" onChange={fileSelectedHandeler}/> */}
                        </div>
                        </div>
                        <div className="add-profile-description">
                            <label>Add Profile Description:</label>
                        <textarea type="text" 
                        className="middle-content-input" 
                        placeholder="Enter Details for you profile"
                        onChange={(e)=>setTextAreaValue(e.target.value)}
                        rows={2}
                        />
                        </div>
                        <div className="save-details">
                        <Button type="" variant="success" className="sp" onClick={send}>Save Profile Details</Button>
                        </div>
                    </div>
                </div>
            </div>
            </div>
    }
    else{
        return <div className="account">
        <div className="details-box">
            <div className="inside-details">
                
                

            </div>
        </div>
        </div>
    }

}

export default AccountCreated