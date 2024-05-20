import { Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from "@mui/material";
import { mainNavData } from "../data/data";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { eventBus } from "../../../hooks/eventBus";
 
interface Props {
  width: number;
  mobileOpen: boolean;
  handleDrawerClose: () => void;
  handleDrawerTransitionEnd: () => void;
}



const MainNav = (props: Props) => {

  const navigate = useNavigate();
  const mobileOpen = props.mobileOpen;
  const drawerWidth = props.width;
  const handleDrawerClose = props.handleDrawerClose;
  const handleDrawerTransitionEnd = props.handleDrawerTransitionEnd;

  const handleItemClick = (path: string) => {
    navigate(path); 
    handleDrawerClose(); 
  };


  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {mainNavData.list.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton onClick={() => handleItemClick(item.path)}>
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );

  return (
    <>
    <Drawer
          
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
        </>



    
);
};


export default MainNav


// MainNav.tsx


{/* <Drawer variant="permanent"
    sx={{
      width: width,
      flexShrink: 0,
      [`& .MuiDrawer-paper`]: { width: width, boxSizing: 'border-box' },
    }}>
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem key={text} disablePadding component={Link} to={`/emmisionFactors`}>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer> */}

