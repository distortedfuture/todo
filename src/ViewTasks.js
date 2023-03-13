
import './App.css';
import { Grid } from "@mui/material";
import Task from './Task';


function ViewTasks(props) {
  



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
        props.data?.map( (task) => {
          return task.complete? "" : (
            <div key={task.id}>
            <Grid  item xs={4} sx={{ maxWidth:400, minWidth:300,  padding:4}}>

              <Task task={task}  onUpdate={ () => props.onDone(task) } onDelete={() => props.onDelete(task)} />

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





