import { useContext } from 'react';
import { FormattedMessage } from 'react-intl';
import { Backdrop, Container, FlexContainer } from '../styles';
import { Paragraph, SettingsItem } from './styles';
import { Context } from '../../providers/context/context';
import { ACTIONS } from '../../providers/context/constants';
import { saveToStorage } from '../../utils/sessionStorage';
import { Checkbox, InputLabel, Select, FormControl } from '@mui/material';
import { useAuth } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { CHANGE_SETTINGS } from '../../mutations';
import { GET_SETTINGS } from '../../query/movies'
import Portal from './../../components/Portal/index';
import { MenuItem } from '@mui/material';


const Settings = () => {
  const {state,dispatch} = useContext(Context)
  const { isAuth, token } = useAuth()

  const { loading } = useQuery(GET_SETTINGS, {
    variables: { token },
    onCompleted: ({ getUserSettings: { locale, saveLists } }) => {
      dispatch({ type: ACTIONS.SET_SETTINGS, locale, saveLists });
    },
  });
  const [ changeSettings ] = useMutation(CHANGE_SETTINGS)


  const navigate = useNavigate()

  if(!isAuth){
    navigate('/login')
  }

  const changeLanguage = (e) => {
    const { value } = e.target
    saveToStorage("locale", value)
    dispatch({type:ACTIONS.SET_LANGUAGE,locale:value})
    changeSettings({variables:{token,locale:value,saveLists:state.saveLists}})
  }

  const changeSavingMovies = async (e) =>{
    const { checked } = e.target
    await dispatch({type:ACTIONS.SET_SAVE_LIST,saveLists:checked})
    console.log('from state',state.saveLists);
    changeSettings({variables:{token,locale:state.locale,saveLists:checked}})
  }
  if (loading) {
    return (
      <>
        <Portal>
          <Backdrop>
            <h1 style={{ textAlign: "center", position: "absolute" }}>
              <FormattedMessage id="loading" />
            </h1>
          </Backdrop>
        </Portal>
      </>
    );
  }
    return (
      <>
        <Container>
          <SettingsItem>
            <Paragraph sx={{marginBottom:'10px'}}>
              <FormattedMessage id="settings.chooseLang" />:
            </Paragraph>
            <FormControl>
              <InputLabel id="demo-simple-select-label" color='secondary'>Language</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={state.locale}
                label="Language"
                onChange={changeLanguage}
                color='secondary'
              >
                <MenuItem value="en-US" >English</MenuItem>
                <MenuItem value="ua-UK">Українська</MenuItem>
              </Select>
            </FormControl>
          </SettingsItem>
          <SettingsItem>
            <FlexContainer sx={{ alignItems: "center" }}>
              <Checkbox
                type="checkbox"
                checked={state.saveLists}
                onChange={changeSavingMovies}
                color='secondary'
              />{" "}
              <Paragraph>
                <FormattedMessage id="settings.saveMovies" />
              </Paragraph>
            </FlexContainer>
          </SettingsItem>
        </Container>
      </>
    );
  }
  
  export default Settings
  