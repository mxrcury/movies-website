import React from 'react'
import Portal from './../Portal/index';
import { Backdrop, Container,CloseButton, Content } from './styles'
import CloseIcon from '@mui/icons-material/Close';

const Modal = ({children,onClose}) => {
  return (
    <Portal>
      <Backdrop>
        <Container sx={{width:{lg:'560px',xs:'80%',sm:'60%' }}}>
          <Content>
            {children}
            <CloseButton onClick={onClose}>
              <CloseIcon sx={{fontSize:'30px'}} />
            </CloseButton>
          </Content>
        </Container>
      </Backdrop>
    </Portal>
  );
}

export default Modal
