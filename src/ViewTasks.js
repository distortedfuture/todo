
import './App.css';
import { Accordion, Stack, Button,Box, Typography} from "@mui/material";
import tasks from "./tasks.json"

import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { app, db } from './firebaseconfig';
import { collection, getDocs, doc, getFirestore, deleteDoc } from '@firebase/firestore';

// const db = getFirestore(app);

const daysTilDue = (date) => {
  let current = new Date();

  let today = moment(current, "YYYY-MM-DD");
  let due = moment(date, "YYYY-MM-DD");

  let result = due.diff(today, "days");

  return(result);

}


function ViewTasks() {

  const [todos, setTodos] = useState([]);
  const taskCollectionRef = collection(db, "tasks");

  const deleteTask = async (id) => {
    const task = doc(db, "tasks", id);
    await deleteDoc(task);
  }

  useEffect(  () => {
    var getTasks = async () => {
      const data = await getDocs(taskCollectionRef);
      setTodos(data.docs.map( (doc)=> ({...doc.data(), id:doc.id}) ))
      console.log(todos)
    }

    getTasks();
  }, [] );



  return (
      <div className='App'>
      <>

      {
        todos.map( (task) => {
          return(
            <div key={task.id}>
              <Accordion>
                <AccordionSummary ExpandIcon={<ExpandMoreIcon/>} 
                aria-controls="panella-content"
                id={task.id}
                > 
                <Typography> {task.title} </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography> {task.body}</Typography>
                    <Typography> due in { daysTilDue( JSON.stringify(task.due) ) } days</Typography>
                    <Button variant="contained" onClick={() => {deleteTask(task.id)} } >delete</Button>

                </AccordionDetails>
              </Accordion>
            </div>
          );
        } )
      }
      </>
      </div>

  );
}

export default ViewTasks;



/*
      {
        tasks.map( (task) => {
          return(
            <>
            <Typography> {task.title} </Typography>
            <Typography> {task.text} </Typography>
            <Typography> {task.due} </Typography>
            </>
          );
        } )
      }

*/ 



