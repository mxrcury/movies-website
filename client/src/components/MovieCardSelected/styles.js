import { styled} from "@mui/material";

export const CardImg = styled('img')(()=>({
    maxHeight:'100px',
    width:'140px',
    objectFit:'cover',
    borderRadius:'5px 0 0 5px'
}))

export const MoreButton = styled('button')(()=>({
    position:'absolute',
    right:'10px',
    top:'10px',
    padding:0,
    background:'none',
    outline:0,
    border:0,
    cursor:'pointer'
}))