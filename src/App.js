import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Typography } from '@mui/material';
import TopBar from "./TopBar"
import ViewTasks from "./ViewTasks"
import DoneTasks from './DoneTasks';
import { Route, Routes, BrowserRouter} from 'react-router-dom';
import { db } from './firebaseconfig';
import { auth } from './firebaseconfig';
import { signInAnonymously, signOut } from '@firebase/auth';
import { useState, useEffect } from 'react';
import { collection , getDocs, doc, deleteDoc, updateDoc } from '@firebase/firestore';
import { getAuth, setPersistence, signInWithEmailAndPassword, browserLocalPersistence } from "@firebase/auth";


const myTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

function App() {

  const [data, setData] = useState([]);
  const [user, setUser] = useState(null);
  const [route, setRoute] = useState(null);
  const [collectionRef, setRef] = useState(null)



    const handleDone = async (todo) => {
      const task = doc(db, route, todo.id);
      await updateDoc(task, {
        complete : (!todo.complete)
      })
      Setter();
    }

    const handleDelete = async (todo) => {
      const task = doc(db, route, todo.id);
      await deleteDoc(task);
      
      Setter();
    }



  const resetData = async () => {
    let newData = await getDocs(collectionRef);
    setData(newData.docs.map( (doc)=> ({...doc.data(), id:doc.id}) ));
    console.log("reset data in app");
    console.log(data);
  }

  const Setter = async () => {
    resetData();
  }

  const signIn = async (email, pass) => {
    if (user){
      console.log("signed out ", user.email);
      signOut(auth);
    }


    signInWithEmailAndPassword(auth, email, pass).then((userCreds) => {
      console.log("Logged in: " + userCreds.user)
      setUser(userCreds.user);
  
      let r = `users/${userCreds.user.uid}/tasks`;
      if (userCreds.user.email == "simchal97@gmail.com")
        r = "tasks";
  
      setRoute(r);
  
      let ref = collection(db, r);
      setRef(ref);
      
      auth.setPersistence(auth, browserLocalPersistence);

      }).catch( () => {
      console.log("get a real account asshole")
    })


  }

  useEffect(  () => {

    signInAnonymously(auth).then((_user) => {
      if (!_user) {
        console.log("Login failed");
        return;
      }
 

      resetData();

    })

  }, [] );

  useEffect(  () => {
    if (user){
      console.log("signed in " , user.email);
      Setter();
    }

  }, [user] )


  return user? (
    <>
    <ThemeProvider theme={myTheme}>

      <TopBar data={data} setter={Setter} onSignIn={signIn} route={route}  />

    </ThemeProvider>

      <Routes >   
  
                <Route path='/viewtasks'element={ <ViewTasks data={data} setter={Setter} onDone={handleDone} onDelete={handleDelete} /> } ></Route>
                <Route path='/doneTasks'element={ <DoneTasks data={data} setter={Setter} onDone={handleDone} onDelete={handleDelete} /> } ></Route>
  
        </Routes>
    

    </>


  ) : (
    <>
        <ThemeProvider theme={myTheme}>

      <TopBar data={data} setter={Setter} onSignIn={signIn}  route={route}  />
        </ThemeProvider>


          <Typography variant='h1' sx={{m:4}} >Not signed In</Typography>
          <Typography variant='p1' sx={{m:4}} >sucks to be you...</Typography>



    </>
  );
}

export default App;
