import './App.css';
import { Button,Box, CssBaseline, Typography, AppBar, Toolbar, Stack, Modal} from "@mui/material";
import { Link } from 'react-router-dom';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import { useState } from 'react';
import AddModel from './AddModel';






function TopBar() {

  const [adding, setAdding] = useState(false);

  return (
    <>

			<Box sx={{ flexGrow:1 }}>
				<CssBaseline />
				<AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
					<Toolbar sx={{justifyContent: "space-between"}}>
            <Stack direction="row">

              <FormatListNumberedIcon sx={{ mt:5 }}/>

                      <Link to="./viewtasks" >
                      <Button  variant="contained" sx={{ p:2, m:2 }}>See Tasks</Button>
                      </Link>
                      <Link to="./doneTasks" >
                      <Button  variant="contained" sx={{ p:2, m:2 }}>Completed Tasks</Button>
                      </Link>
            </Stack>
            <AddModel />
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

