import React from 'react';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import AddIcon from '@material-ui/icons/Add';
import CategoryIcon from '@material-ui/icons/Category';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ViewListIcon from '@material-ui/icons/ViewList';
import GroupIcon from '@material-ui/icons/Group';
import ListItemText from '@material-ui/core/ListItemText';
import TuneIcon from '@material-ui/icons/Tune';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
// import logo from '../assets/log.png'
import Logo from './../assets/Logo'

import { connect } from 'react-redux';

import { makeStyles, useTheme } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
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
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function ResponsiveDrawer(props) {

  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  console.log('prosssss', props);
  const drawer = (
    <div >
      {/* <img src={logo} alt="" style={{ marginTop: 40, marginLeft: 20 }} /> */}
      <Logo />

      <div className={classes.toolbar} />

      <Divider />
      {

        props.logged && props.type === 'admin' ?
          <>
            <List>
              {/* <a href="/admin/addItem">
          <ListItem button key="Add Item">
            <ListItemIcon>{<AddIcon />}</ListItemIcon>
            <ListItemText primary="Add Item" />
          </ListItem>
        </a>
        <a href="/admin/ViewItem">
          <ListItem button key="View Item">
            <ListItemIcon>{<ViewListIcon />}</ListItemIcon>
            <ListItemText primary="View Item" />
          </ListItem>
        </a> */}

              <a href="/admin/Orders">
                <ListItem button key="Orders">
                  <ListItemIcon>{<LocalMallIcon />}</ListItemIcon>
                  <ListItemText primary="Orders" />
                </ListItem>
              </a>
              <a href="/admin/Users">
                <ListItem button key="Users">
                  <ListItemIcon>{<GroupIcon />}</ListItemIcon>
                  <ListItemText primary="Users" />
                </ListItem>
              </a>
              {/* <a href="/admin/Slider">
          <ListItem button key="Slider">
            <ListItemIcon>{<TuneIcon />}</ListItemIcon>
            <ListItemText primary="Slider" />
          </ListItem>
        </a> */}
              {/* <a href="/admin/addCoupon">
          <ListItem button key="Coupon">
            <ListItemIcon>{<LocalAtmIcon />}</ListItemIcon>
            <ListItemText primary="Coupons" />
          </ListItem>
        </a>
        <a href="/admin/ViewCoupon">
          <ListItem button key="ViewCoupon">
            <ListItemIcon>{<LocalAtmIcon />}</ListItemIcon>
            <ListItemText primary="View Coupon " />
          </ListItem>
        </a> */}
              <a href="/admin/AddCategory">
                <ListItem button key="Add Category">
                  <ListItemIcon>{<CategoryIcon />}</ListItemIcon>
                  <ListItemText primary="Add Category " />
                </ListItem>
              </a>
              <a href="/admin/ViewCategory">
                <ListItem button key="View Category">
                  <ListItemIcon>{<CategoryIcon />}</ListItemIcon>
                  <ListItemText primary="View Category " />
                </ListItem>
              </a>
              <a href="/admin/addStore">
                <ListItem button key="Add Item">
                  <ListItemIcon>{<AddIcon />}</ListItemIcon>
                  <ListItemText primary="Add Store" />
                </ListItem>
              </a>
              <a href="/admin/viewStore">
                <ListItem button key="View Store">
                  <ListItemIcon>{<AddIcon />}</ListItemIcon>
                  <ListItemText primary="View Store" />
                </ListItem>
              </a>

            </List>
          </>
          :
          <>
            <List>
              <a href="/store/addProduct">
                <ListItem button key="Add Item">
                  <ListItemIcon>{<AddIcon />}</ListItemIcon>
                  <ListItemText primary="Add Product" />
                </ListItem>
              </a>
              <a href="/store/getProduct">
                <ListItem button key="Get Product">
                  <ListItemIcon>{<ViewListIcon />}</ListItemIcon>
                  <ListItemText primary="Get Product" />
                </ListItem>
              </a>
            </List>
            <List>
              <a href="/store/addUnit">
                <ListItem button key="Add Unit">
                  <ListItemIcon>{<AddIcon />}</ListItemIcon>
                  <ListItemText primary="Add Unit" />
                </ListItem>
              </a>
              <a href="/store/getUnit">
                <ListItem button key="Get Unit">
                  <ListItemIcon>{<ViewListIcon />}</ListItemIcon>
                  <ListItemText primary="Get Unit" />
                </ListItem>
              </a>
              <a href="/store/getOrder">
                <ListItem button key="Get Unit">
                  <ListItemIcon>{<ViewListIcon />}</ListItemIcon>
                  <ListItemText primary="Get Order" />
                </ListItem>
              </a>
            </List>
          </>
      }

      <Divider />
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;


  return (
    <div className={classes.root}>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
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
              keepMounted: true, // Better open performance on mobile.
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
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};
const mapState = state => {
  return {
    logged: state.authReducer.logged,
    token: state.authReducer.token,
    user: state.authReducer.user,
    city: state.authReducer.city,
    logged: state.authReducer.logged,
    type: state.authReducer.user.type,
    // lang: state.globalReducer.lang,
  }
}



export default connect(mapState)(ResponsiveDrawer)
