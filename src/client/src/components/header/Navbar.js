import { React , useEffect, useState , useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'
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
import { Link , Outlet} from 'react-router-dom';
import Popup from '../signIn/Popup';
import LittleCart from '../cart/LittleCart'
import Favorites from '../cart/Favorites';
import User from '../signIn/User';
import '../../styles/Navbar.moudle.scss'
import { addToBag , removeFromBag , editItem , initBag} from '../../slices/myBagSlice'

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

  const myBag = useSelector((state) => state.myBag.myBag);
  const dispatch = useDispatch();

  // const [myBag , setMyBag] = useState([])
  const [allClothes , setAllClothes] = useState([])
  const [myFavorite , setMyFavorite] = useState([]) 
  const [signIn , setSignIn]= useState(false);
  const[currentUser , setUser] = useState();
  const [orders , setOrders] = useState([])

  const [hoverCart , setHoverCart] = useState(false)
  const [hoverFavorite , setHoverFavorite] = useState(false)
  const [hoverUser , setHoverUser] = useState(false)
  const [search , setSearch] = useState();
  
  const [haveOrders , setHaveOrders] = useState(false)

  useEffect(()=>{
    let user = JSON.parse(localStorage.getItem('currentUser'));
    setUser(user);
    const getAllClothes = async () =>{
      await fetch(`allClothes`)
        .then((res) => res.json())
            .then((response) => {
              setAllClothes(response)
            })
    }
    getAllClothes();
  },[])

  useEffect(()=>{
    let user = JSON.parse(localStorage.getItem('currentUser'));
    setUser(user);
  },[])

  const usePrevious = (value)=>{
    const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]); 
  return ref.current;
  }

  const prevUser = usePrevious(currentUser)
  useEffect(()=>{
    console.log(myBag)
    const getMyBag = async ()=>{
      if(prevUser === null || prevUser === undefined){
        for(let item of myBag){
          const options ={
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({size:item.size , quantity:item.quantity , clothId:item.cloth.cloth_id , userId:currentUser.user_id})
          }
          try{
            let result = await fetch('/addToCarts', options);
            await result.json()
          }
          catch {
            console.log("no")
          }
        }
      }
      // setMyBag([])
      dispatch(initBag([]))
      setMyFavorite([])
      if(currentUser){
        await fetch(`getMyBag${currentUser.user_id}`)
        .then((res) => res.json())
            .then((response) => {
              // setMyBag(response)
              dispatch(initBag(response))
            })
    
        await fetch(`getMyFavorites${currentUser.user_id}`)
        .then((res) => res.json())
            .then((response) => {
              setMyFavorite(response)
            })
      }
    }
    getMyBag()
  },[currentUser])

  useEffect(()=>{
    const addToCart = async ()=>{
      for(let item of myBag){
        const options ={
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({size:item.size , quantity:item.quantity , clothId:item.cloth.cloth_id , userId:currentUser.user_id})
        }
        try{
          let result = await fetch('/addToCarts', options);
          await result.json()
        }
        catch {
          console.log("no")
        }
      }
    }
    if(currentUser !== undefined){
      const timeoutId = setTimeout(()=>addToCart(),1000)
      return () => {
        clearTimeout(timeoutId)
      }
    }
  },[myBag])

  useEffect(()=>{
    const getOrders = async () =>{
      if(currentUser){
        await fetch(`getMyOrder${currentUser.user_id}`)
          .then((res) => res.json())
              .then((response) => {
                setOrders(response)
              })
      }
    }
    const timeoutId = setTimeout(()=>getOrders(),1000)
      return () => {
        clearTimeout(timeoutId)
      }
  },[haveOrders , currentUser])

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
    setSignIn(true)
  }

  const handleSearch = (value) => {
    setSearch(value)
  }

  return (
    <div>
    <Box sx={{ flexGrow: 1}} style={{margin:"10px 0px"}}>
      <AppBar position="static" sx={{ backgroundColor:"#79a7ff"}}>
        <Toolbar>
          <Typography
            variant="h4"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' , flexGrow: 0.4} }}
          >
            <Link to="/" style={{color:"white"}}>S-wear</Link>
          </Typography>
            <Box className="divLinks">
                <Typography
                variant="h6"
                noWrap
                sx={{ display: { xs: 'none', sm: 'inline-block' }}}
                className="textLink"
                >
                <Link to="men" style={{color:"white"}}>Men</Link>
                </Typography>
                <Typography
                variant="h6"
                noWrap
                sx={{ display: { xs: 'none', sm: 'inline-block' }}}
                className="textLink">
                <Link to="women" style={{color:"white"}}>Women</Link>
                </Typography>
                <Typography
                variant="h6"
                noWrap
                sx={{ display: { xs: 'none', sm: 'inline-block' }}}
                className="textLink">
                <Link to="plus" style={{color:"white"}}>Plus size</Link>
                </Typography>
                <Typography
                variant="h6"
                noWrap
                sx={{ display: { xs: 'none', sm: 'inline-block' }}}
                className="textLink">
                <Link to="kids" style={{color:"white"}}>Kids</Link>
                </Typography>
           </Box>
          <Search className="searchBar">
            <SearchIconWrapper id="searchIcon">
              <SearchIcon/>
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e)=>{handleSearch(e.target.value)}}
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
      {signIn ? <Popup signIn={setSignIn} setUser={setUser}/> : <></>}
      {hoverCart ? <LittleCart myBag={myBag} setHover={setHoverCart}/> : <></>}
      {hoverUser ? <User currentUser={currentUser} setHover={setHoverUser} signIn={setSignIn} setUser={setUser} orders={orders}/> : <></>}
      {hoverFavorite ? <Favorites myFavorite={myFavorite} setHoverFavorite={setHoverFavorite} setFavorite={setMyFavorite}/> : <></>}
    </Box>
      <Outlet context={{ setMyFavorite:setMyFavorite , 
        myFavorite:myFavorite , currentUser:currentUser , setSignIn:setSignIn ,
        searchValue:search ,  allClothes:allClothes ,setHaveOrders:setHaveOrders , orders:orders }}></Outlet>
    </div>
  );
}
