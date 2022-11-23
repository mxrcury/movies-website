import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function CardMenu({children,modal, deleteMovie, id}) {

  
  const handleClose = (e) => {
    deleteMovie(id)
    modal.toggleWithEvent(e)
  }

  return (
    <div>
      <Menu
        id="basic-menu"
        anchorEl={modal.eventElement}
        open={modal.state}
        onClose={modal.toggleWithEvent}
      >
        <MenuItem onClick={handleClose}>{children}</MenuItem>
      </Menu>
    </div>
  );
}
