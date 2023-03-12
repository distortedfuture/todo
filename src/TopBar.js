import './App.css';
import { Button,Box, CssBaseline, AppBar, Toolbar, Stack} from "@mui/material";
import { Link } from 'react-router-dom';
// import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import AddModel from './AddModel';
import SignInBox from './signInBox';






function TopBar(props) {

  return (
    <>

			<Box sx={{ flexGrow:1 }}>
				<CssBaseline />
				<AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
					<Toolbar sx={{justifyContent: "space-between"}}>
            <Stack direction="row">

              <SignInBox  onSignIn={props.onSignIn} />

                      <Link to="./viewtasks" >
                      <Button  variant="contained" sx={{ p:2, m:2 }}>See Tasks</Button>
                      </Link>
                      <Link to="./doneTasks" >
                      <Button  variant="contained" sx={{ p:2, m:2 }}>Completed Tasks</Button>
                      </Link>
            </Stack>
            <AddModel  data={props.data} setter={props.setter}  ref={props.ref} route={props.route} />
					</Toolbar>
        </AppBar>
    <Box sx={{flexGrow: 1}}>
          <Toolbar />
        </Box>
	</Box>

      </>


  );
}

export default TopBar;

