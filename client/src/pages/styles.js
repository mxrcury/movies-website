import { styled } from '@mui/material';
import { Container as ContainerTemplate, Input as InputTemplate, Button as ButtonTemplate} from '@mui/material';

export const Poster = styled('img')(()=>({
    width:'325px',
    display:'block',
    margin:'0 auto',
    borderRadius:'10px'
}))

export const Container = styled(ContainerTemplate)(()=>({
    marginTop:'50px'
}))

export const Title = styled('span')(()=>({
    fontSize:'17px',
    fontWeight:500
}))

export const FlexContainer = styled('div')(()=>({
    display:'flex',
}))


export const CompanyLogo = styled('img')(()=>({
    width:'83px',
    marginRight:'13px',
}))

export const PaginationContainer = styled('div')(()=>({
    display:'flex',
    justifyContent:'center',
    width:'100%', 
    marginTop:'60px'
}))

export const Input = styled(InputTemplate)(()=>({
    height:'70px',
    fontSize:'20px'
}))

export const FormBase = styled("form")(() => ({
    display:'flex',
    flexDirection:'column',
    // alignItems:"center",
    margin:'0 auto',
    justifyContent:"center",
    maxWidth:"400px",
  }));

  export const Button = styled(ButtonTemplate)(()=>({
    height:'56px'
  }))

  export const Backdrop = styled("div")(() => ({
    position: "fixed",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "rgba(51, 51, 51, 0.3)",
    backdropFilter: "blur(1px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    opacity: 1,
  }));