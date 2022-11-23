import { styled, Button as ButtonTemplate} from "@mui/material";

export const Card = styled('div')(()=>({
    backgroundColor:'white',
    // maxWidth:'240px',
    width:'100%',
    // border:'2px solid black',
    display:'flex',
    borderRadius:'5px',
    marginBottom:'15px',
    ":last-child":{
        marginBottom:0
    }
}))

export const CardImg = styled('img')(()=>({
    maxHeight:'220px',
    objectFit:'fill',
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

export const Description = styled('p')(()=>({
    fontSize:'18px',
    maxWidth:'80%',
    fontWeight:'500'
}))

export const Subtitle = styled('span')(()=>({
    fontSize:'17px',
    fontWeight:500
}))