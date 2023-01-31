import './App.css';
import { Button,Box, CssBaseline, Typography, AppBar, Toolbar, Icon} from "@mui/material";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Link
  } from 'react-router-dom';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';


function TopBar() {
  return (

			<Box sx={{ display: 'flex' }}>
				<CssBaseline />
				<AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
					<Toolbar>
            <FormatListNumberedIcon />
						<Typography variant="h6" noWrap component="div">
              app
						</Typography>

                    <Link to="./addtask">
                    <Button  variant="contained" sx={{ p:2, m:2 }}>Add Task</Button>
                    </Link>
                    <Link to="./viewtasks" >
                    <Button  variant="contained" sx={{ p:2, m:2 }}>See Tasks</Button>
                    </Link>

					</Toolbar>
        </AppBar>
    <Box sx={{flexGrow: 1}}>
          <Toolbar />
        </Box>
	</Box>


  );
}

export default TopBar;




