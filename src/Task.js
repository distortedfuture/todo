import React from "react";
import moment from "moment";
import { Card, Typography, CardActions, CardContent, Avatar , Button} from "@mui/material";



const daysTilDue = (date) => {
    let current = new Date();
  
    let today = moment(current, "YYYY-MM-DD");
    let due = moment(date, "YYYY-MM-DD");
  
    let result = due.diff(today, "days");
  
    return(result);
  
  }
  
  
  export default function Task(props) {
      
    if (!props.task.complete)
    {
        return (
            <Card >
            <CardContent >
              <Typography variant='h5' sx={{ textDecoration:"underline" }}  gutterBottom>{props.task.title}</Typography>
              <Typography variant='paragraph'>{props.task.body}</Typography>
              <br></br>
              <Typography variant='paragraph'  >due in { daysTilDue(props.task.due)} days</Typography>
            </CardContent>
          <CardActions>
            <Button variant='outlined' color="success" onClick={ props.onUpdate } >done!</Button>
            <Button variant='outlined' color="error" onClick={ props.onDelete } >delete</Button>
            { props.task.urgent?   <Avatar sx={{ m:2 }}>!</Avatar>   :""}
          </CardActions>
    
          </Card>
        );
        } else {
            return (

             <Card >
                <CardContent >
                  <Typography variant='h5' sx={{ textDecoration:"underline" }}  gutterBottom>{props.task.title}</Typography>
                  <br></br>
                </CardContent>
              <CardActions>
                <Button variant='outlined' color="error" onClick={ props.onDelete } >delete</Button>
                <Button variant='outlined' color="success" onClick={ props.onUpdate } >undone</Button>
              </CardActions>
        
              </Card>

            );
        }
};


