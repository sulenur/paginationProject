import React, { useState , useEffect} from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getSelectedUser} from '../commons/api';


export default () => {
    const { state } = useLocation()
    const { avatar_url, events_url, followers_url, following_url,gists_url , html_url, login }: any = state
    const [data, setData] = useState(null)

    let nameParams = useParams();
   
    const handleSelectedUserApiCall = async(nameParams) => {
        let response = await getSelectedUser({
            params : nameParams.id
        })

        setData(response.data);
    }
    console.log(data);

    useEffect(() => {
        handleSelectedUserApiCall(nameParams)
    }, []);

    const header = () => {
        return (
            <div className="d-flex justify-content-around align-items-center py-3 bg-black" >
                <div className="d-flex flex-row align-items-center">
                <img 
                    className="border border-dark" 
                    src={avatar_url} 
                    style={{ width: 100, height: 50 }} />
                    <div className="ms-3">
                        <div className="text-white fw-bold" >
                            {login}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

/*     const eventInfo = () => {
        return (
            
                info &&
                <div className="bg-dark py-3 px-4 mt-2 text-white" >
                    <i className="bi bi-info-circle me-2"></i>
                    {event}
                </div>
            
        )
    } */

    return (
        <div>
            {header()}
            <div className="container">
              {/*   {eventPrices()}
                {eventInfo()} */}
            </div>
        </div>
    );
}

