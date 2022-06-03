import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import { AppBar, Toolbar } from '@mui/material';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useAppDispatch } from '../store/hooks';
import { check, signout } from '../store/thunks/authThunk';

export default function Header(): JSX.Element {
  const { auth } = useSelector((state: RootState) => state);
  const dispatch = useAppDispatch();
  const signoutClick = () => {
    dispatch(signout());
  };

  useEffect(() => {
    dispatch(check());
  }, [dispatch]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            RSS Feed
          </Typography>
          <Button component={Link} to="/" color="inherit">
            Home
          </Button>
          {auth.isAuthenticated ? (
            <>
              <Button component={Link} to="dashboard" color="inherit">
                Dashboard
              </Button>
              <Button onClick={signoutClick} color="inherit">
                SignOut
              </Button>
            </>
          ) : (
            <>
              <Button component={Link} to="signin" color="inherit">
                SignIn
              </Button>
              <Button component={Link} to="signup" color="inherit">
                SignUp
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
