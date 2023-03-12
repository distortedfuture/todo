import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PersonIcon from '@mui/icons-material/Person';
import { IconButton } from '@mui/material';



export default function SignInBox(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    console.log("lmao loser");
    setOpen(false);
  };

  const handleSignIn = (e) =>
  {
    e.preventDefault();
    
    let email = e.target.email.value;
    let pass = e.target.pass.value;

    props.onSignIn(email, pass);

    handleClose();
  }

  return (
    <div>

      <IconButton onClick={handleClickOpen}  style={{color: "white", mt:2}}>

      <PersonIcon size='large' sx={{mt:2}} />
        </IconButton>

        
      <Dialog open={open} onClose={handleClose}>
      <form  onSubmit={handleSignIn}>

        <DialogTitle>Papers, please</DialogTitle>
        <DialogContent>
          <DialogContentText>
             Sign in ya dummy
          </DialogContentText>
          <TextField
            
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />

        <TextField
            
            margin="dense"
            id="pass"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>I'm a loser</Button>
          <Button  type="submit" >Sign In</Button>
        </DialogActions>
      </form >  

      </Dialog>

    </div>
  );
}
