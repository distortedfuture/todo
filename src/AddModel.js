import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton, Switch, Typography } from '@mui/material';
import { useState } from 'react';
import { Box } from '@mui/system';
import { db } from './firebaseconfig';
import { collection, doc, setDoc, getDocs } from '@firebase/firestore';
import { Add } from '@mui/icons-material';



export default function AddModel (props) {
  const [open, setOpen] = useState(false);
  const [isUrgent, setUrgent] = useState(!false );

  const taskCollectionRef = props.ref;
  
  async function addToTasks(_title, _text, _due, _urgent)
  {
      let tasks = collection(db, props.route);
  
      await setDoc( doc(tasks, _title), {
          title: _title, complete : false, urgent : _urgent, body : _text, due : _due
      } );
  
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const toggleUrgent = (newValue) => {
    setUrgent(newValue);
    console.log(newValue);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    let title = e.target.elements.title.value;
    let text = e.target.elements.text.value;
    let date= e.target.elements.date.value;
    console.log(date);
    addToTasks(title, text, date, isUrgent)

    e.target.elements.title.value="";
    e.target.elements.text.value="";


    // update data list
    // var setTasks = async () => {
    //   const data = await getDocs(taskCollectionRef);
    //   props.setter();
    //   console.log(data);
    // }
    // setTasks();
    props.setter();
    handleClose();
  };


  return (
    <div>
        <IconButton onClick={handleClickOpen} style={{color: "white"}}>
            <Add />
        </IconButton>

      <Dialog open={open} onClose={handleClose} >
        <form  onSubmit={handleSubmit}>


        <DialogTitle>Add A Task</DialogTitle>
        <DialogContent>

            <Box  sx={{ mb:5, mt:5}} direction="col" >

            <TextField xs={3} label="Title" variant="outlined" name="title" />
            <TextField  xs={6}  multiline variant="outlined" label="Info" name="text" />

            </Box>

            <Box direction="row">
          <TextField
                    id="date"
                    name ="date"
                    label="Due Date"
                    type="date"
                    sx={{ width: 220, p:2}}
                    size={"small"}
                    InputLabelProps={{
                    shrink: true,
                }}  />
                        <Box>
                    <Switch autoFocus checked={isUrgent} onChange={ (_, checked)=> { toggleUrgent(checked) } } >urgent</Switch>
                    <Typography>This Task Is { isUrgent? "Urgent": "Not Urgent" } </Typography>
                        </Box>
            </Box>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button color="success"  type='submit'>Add</Button>
        </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

