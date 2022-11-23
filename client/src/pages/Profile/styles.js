import { styled } from "@mui/material";

export const Username = styled('h1')(()=>({
    textAlign:'center'
}))
export const List = styled('div')(()=>({
    display:'grid',
    gridTemplateColumns:"25% 25% 25% 25%",
    gridGap:"10px"
}))

export const Item = styled('div')(()=>({
    width:'100%',
    // height:"100px",
    background:"orange",
}))

