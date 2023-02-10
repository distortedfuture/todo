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
        <>

        <TopBar/>
        <Typography gutterBottom variant="h4">done tasks homie</Typography>
        {
            todos.map( (task) => {
                if (task.complete)
                    return (
                        <>
                            <Typography variant="h4">{task.title}</Typography>

                        </>
                    );
                
            } )
        }

        </>
    )
}


export default DoneTasks;
