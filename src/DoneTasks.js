import { TaskSharp } from "@mui/icons-material";
import { CardActions, CardContent, Typography } from "@mui/material";
import { Card } from "@material-ui/core";
import { collection , getDocs} from "@firebase/firestore";
import React, { useState, useEffect } from "react";
import TopBar from "./TopBar";
import { db } from "./firebaseconfig";


const DoneTasks = () => {

    const [todos, setTodos] = useState([]);
    const taskCollectionRef = collection(db, "tasks");

    useEffect( () => {
        var getTasks = async () => {
          const data = await getDocs(taskCollectionRef);
          setTodos(data.docs.map( (doc)=> ({...doc.data(), id:doc.id}) ))
        }
    
        getTasks();
      }, [] );


    return (
<div className='App'>
      <>
      <Grid container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: '100vh' }}  
      >
      {
        todos.map( (task) => {
        if (task.complete)
             return (
                    <div key={task.id}>
            <Grid  item xs={6} sx={{ maxWidth:400, minWidth:300, align:'center', padding:4}}>
              <Card >
                <CardContent >
                  <Typography variant='h5' sx={{ textDecoration:"underline" }}  gutterBottom>{task.title}</Typography>
                </CardContent>
              <CardActions>
                <Button variant='outlined' color="error" onClick={ ()=> { deleteTask(task.id) } } >delete</Button>
              </CardActions>

              </Card>

            </Grid>

              </div>
          );
        } )
      }
      </Grid>
    </>
    </div>
    )
}


export default DoneTasks;
