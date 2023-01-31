import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import ToDo from "./ToDo";




export default function TodoList( ) {

    const [todoList, setTodoList] = useState(null);
    

    useEffect( 
        () => {
            console.log("the use affect works")
        }, []
    );



    return(
        <Box sx={{ display:"flex", p:1,  m:3}} >

            <ToDo title={"test task"}> </ToDo>

        </Box>
    );
}

