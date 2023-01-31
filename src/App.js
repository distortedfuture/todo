import './App.css';
import { Tab, Tabs, Button,Box, CssBaseline, Typography, AppBar, Toolbar} from "@mui/material";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import TodoList from './TodoList';
import TopBar from "./TopBar"
import AddTask from "./AddTask"
import ViewTasks from "./ViewTasks"
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from 'react-router-dom';


const myTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

function App() {

  return (
    <>
    <ThemeProvider theme={myTheme}>

      <TopBar/>

      <Box justifyContent={"center"} sx={{ display:"flex" }} >
        <Typography variant='h2' gutterBottom sx={{ p:5, m:5, align:"center" }} >To Do App</Typography>
      </Box>

    </ThemeProvider>
    
    <Routes >   

              <Route exact path='/addtask'  element={ <AddTask/> }  ></Route>
              <Route exact path='/viewtasks'element={ <ViewTasks/> } ></Route>
      </Routes>

    </>


  );
}

export default App;
