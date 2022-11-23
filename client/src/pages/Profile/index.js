import React, { useContext, useState } from 'react'
import { useQuery } from '@apollo/client';

import { useAuth } from '../../hooks/';
import { Username } from './styles'
import { GET_SAVED_LISTS } from '../../query/movies';
import SavedMoviesList from '../../components/SavedMoviesList';
import { Context } from '../../providers/context/context';
import { ACTIONS } from './../../providers/context/constants';
import { useMutation } from '@apollo/client';
import { DELETE_MOVIE_LIST } from '../../mutations';
import { FormattedMessage } from 'react-intl';

const Profile = () => {
  const {state,dispatch} = useContext(Context)
  const { username, token, email } = useAuth()

  const { data, refetch } = useQuery(GET_SAVED_LISTS, {
    variables: { token },
    onError:(err)=>{
      console.log(err);
    },
    onCompleted: (data) => {
      dispatch({type:ACTIONS.SET_SAVED_LISTS,savedLists:data.getSavedMovieLists});
    },
    });
    const [ deleteMovieList ] = useMutation(DELETE_MOVIE_LIST,{
      onError:(err)=>{
        console.log(JSON.stringify(err));
      },
      onCompleted:(data)=>{
        refetch()
      }      
    })

    
    return (
      <>
      <Username>{username}</Username>
      <h3 style={{textAlign:'center'}}>{email}</h3>
      {state.user.savedLists && state.user.savedLists.length ? <SavedMoviesList savedLists={state.user.savedLists} deleteMovieList={deleteMovieList}/> : <h3 style={{textAlign:'center',marginTop:'60px',color:"rgba(44,44,44,0.5)"}}> <FormattedMessage id='profile.you_havent_added_any_list' /></h3>}
    </>
  );
}

export default Profile
