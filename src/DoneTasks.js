import React from "react";
import { Grid } from "@mui/material";
import { deleteDoc, doc , updateDoc }from "@firebase/firestore";
import { db } from "./firebaseconfig";
import Task from "./Task";


const DoneTasks = (props) => {


    // const handleDone = async (todo) => {
    //     const task = doc(db, "tasks", todo.id);
    //     await updateDoc(task, {
    //       complete : (!todo.complete)
    //     })
    //     props.setter();
    //   }
    //   const handleDelete = async (todo) => {
    //     const task = doc(db, "tasks", todo.id);
    //     await deleteDoc(task);
        
    //     props.setter();
    //   }

    return (
        
        <Grid container 
            rowSpacing={1}submit
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            spacing={0}
            justifyContent={"space-between"}
            style={{ minHeight: '100vh', padding:150 }}  >                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
        {
            props.data.map( (task) => {
                if (task.complete)
                return (
                    <div key={task.id}>
            <Grid  item xs={4} sx={{ maxWidth:400, minWidth:300,  padding:4}}>
                <Task task={task}  onUpdate={ () => props.onDone(task) } onDelete={() => props.onDelete(task)} />

                </Grid>

                </div>
                    );
                    
                } )
            }
            </Grid>


        // </div>
    )
}


export default DoneTasks;
