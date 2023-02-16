
import './App.css';
import { Grid } from "@mui/material";
import Task from './Task';
import { updateDoc, deleteDoc, doc,  } from '@firebase/firestore';
import { db } from "./firebaseconfig";


function ViewTasks(props) {
  
  const handleDone = async (todo) => {
    // create doc inst
    const task = doc(db, "tasks", todo.id);
    // toggle done task
    await updateDoc(task, {
      complete : (!todo.complete)
    })
    props.setter();
  }
  const handleDelete = async (todo) => {
    const task = doc(db, "tasks", todo.id);
    await deleteDoc(task);
    props.setter();
  }



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
        props.data.map( (task) => {
          return task.complete? "" : (
            <div key={task.id}>
            <Grid  item xs={4} sx={{ maxWidth:400, minWidth:300,  padding:4}}>

              <Task task={task}  onUpdate={ () => handleDone(task) } onDelete={() => handleDelete(task)} />

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





