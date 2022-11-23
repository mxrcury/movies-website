import { styled, Button as ButtonTemplate} from "@mui/material";

export const Card = styled('div')(()=>({
    backgroundColor:'white',
    // border:'2px solid black',
    borderRadius:'5px'
}))

export const CardImg = styled('img')(()=>({
    maxHeight:'500px',
    width:'100%',
    objectFit:'cover',
    borderRadius:'5px 5px 0 0'
}))

export const Button = styled(ButtonTemplate)(({theme})=>({
    width:'60%',
}))

export const Info = styled('div')(()=>({
    display: "flex",
     alignItems: "center",
     justifyContent:'space-between'
}))

export const Rating = styled('div')(()=>({
    display:'flex',
    alignItems:'center',
    fontSize:'19px'
}))

export const Time = styled('span')(()=>({
    fontSize:'18px'
}))