
import './App.css';
import { Card, Button, Typography, CardContent,CardActions , Grid, Avatar} from "@mui/material";
import moment from 'moment';
import ErrorIcon from '@material-ui/icons/Error';
import { useEffect, useState } from 'react';
import { db } from './firebaseconfig';
import { collection, getDocs, doc, deleteDoc, updateDoc } from '@firebase/firestore';

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
    let helper = todos.filter((task) => {
      return task.id !== id;
    })
    setTodos(helper);
  }

  const doneTask = async (id) => {
    const task = doc(db, "tasks", id);
    await updateDoc(task, {
      complete : true
    })
    let helper = todos.filter((task) => {
      return task.id !== id;
    })
    setTodos(helper);
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
      <Grid container 
      rowSpacing={1}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      spacing={0}
      justifyContent={"space-between"}
      style={{ minHeight: '100vh', padding:150 }}  
      >
      {
        todos.map( (task) => {
          return task.complete? "" : (
            <div key={task.id}>
            <Grid  item xs={4} sx={{ maxWidth:400, minWidth:300,  padding:4}}>
              <Card >
                <CardContent >
                  <Typography variant='h5' sx={{ textDecoration:"underline" }}  gutterBottom>{task.title}</Typography>
                  <Typography variant='paragraph'>{task.body}</Typography>
                  <br></br>
                  <Typography variant='paragraph'  >due in { daysTilDue(task.due)} days</Typography>
                </CardContent>
              <CardActions>
                <Button variant='outlined' color="success" onClick={ ()=> { doneTask(task.id) } } >done!</Button>
                <Button variant='outlined' color="error" onClick={ ()=> { deleteTask(task.id) } } >delete</Button>
                { task.urgent?   <Avatar sx={{ m:2 }}>!</Avatar>   :""}
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


  );
}

export default ViewTasks;





