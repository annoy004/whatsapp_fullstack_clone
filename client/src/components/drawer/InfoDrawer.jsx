
import {Drawer,Box,Typography,styled} from '@mui/material'; 
import { ArrowBack } from '@mui/icons-material';

// component
import Profile from './Profile';

const Header = styled(Box)`
background :#008069;
height:107px;
color: #FFFFFF;
display:flex;
& > svg , & >P {
  margin-top:auto;
  padding:15px;
  font-weight:600;
}
`
const Text = styled(Typography)`
font-size:18px;`

const Component = styled(Box)`
background: #ededed;
height: 85%;
overflow-y: auto;

@media (max-width: 768px) {
    height: calc(100% - 107px);
}
`

const InfoDrawer = ({open, setOpen}) => { 

  const handleClose =() => {
    setOpen(false);
  }
  
  const drawerStyle = {
    left: { xs: 0, md: 31 },
    top: { xs: 0, md: 12 },
    height: { xs: '100%', md: '95%' },
    width: { xs: '100%', md: '35%', lg: '35%' },
    maxWidth: { xs: '100%', md: '35%' },
    boxShadow: 'none',
  }
  
    return (
        <Drawer
        open = {open}
        onClose={handleClose}
        PaperProps ={{sx: drawerStyle}}
        style={{zIndex:1800}}
        > 
        <Header>
            <ArrowBack onClick={() => setOpen(false)}/>
            <Text>Profile</Text>
        </Header>
        <Component>
          <Profile/>
        </Component>

        </Drawer>
    )
}

export default InfoDrawer;