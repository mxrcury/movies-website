import React from 'react'
import { List, Item, Title, Link, DeleteButton } from './styles'
import {useAuth} from '../../hooks';
import ClearIcon from '@mui/icons-material/Clear';

const SavedMoviesList = ({savedLists, deleteMovieList}) => {
  
  const { token } = useAuth()


  const onDeleteMovieList = (listTitle) => {
    deleteMovieList({variables:{listTitle,token}})
  }


  return (
    <div>
      <List sx={{gridTemplateColumns:{lg:"23% 23% 23% 23%",sm:'200px 200px',xs:'200px'}}}>
        {savedLists
          ? savedLists.map((list) => (
              <Item sx={{width:{lg:'92%',xs:'200px'}}}>
                <Title>{list.listTitle} </Title>
                <Link
                  href={`${list.link}`}
                  target="_blank"
                  rel="noreferrer"
                  color="secondary"
                >
                  Link to page
                </Link>
                <ul>
                  {list.movies.map((item) => (
                    <li>{item.title}</li>
                  ))}
                </ul>
                <DeleteButton onClick={() => onDeleteMovieList(list.listTitle)}>
                  <ClearIcon />
                </DeleteButton>
              </Item>
            ))
          : null}
      </List>
    </div>
  );
}

export default SavedMoviesList
