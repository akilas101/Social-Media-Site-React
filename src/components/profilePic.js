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
import { Image } from 'cloudinary-react';
// import axios from 'axios'




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



    const [imageIds, setImageIds] = useState([]);
    const loadImages = async () => {
        try {
            const res = await Axios.get('/api/profile/propics/'+userInfo1?.id)
           .then((res)=>{ console.log(res.data)
            setImageIds(res.data)})
           
        } catch (err) {
            console.error(err);
        }
    };
    
    useEffect(() => {
        loadImages();
    }, []);
    
    



    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        previewFile(file);
        setSelectedFile(file);
        setFileInputState(e.target.value);
    };

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        };
    };

    const handleSubmitFile = (e) => {
        e.preventDefault();
        if (!selectedFile) return;
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = () => {
            uploadImage(reader.result);
        };
        reader.onerror = () => {
            console.error('AHHHHHHHH!!');
            setErrMsg('something went wrong!');
        };
    };

    const uploadImage = async (base64EncodedImage) => {
        try {
            const url = '/api/profile/profilepic/upload/'+userInfo1?.id
            await fetch(url, {
                method: 'POST',
                body: JSON.stringify({ data: base64EncodedImage }),
                headers: { 'Content-Type': 'application/json' 
            }
            })
            setFileInputState('');
            setPreviewSource('');
            setSuccessMsg('Image uploaded successfully');
            props.history.push('/')
        } catch (err) {
            console.error(err);
            setErrMsg('Something went wrong!');
        }
    };
    if(userInfo1)
    {
    return <div className="account" style={{  backgroundColor: "#fff",
        border: "2px solid lightgray",
        borderRadius: "5px",
        borderBlockColor:"#007bff"}}>
            <div className="details-box">
                <div className="inside-details">
                    
                    <p >Hi <b style={{color:"chocolate"}}>{userInfo1.username.split(" ")[0]}</b>, your account has been created. Complete your profile below</p>
                    <h1 className="title">Upload an Image</h1>
            <Alert msg={errMsg} type="danger" />    
            <Alert msg={successMsg} type="success" />
            <form onSubmit={handleSubmitFile} className="form">
                <input
                    id="fileInput"
                    type="file"
                    name="image"
                    onChange={handleFileInputChange}
                    value={fileInputState}
                    className="form-input"
                />
                 <div>
            <h1 className="title">Cloudinary Gallery</h1>
            <div className="gallery">
            {imageIds &&
                    imageIds.map((imageId, index) => (
                        <Image
                            key={index}
                            cloudName='feleg'
                            publicId={imageId}
                            width="300"
                            crop="scale"
                        />
                    ))}
            </div>
        </div>
                <button className="btn" type="submit">
                    Submit
                </button>
            </form>
            {previewSource && (
                <img
                    src={previewSource}
                    alt="chosen"
                    style={{ height: '300px' }}
                />
            )}
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