import React from 'react';
import { connect } from 'react-redux';
import { Link , withRouter} from 'react-router-dom';
// import './layout.css';

import { AppBar, CssBaseline, Divider, Drawer, Hidden, IconButton, List, ListItem, ListItemText, Toolbar } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import Aux from '../auxilary-hoc/auxilary-hoc';
import UnitsButton from '../../components/header/units-button/units-button';
import * as actions from '../../store/actions';

const drawerWidth = 230;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  contentDark: {
    flexGrow: 1,
    padding: theme.spacing(3),
    backgroundColor: '#1a1919',
    color: '#999'
  },
  contentLight: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function ResponsiveDrawer(props) {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  // const [darkMode, setDarkMode] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const closeMenuMobile = () => {
    if(mobileOpen){
      console.log('mobile');
      setMobileOpen(!mobileOpen);
    }
  };

  const disableMoreInfo = () => {
    closeMenuMobile();
    props.onUndoMoreInfo();
  }

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
          <ListItem button onClick={disableMoreInfo} component={Link} to="/" selected={'/'===props.location.pathname}>
            <ListItemText primary="HOME" />
          </ListItem>
          <ListItem button onClick={closeMenuMobile} component={Link} to="/favorites-page" selected={'/favorites-page'===props.location.pathname}>
            <ListItemText primary="FAVORITES" />
          </ListItem>
      </List>
      <Divider />
      {/* <List>
        
      </List> */}
    </div>
  );

  return (
    <Aux>
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" color="default" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <UnitsButton/>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
          {props.children}
      </main>
    </div>
    </Aux>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    onUndoMoreInfo: () => dispatch(actions.undoMoreInfoFromFavorites())
  }
};


export default connect(null, mapDispatchToProps)(withRouter(ResponsiveDrawer));
