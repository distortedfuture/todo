import React from "react";
import moment from "moment";
import { Card, Typography, CardActions, CardContent, Stack, Button} from "@mui/material";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


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

              <Stack direction="row" justifyContent={"center"} container>
              <Typography variant='h5' item sx={{ color:"blue" }}  gutterBottom>{props.task.title}</Typography>
              </Stack>

              <Typography variant='subtitle'  gutterBottom sx={{ p:1, mb:1 }} >{props.task.body}</Typography>
              <br></br>
              <Typography variant="subtitle2"  sx={{ mt:3, mb:0, textAlign:"center" }} >due in { daysTilDue(props.task.due)} days</Typography>
            </CardContent>

          <CardActions>
            <Button vari ant='outlined' color="success" onClick={ props.onUpdate } >done</Button>
            <Button variant='outlined' color="error" onClick={ props.onDelete } >delete</Button>
                  { props.task.urgent?    <ErrorOutlineIcon  item sx={{ m:1 }}  color="primary"/> : "" }
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
                <Button variant='outlined'  color="success" onClick={ props.onUpdate } >undone</Button>
              </CardActions>
        
              </Card>

            );
        }
};


