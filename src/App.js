import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import TopBar from "./TopBar"
import ViewTasks from "./ViewTasks"
import DoneTasks from './DoneTasks';
import { Route, Routes,} from 'react-router-dom';
import { db } from './firebaseconfig';
import { useState, useEffect } from 'react';
import { collection , getDocs} from '@firebase/firestore';


const myTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

function App() {

  const [data, setData] = useState([]);
  const taskCollectionRef = collection(db, "tasks");

  const Setter = (newData) => {
    setData(newData);
  }

  useEffect(  () => {
    var getTasks = async () => {
      const data = await getDocs(taskCollectionRef);
      setData(data.docs.map( (doc)=> ({...doc.data(), id:doc.id}) ));
      console.log("reset data in app");
    }

    getTasks();
  }, [] );


  return (
    <>
    <ThemeProvider theme={myTheme}>

      <TopBar data={data} setter={setData} />

    </ThemeProvider>
    
    <Routes >   

              <Route path='/viewtasks'element={ <ViewTasks data={data} setter={Setter} /> } ></Route>
              <Route path='/doneTasks'element={ <DoneTasks data={data} setter={Setter} /> } ></Route>

      </Routes>

    </>


  );
}

export default App;
