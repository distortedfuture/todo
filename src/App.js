import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import TopBar from "./TopBar"
import ViewTasks from "./ViewTasks"
import DoneTasks from './DoneTasks';
import { Route, Routes,} from 'react-router-dom';
import { db } from './firebaseconfig';
import { auth } from './firebaseconfig';
import { signInAnonymously, signInWithEmailAndPassword } from '@firebase/auth';
import { useState, useEffect } from 'react';
import { collection , getDocs, doc, deleteDoc, updateDoc } from '@firebase/firestore';


const myTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

function App() {

  const [data, setData] = useState([]);
  const [user, setUser] = useState(null);
  const [collectionRef, setRef] = useState(null)

  const taskCollectionRef = collection(db, "tasks");


      const handleDone = async (todo) => {
        const task = doc(db, "tasks", todo.id);
        await updateDoc(task, {
          complete : (!todo.complete)
        })
        Setter();
      }
      const handleDelete = async (todo) => {
        const task = doc(db, "tasks", todo.id);
        await deleteDoc(task);
        
        Setter();
      }



  const resetData = async () => {
    let newData = await getDocs(taskCollectionRef);
    // let newData = await getDocs(collectionRef);
    setData(newData.docs.map( (doc)=> ({...doc.data(), id:doc.id}) ));
    console.log("reset data in app");
    console.log(data);
  }

  const Setter = async (newData) => {
    resetData(newData);
  }

  const signIn = async () => {
    signInWithEmailAndPassword(auth, "simcha@l.com", "123456").then((userCreds) => {
      console.log("Logged in: " + userCreds.user)
      
      setUser(userCreds.user);
      console.log(user.uid);
      let route = `users/${user.uid}/tasks`;
      let ref = collection(db, route);
      setRef(ref);
  

      }).catch((e) => {
      console.log(e)
        
    })

  }

  useEffect(  () => {

    signInAnonymously(auth).then((user) => {
      if (!user) {
        console.log("Login failed");
        return;
      }
      // signIn();

      resetData();

    })

  }, [] );


  return (
    <>
    <ThemeProvider theme={myTheme}>

      <TopBar data={data} setter={setData} />

    </ThemeProvider>

      <Routes >   
  
                <Route path='/viewtasks'element={ <ViewTasks data={data} setter={Setter} onDone={handleDone} onDelete={handleDelete} /> } ></Route>
                <Route path='/doneTasks'element={ <DoneTasks data={data} setter={Setter} onDone={handleDone} onDelete={handleDelete} /> } ></Route>
  
        </Routes>
    

    </>


  );
}

export default App;
