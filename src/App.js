import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import TopBar from "./TopBar"
import ViewTasks from "./ViewTasks"
import DoneTasks from './DoneTasks';
import {
  Route,
  Routes,
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

    </ThemeProvider>
    
    <Routes >   

              <Route path='/viewtasks'element={ <ViewTasks/> } ></Route>
              <Route path='/doneTasks'element={ <DoneTasks/> } ></Route>

      </Routes>

    </>


  );
}

export default App;
