import {React , useState} from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SighIn from './SighIn';
import Popup from './Popup';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  [theme.breakpoints.up('sm')]: {
    marginRight: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function Navbar() {

  const [favorites , setFavorites] = useState();
  const [myBag , setMyBag] = useState();

  const [sighIn , setSighIn]= useState(false)

  const handleUserClick = () => {
    setSighIn(true)
  }

  return (
    <Box sx={{ flexGrow: 1}}>
      <AppBar position="static" sx={{ backgroundColor:"rgb(102, 175, 235)"}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h4"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' , flexGrow: 0.4} }}
          >
            SHOVAL SPORT
          </Typography>
            <Box sx={{ flexGrow: 1 , textAlign:"center"}}>
                <Typography
                variant="h6"
                noWrap
                sx={{ display: { xs: 'none', sm: 'inline-block' } , paddingRight:10}}
                >
                men
                </Typography>
                <Typography
                variant="h6"
                noWrap
                sx={{ display: { xs: 'none', sm: 'inline-block' } , paddingRight:10}}>
                women
                </Typography>
                <Typography
                variant="h6"
                noWrap
                sx={{ display: { xs: 'none', sm: 'inline-block' } , paddingRight:10}}>
                kids
                </Typography>
                <Typography
                variant="h6"
                noWrap
                sx={{ display: { xs: 'none', sm: 'inline-block' } , paddingRight:10}}>
                back to school
                </Typography>
                <Typography
                variant="h6"
                noWrap
                sx={{ display: { xs: 'none', sm: 'inline-block' } , paddingRight:10}}>
                sale
                </Typography>
           </Box>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={myBag} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={favorites} color="error">
                <FavoriteIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              onClick={() => handleUserClick()}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {sighIn ? <Popup sighIn={setSighIn}/> : <></>}
    </Box>
  );
}
