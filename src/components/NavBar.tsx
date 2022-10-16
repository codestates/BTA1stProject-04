import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { AccountCircle } from '@mui/icons-material';
import {
  Box,
  Button,
  FormControl,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Select,
} from '@mui/material';
import React from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from 'react-router-dom';
import { useLotus } from '../providers/LotusProvider';
import { Network } from '../services/lotusClients';

const NavBar = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { network, setNetwork } = useLotus();

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
        <Box sx={{ display: `flex`, alignItems: `center` }}>
          <FormControl sx={{ mx: 1 }}>
            <Select
              value={network}
              size="small"
              sx={{ color: `primary.contrastText` }}
              onChange={(e) => setNetwork(e.target.value as Network)}
            >
              <MenuItem value="mainnet">메인넷</MenuItem>
              <MenuItem value="testnet">테스트넷</MenuItem>
            </Select>
          </FormControl>
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
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
