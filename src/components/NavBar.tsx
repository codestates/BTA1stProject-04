import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { AccountCircle } from '@mui/icons-material';
import {
  Button,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from '@mui/material';
import React from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar style={{ display: `flex`, justifyContent: `space-between` }}>
        <Button component={Link} to="/">
          <Typography
            variant="h6"
            color="white"
            sx={{ flexGrow: 1, textTransform: `none` }}
          >
            Filenori
          </Typography>
        </Button>
        <IconButton size="large" onClick={handleMenu} color="inherit">
          <AccountCircle />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: `bottom`,
            horizontal: `right`,
          }}
          keepMounted
          transformOrigin={{
            vertical: `top`,
            horizontal: `right`,
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <SettingsIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Setting</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
