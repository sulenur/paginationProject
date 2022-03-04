import React, { useState, useEffect, useMemo } from 'react';
import { Search, TableView } from '../components';
import { getUsers , getSearchUsers, getSelectedUser} from '../commons/api';
import { PaginationProps } from '../models/TableViewModel';
import { Link } from 'react-router-dom';

const ITEM_FETCH_SIZES = 10
const HEADER_ITEMS = [
    '#',
    'Icon',
    'Name',
    'Actions'
]

var searchKey = ''
var since = 0;
var page = 0;

export default () => {
    const [data, setData] = useState(null)
    const handleUsersApiCall = async (q?: string) => {
        let response 
        
        if(q !== undefined && searchKey !== q){
            since = 0
            page = 0
            searchKey = q
        }
        
        if(!searchKey){
            response = await getUsers({
                since,
                per_page: ITEM_FETCH_SIZES,
            })
        }
        else {
           response = await getSearchUsers({
                q : searchKey,
                per_page: ITEM_FETCH_SIZES,
                page: page
            })
        }
        setData( searchKey ?response.data.items :  response.data)
    }

    useEffect(() => {
        handleUsersApiCall()
    }, []);


    const renderActions = (event: any) =>
        <Link 
            className='btn btn-secondary'
            state={event}
            to={`event/${event.login}`}>  
            Details
        </Link>


    const renderImage = (event)=>{
        const {avatar_url} = event
        return <img className="avatar-img"  src={avatar_url}></img>
    }

    const getRequiredFields = (event) => {
        // get required fields from fetched data
        return [
            event.id,
            renderImage(event),
            event.login,
            renderActions(event)
        ]
    }

    const handleChangePage = (_page : number) => {
            since = _page * ITEM_FETCH_SIZES
            page= _page
            handleUsersApiCall(searchKey)
    }

    const mappedPagination: PaginationProps = {
        ...data?.page,
        size : ITEM_FETCH_SIZES,
        number : page,
        totalPages : 9999,
        handleChangePage
    }

    const mapped = useMemo(() => {
        return data?.map((event) => {
            return getRequiredFields(event)
        }) ?? [];
    }, [data])

    return (
        <div className="container" >
            <div className='d-flex justify-content-center m-4' >
            </div>
            <Search
                onSearch={handleUsersApiCall}
            />
            <TableView
                pagination={mappedPagination}
                items={mapped}
                headers={HEADER_ITEMS}
            />
        </div>
    );
}

