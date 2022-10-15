import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function NavBar() {
    return (
        <AppBar>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Filenori
                </Typography>
                <Button color="inherit">Switch Network</Button>
            </Toolbar>
        </AppBar>
    );
}

export default NavBar;
