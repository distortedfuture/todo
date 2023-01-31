
import './App.css';
import { Stack, Button,Box, CssBaseline, Typography, AppBar, Toolbar} from "@mui/material";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ToDo from './ToDo';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';




function AddTask() {
  return (
      <div className='App'>
        <Typography variant='p'>add tasks page</Typography>

        <Stack>
          <ToDo/>
        </Stack>
      </div>

  );
}

export default AddTask;




