import React, { Fragment, Component } from 'react';
import StarRatingComponent from 'react-star-rating-component';
import Card from "@material-ui/core/Card";
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from '@material-ui/core/Grid';
import { withStyles } from "@material-ui/core/styles";
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { getItems } from '../actions/itemActions';
import PropTypes from 'prop-types';


const styles = theme => ({
  cardGrid: {
    paddingTop: 8,
    paddingBottom: 8
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  cardMedia: {
    paddingTop: "56.25%" // 16:9
  },
  cardContent: {
    flexGrow: 1
  },
  itemTitle: {
    fontWeight: "bolder"
  },
});


class Home extends Component {
	componentDidMount() {
		this.props.getItems();
	}
	render() {
		const { classes } = this.props;
		const { items } = this.props.item;
		return (
			<Fragment>
				{items.length <= 0 ? 'NO ITEMS YET': items.map((item) => (
					<Container className={classes.cardGrid} maxWidth="md">
	          <Grid container spacing={4}>
		        		<Grid item key={item._id} xs={12} sm={6} md={4}>
		        			<Link underline='none' to={item._id}>
			              <Card className={classes.card}>
			              	<CardActionArea>
				                <CardMedia
				                  className={classes.cardMedia}
				                  image={item.image}
				                  title={item.name}
				                />
												<CardContent className={classes.cardContent}>
													<Typography className={classes.itemTitle} gutterBottom variant="h5" component="h2">
			                      {item.name}
			                    </Typography>
			                    <Typography>
			                      {item.description}.
			                    </Typography ><br />
			                    <StarRatingComponent name="rate1" editing={false} starCount={5} value={item.rating} /> 
			                    <Typography variant="h6">
			                      Rs {item.price}
			                    </Typography>
			                  </CardContent>
			                </CardActionArea>
			              </Card>
			            </Link>  
		            </Grid>    
	          </Grid>
	        </Container>
	      ))}
			</Fragment>
		);
	}
}	

Home.propTypes = {
	getItems: PropTypes.func.isRequired,
	item: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
	item: state.item
});

export default connect(mapStateToProps, {getItems})(withStyles(styles)(Home));