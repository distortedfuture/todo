
import './App.css';
import { Accordion, Stack, Button,Box, Typography} from "@mui/material";
import tasks from "./tasks.json"

import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import moment from 'moment';


const daysTilDue = (date) => {
  let current = new Date();

  let today = moment(current, "MM-DD-YYYY");
  let due = moment(date, "MM-DD-YYYY");

  let result = due.diff(today, "days");

  return(result);

}


function ViewTasks() {
  return (
      <div className='App'>
      <>

      {
        tasks.map( (task) => {
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
                    <Typography> {task.text}</Typography>
                    <Typography> due in { daysTilDue(task.due) } days</Typography>

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



