import React, { Fragment, Component } from 'react';
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from '@material-ui/core/Grid';
import { withStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { getItems, editItem, deleteItem } from '../actions/itemActions';
import PropTypes from 'prop-types';

const styles = theme => ({
  grid1: {
    marginTop: 25,
    overflow: 'hidden',
    height: 500,
  },
  card: {
    height: "100%",
    display: "flex",
    width: "100%",
  },
  cardMedia: {
    paddingTop: "100.25%" // 16:9
  },
  paper: {
    paddingTop: 25,
    paddingLeft: 20,
  },
  tHead: {
    fontSize: "1.5em",
  },
  button: {
    marginLeft: 10
  }
});



class Item extends Component {
	componentDidMount() {
    this.props.getItems();
  }

  onDeleteClick = id => {
    this.props.deleteItem(id);
    window.location('/');
  };

	render() {
		const { classes } = this.props;
		const { items } = this.props.item;
		return (
			<Fragment>
				<div>
					<Container>
		        <Grid className={classes.grid1}>
		          <Card>
		            <CardMedia className={classes.cardMedia}
		              image={items.image}
		            />
		          </Card> 
		        </Grid>
		        <Paper className={classes.paper}>
		          <Table aria-label="simple table">
		            <TableHead className={classes.tHead}>Product Details
		            </TableHead>
		            <TableBody>
		              <Typography>{items.description}</Typography>
		              <TableRow>
		              <TableCell align="center">Product name</TableCell>
		                <TableCell >{items.name}</TableCell>
		            </TableRow>
		            <TableRow>
		              <TableCell align="center">Seller</TableCell>
		                <TableCell >{items.seller}</TableCell>
		            </TableRow>
		            <TableRow>
		              <TableCell align="center">Manufacturer</TableCell>
		                <TableCell >{itemss.manufacturer}</TableCell>
		            </TableRow>
		            <TableRow>
		              <TableCell align="center">Price</TableCell>
		                <TableCell >Rs.{items.price}</TableCell>
		            </TableRow>
		            <TableRow>
		              <TableCell align="center">Discount</TableCell>
		                <TableCell >{items.discount}%</TableCell>
		            </TableRow>
		            <TableRow>
		              <TableCell align="center">Rating</TableCell>
		                <TableCell ><StarRatingComponent name="rate1" editing={false} starCount={5} value={items.rating} /></TableCell>
		            </TableRow>
		            </TableBody>
		          </Table><br />
		          <Button 
		          	variant="contained"
		            color="primary"
                type="submit">Edit
              </Button>
	            <Button 
	            	variant="contained"
	              color="primary"
	              type="submit"
	              className={classes.button}
	              onClick={this.onDeleteClick.bind(this, _id)}>Delete
	            </Button>
		        </Paper>
		      </Container>  
				</div>
			</Fragment>
		)
	}
}

Item.propTypes = {
	getItems: PropTypes.func.isRequired,
	item: PropTypes.object.isRequired
}

const mapStateToProps = (state, ownProps) => {
	const id = ownProps.match.params.item_id: state;
	return {
		item: state.item.find(oneitem => oneitem._id === id )
	}
};

export default connect(
	mapStateToProps, 
	{ getItems, editItem, deleteItem }
)(withStyles(styles)(Item));