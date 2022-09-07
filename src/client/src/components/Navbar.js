import {React , useEffect, useState} from 'react';
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
import Popup from './Popup';
import { Link , Outlet} from 'react-router-dom';
import LittleCart from './LittleCart'
import Favorites from './Favorites';
import User from './User';
import { Unstable_Grid2 } from '@mui/material';

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
  let [myBag , setMyBag] = useState([])
  let [myFavorite , setMyFavorite] = useState([])
  const [hoverCart , setHoverCart] = useState(false)
  const [hoverFavorite , setHoverFavorite] = useState(false)
  const [hoverUser , setHoverUser] = useState(false)

  const [sighIn , setSighIn]= useState(false);
  const[currentUser , setUser] = useState();

  useEffect(()=>{
    let user = JSON.parse(localStorage.getItem('currentUser'));
    setUser(user)
  },[])

  useEffect(()=>{
    if(hoverCart){
     setHoverFavorite(false)
     setHoverUser(false)
    }
      
  } , [hoverCart])

  useEffect(()=>{
    if(hoverFavorite) {
      setHoverCart(false)
      setHoverUser(false)
      }
  } , [hoverFavorite])

  useEffect(()=>{
    if(hoverUser) {
      setHoverCart(false)
      setHoverFavorite(false)
      }
  } , [hoverUser])

  const handleUserClick = () => {
    setSighIn(true)
  }

  const handleFavoriteClick = () => {
    console.log(myFavorite)
  }

  return (
    <div>
    <Box sx={{ flexGrow: 1}} style={{margin:"10px"}}>
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
            <Link to="/" style={{color:"white"}}>SHOVAL SPORT</Link>
          </Typography>
            <Box sx={{ flexGrow: 1 , textAlign:"center"}}>
                <Typography
                variant="h6"
                noWrap
                sx={{ display: { xs: 'none', sm: 'inline-block' } , paddingRight:10}}
                >
                <Link to="men" style={{color:"white"}}>men</Link>
                </Typography>
                <Typography
                variant="h6"
                noWrap
                sx={{ display: { xs: 'none', sm: 'inline-block' } , paddingRight:10}}>
                <Link to="women" style={{color:"white"}}>women</Link>
                </Typography>
                <Typography
                variant="h6"
                noWrap
                sx={{ display: { xs: 'none', sm: 'inline-block' } , paddingRight:10}}>
                <Link to="plus" style={{color:"white"}}>plus size</Link>
                </Typography>
                <Typography
                variant="h6"
                noWrap
                sx={{ display: { xs: 'none', sm: 'inline-block' } , paddingRight:10}}>
                <Link to="kids" style={{color:"white"}}>kids</Link>
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
            <Link to="cart" style={{color:"white"}}>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit"
            onMouseEnter={() => setHoverCart(true)}
            >
              <Badge badgeContent={myBag.length} color="error">
                <ShoppingCartIcon/>
              </Badge>
            </IconButton>
            </Link>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              onClick={() => handleFavoriteClick()}
            >
              <Badge badgeContent={myFavorite.length} color="error"
              onMouseEnter={() => setHoverFavorite(true)}>
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
              onMouseEnter={() => setHoverUser(true)}
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {sighIn ? <Popup sighIn={setSighIn} setUser={setUser}/> : <></>}
      {hoverCart ? <LittleCart myBag={myBag} setHover={setHoverCart}/> : <></>}
      {hoverUser ? <User currentUser={currentUser} setHover={setHoverUser} sighIn={setSighIn}/> : <></>}
      {hoverFavorite ? <Favorites myFavorite={myFavorite} setHoverFavorite={setHoverFavorite} setFavorite={setMyFavorite}/> : <></>}
    </Box>
      <Outlet context={{setMyBag:setMyBag , myBag:myBag , setMyFavorite:setMyFavorite , myFavorite:myFavorite , currentUser:currentUser}}></Outlet>
    </div>
  );
}
