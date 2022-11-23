import { styled } from "@mui/material";

export const Container = styled("div")(() => ({
  // width: '560px',
  height: "250px",
  borderRadius: "8px",
  background: "white",
  position:'absolute',
  top:'50%',
  left:'50%',
  transform:'translate(-50%,-50%)',
  color:'black',
}));
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
export const CloseButton = styled("button")(() => ({
  background:'none',
  outline:0,
  border:0,
  position:'absolute',
  right:'5px',
  top:'0px',
  cursor:'pointer'
}));

export const Content = styled('div')(()=>({
  position:'relative',
  width:'100%',
  height:'100%',
  display: 'block',
  margin:'0 auto',
  paddingTop: '40px'
}))