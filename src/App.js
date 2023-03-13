import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Typography } from '@mui/material';
import TopBar from "./TopBar"
import ViewTasks from "./ViewTasks"
import DoneTasks from './DoneTasks';
import { Route, Routes} from 'react-router-dom';
import { db } from './firebaseconfig';
import { auth } from './firebaseconfig';
import { signOut } from '@firebase/auth';
import { useState, useEffect } from 'react';
import { collection , getDocs, doc, deleteDoc, updateDoc } from '@firebase/firestore';
import {  signInWithEmailAndPassword } from "@firebase/auth";


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
    const handleSignOut = () => {
      if (user) {
        console.log("good bye " + user.email);
        
        signOut(auth);
        setUser(null);
        setRef(null);
        setRoute(null);
        setData(null);

      }  else {
        console.log("no one signed in so no one can sign out");
      }
    }



  const resetData = async () => {
    let newData = await getDocs(collectionRef);
    setData(newData.docs.map( (doc)=> ({...doc.data(), id:doc.id}) ));
    console.log("reset data in app");
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
      setUser(userCreds.user);
      
      let r = `users/${userCreds.user.uid}/tasks`;
      if (userCreds.user.email === "simchal97@gmail.com")
        r = "tasks";

      setRoute(r);
      
      let ref = collection(db, r);
      setRef(ref);
      

      }).catch( () => {
      console.log("get a real account asshole")
    })


  }

  useEffect(  () => {

    auth.onAuthStateChanged((_user) => {

      setUser(_user);
      if (_user)
      {

          let r = `users/${_user.uid}/tasks`;
          if (_user.email === "simchal97@gmail.com")
            r = "tasks";
          
          setRoute(r);
          
          let ref = collection(db, r);
          setRef(ref);
      }

    } )
    console.log(auth);

    Setter();

  }, [] );

  // user hook
  useEffect(  () => {
    if (user){
      console.log("signed in " , user.email);
      setRoute(`users/${user.uid}/tasks`)
      if (user.email === "simchal97@gmail.com")
        setRoute(`tasks`)
      Setter();
      console.log(auth);
    }

  },[user] )


  return user? (
    <>
    <ThemeProvider theme={myTheme}>

      <TopBar data={data} setter={Setter} onSignIn={signIn} route={route} signOut={handleSignOut}  />

    </ThemeProvider>

      <Routes >   
  
                <Route path='/'element={ <ViewTasks data={data} setter={Setter} onDone={handleDone} onDelete={handleDelete} /> } ></Route>
                <Route path='/doneTasks'element={ <DoneTasks data={data} setter={Setter} onDone={handleDone} onDelete={handleDelete} /> } ></Route>
  
        </Routes>
    

    </>

  ) : (
    <>
        <ThemeProvider theme={myTheme}>

      <TopBar data={data} setter={Setter} onSignIn={signIn}  route={route} signOut={handleSignOut} />
        </ThemeProvider>


          <Typography variant='h1' sx={{m:4}} >Not signed In</Typography>
          <Typography variant='p1' sx={{m:4}} >sucks to be you...</Typography>



    </>
  );
}

export default App;
