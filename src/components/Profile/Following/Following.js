import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Axios from 'axios'
import { LoaderDots } from '@thumbtack/thumbprint-react'
import FollowContent from '../../follow/FollowContent'
import {NavLink} from 'react-router-dom'

function Following(props) {
    
    const [following, setFollowing] = useState([])
    const [loading, setLoading] = useState(true)

    const userProfile = useSelector(state => state.userProfile)
    const { Profile } = userProfile

    const fetchProfileFollowing =() =>{
        const variables={
   
        }
        Axios.post('/api/following/'+props.profile_id)
        .then((result)=>{
            setFollowing(result.data)
            setLoading(false)
            console.log(result.data+"from Following")
        })
    }
    
    const renderFollowing = following.map((element,index)=>{
        return <div key={index}>
        {
            <FollowContent
            element={element}
            history={props.history}
            condition="following"
            />
        }
        </div> 
    })

    useEffect(() => {
        fetchProfileFollowing()
    })

    
    
    return (
        loading ? <div><LoaderDots size="small"/></div>:
    <div className="profile-details-section">
        
    <div className="profile-details-section-header">
      <div className="profile-details-section-header-content"><h6>{following.length} Following</h6>
      
      
      
      { <NavLink exact to="/carriers/Carriers"  className="" style={{margin:"10px",fontSize:"13px"}}>
      
        
        See all carriers
        
   
        </NavLink>}
   
      </div>
  
    
    </div><div style={{marginTop:"15px"}}>
    {renderFollowing}
    </div> 
    </div>
    )
}

export default Following
