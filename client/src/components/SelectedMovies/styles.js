import { Paper, styled } from '@mui/material';

export const SelectedMoviesContainer = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(0.5),
    color:theme.palette.text.secondary,
    height:'calc(100vh - 150px)',
    position:'sticky',
    top:theme.spacing(2)
  }));

export const Container = styled('div')(()=>({
   height:'calc(100% - 60px)',
   overflow:'scroll'
}))



export const Form = styled('form')(()=>({
  display:'flex',
  alignItems:'center',
  justifyContent:'flex-end',
  marginTop:'20px'
}))

export const Input = styled('input')(()=>({
  width:'100%',
  height:'100%',
  padding:'9px',
  margin:'0 10px',
  outline:0,
  // padding:'100% 2px'
}))

export const Img = styled('img')(()=>({
  height:'120px',
  margin:'0 auto',
  display:'block'
}))