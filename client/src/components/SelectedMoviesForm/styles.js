import { styled, Button as ButtonTemplate,InputBase } from '@mui/material';

export const Input = styled(InputBase)(()=>({
    width:'100%',
    height:'100%',
    padding:'9px',
    margin:'0 10px',
    outline:0,
  }))

export const FormBase = styled("form")(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  marginTop: "20px",
}));

export const Button = styled(ButtonTemplate)(() => ({
  marginRight:'10px'
}));

export const ModalButton = styled(ButtonTemplate)(() => ({
  ':nth-of-type(1)':{
    marginRight:'10px'
  }
}));

export const ShareLink = styled('a')(()=>({
  textAlign:'center',
  margin:'0 auto',
  display:'block',
  marginBottom:'5px',
  textDecoration:'underline',
  color:'purple'
}))

export const Subtitle = styled('h3')(()=>({
  color:'grey',
  textAlign:'center'
}))

export const FlexContainer = styled('div')(()=>({
  display:'flex',
  alignItems:'center',
  justifyContent:'center'
}))