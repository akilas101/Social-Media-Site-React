import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  update } from '../../../actions/userActions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt  } from '@fortawesome/free-solid-svg-icons'
import EditEmailModal from '../../modals/EditEmail'
import EditDescriptionModal from '../../modals/EditDescription'
import EditPasswordModal from '../../modals/EditPassword'
import EditUsernameModal from '../../modals/EditUsername'
import ReactRoundedImage from "react-rounded-image";
import Axios from 'axios';

import {Theme,Button} from 'react-daisyui'

function EditProfile (props){
    console.log(props)
    var pencil = <FontAwesomeIcon icon ={faPencilAlt}/>

  const [editEmailOpen, setEditEmailOpen] = useState(false)
    const [editPasswordOpen, setEditPasswordOpen] = useState(false)
    const [editDescriptionOpen, setEditDescriptionOpen] = useState(false)
    const [editUOpen, setEditUOpen] = useState(false)
    const [textValue, setTextValue] = useState('')

    const userLoggedin = useSelector(state=>state.userLoggedin)
    const { userInfo1 } = userLoggedin
    //const userProfile = useSelector(state => state.userProfile)
    const [Profile, setProfile] = useState('')
    const [loading, setLoading] = useState(true)
    
    
    //values from verification form
    const [expert, setExpert] = useState("");
    const [education,setEducation]=useState("");
    const [level,setLevel] = useState("");
    const [residence,setResidence] = useState("");
const [ since,setSince] = useState("");





    const [image, setImage] = useState('')
    const [imageRender, setImageRender] = useState('')
    const [email, setEmail]= useState('')
    const [password, setPassword]= useState('')
    const [uname, setUname]= useState('')
    
    const fileSelectedHandeler =(e) =>{
        setImageRender(URL.createObjectURL(e.target.files[0]))
        setImage(e.target.files[0])
    }

       
    const dispatch = useDispatch()

   
    
    useEffect(() => {
        
        Axios.get('/api/profile/'+userInfo1.id)
        .then((res)=>{
            //if(res.status===404){
              
            setProfile(res.data)
            setLoading(false)
        })
        .catch((err)=>      
      console.log(err+"error fetching profile")
        )
    
     
    })
    const handleVerifiaction = async ()=>{

const newRequest={
            
               expert:expert,
               education:education,
               level:level,
               since:since,
               residence:residence     }

               console.log(newRequest)
    
 
        const url='/api/auth/pro'
       await Axios.post(url,{newRequest},
            {
                headers: {
                    Authorization: userInfo1.token
                }
            }).then((reqres)=>console.log(reqres))
 
           

    
    
    
            }
    

    return (<div>
      <form >
    <div style={{display:"table-row"}}>
       <div> <label>Your expertise
          <input
            type="text" 
            placeholder="Academic , Proffesional or perhaps Both"
            onChange={(e) => setExpert(e.target.value)}
          />
        </label>
        </div>
        <div>
        <label>Kind of training
        <select  onChange={(e)=> setEducation(e.target.value)}>
        <option value="Formal Education">Formal</option>
        <option value="Informal Education">Informal</option>
        <option value="Both">Both</option>
      </select>
        </label>
        </div>
        <div>
        <label>Highest education level 
          <input
            type="text" 
            placeholder="Highest level achieved in academia(can also include cirtifiactes)"
            onChange={(e) => setLevel(e.target.value)}
          />
        </label>
        </div>

        <div>
        <label>Since
          <input
            type="text" 
            placeholder="Carrier Start"
            onChange={(e) => setSince(e.target.value)}
          />
        </label>
        </div>
        
        <div>
        <label>Residence
          <input
            type="text" 
            placeholder="Permanent address(city)"
            onChange={(e) => setResidence(e.target.value)}
          />
        </label>
        </div>
        </div>
        <div>

<Button type="Button" color="secondary"   onClick={()=>handleVerifiaction()} name=" Submit"> Submit</Button>

        </div>
      </form>
      </div>
    )
  }


export default EditProfile