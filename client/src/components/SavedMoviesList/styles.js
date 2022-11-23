import { styled, Link as LinkTemplate } from "@mui/material";


export const List = styled('div')(()=>({
    display:'grid',
    gridTemplateColumns:"23% 23% 23% 23%",
    placeContent:'center',
    gridGap:"10px",
}))

export const Item = styled('div')(()=>({
    width:'92%',
    // height:"100px",
    background:"white",
    borderRadius:'8px',
    position:'relative'
}))

export const Title = styled('h2')(()=>({
    textAlign:'center'
}))
export const Link = styled(LinkTemplate)(({color})=>({
    display:'block',
    margin:'0 auto',
    textAlign:'center',
    // color:color === 'secondary' ? 'purple' : 'orange'
}))

export const DeleteButton = styled('button')(()=>({
    position:'absolute',
    right:'5px',
    top:'5px',
    background:'none',
    border:0,
    outline:0,
    cursor:'pointer',
    borderRadius:'8px',
    transition:'.2s ease',
    paddingTop:'2px',
    ":hover":{
        background:'rgba(200,200,200,0.3)'
    }
}))