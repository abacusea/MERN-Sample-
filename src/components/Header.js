import React, { Fragment } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CreateDialog from './Dialog';
import CssBaseline from "@material-ui/core/CssBaseline";
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  Home: {
  	marginRight: 10
  },
});

const Header = () => {
	const classes = useStyles();
	return (
		<Fragment>
			<CssBaseline />
				<AppBar position="relative">
					<Toolbar>
						<Typography variant="headline" color="inherit" style={{ flex: 1 }}>
							Product Catalog
						</Typography>
						<Button component={ Link } to="/" variant="outlined" className={classes.Home}>
							<HomeIcon />
						</Button>	
						<CreateDialog  />
					</Toolbar>
				</AppBar>
		</Fragment>
	)
}

export default Header
