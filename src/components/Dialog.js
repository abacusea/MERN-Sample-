import React, { Fragment, Component }from 'react';
import AddBoxSharpIcon from '@material-ui/icons/AddBoxSharp';
import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions';

const styles = theme => ({
  FormControl: {
    width: 200
  },
});


class CreateDialog extends Component {
	state = { open: false,
		item: {
			name: null,
			image: null,
			description: null,
			rating: null,
			price: null,
			seller: null,
			manufacturer: null,
			discount: null
		}
	}

	handleToggle = () => this.setState({ open: !this.state.open });

	handleName = event => {
	this.setState({ name: event.target.value });
}

  handleDescription = event => {
	this.setState({ description: event.target.value });
}

  handleRating = event => {
	this.setState({ rating: event.target.value });
}

  handlePrice = event => {
	this.setState({ price: event.target.value });
}

  handleSeller = event => {
	this.setState({ seller: event.target.value });
}

  handleManufacturer = event => {
	this.setState({ manufacturer: event.target.value });
}

  handleDiscount = event => {
	this.setState({ discount: event.target.value });
}

  onChangeImage= event => {
      this.setState({image: URL.createObjectURL(event.target.files[0])});
  }

  handleSubmit = event => {
  	event.preventDefault();

  	const newItem = {
  		name: this.state.name,
  		image: this.state.image,
  		description: this.state.description,
  		rating: this.state.rating,
  		price: this.state.price,
  		seller: this.state.seller,
  		manufacturer: this.state.manufacturer,
  		discount: this.state.discount
  	};

  	this.props.addItem(newItem);

  	this.handleToggle();
  };
	
	render() {
		const { classes } = this.props;
		return (
			<Fragment >
				<Fab color="primary" aria-label="add" onClick={this.handleToggle}>
	     		<AddBoxSharpIcon />
	      </Fab>
	      <Dialog open={this.state.open} onClose={this.handleToggle} >
          <DialogTitle>Create new product</DialogTitle>
          <DialogContent>
          	<div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
	            <form>
	            	<Grid container alignItems="flex-start" marginRight = {2}>
	            		<Grid item xs={6}>
			            	<TextField
						          name="name"
						          onChange={this.handleName}
						          label="Name"
						          className={classes.FormControl}
						          margin="normal"
										/>
									</Grid>
									<Grid item xs={6}>
						        <TextField
					            className={classes.FormControl}
					            name="seller"
					            label="Seller"					            
					            onChange={this.handleSeller}
					            margin="normal"
						        />
						      </Grid>
									<Grid item xs={12}>
										<TextField
			            		fullWidth
			            		multiline
			            		rows={3}
					            name="description"
					            label="Description"
					            onChange={this.handleDescription}
					            margin="normal"
							     	/>
					        </Grid>
					        <Grid item xs={6}>
						        <TextField
						         	className={classes.FormControl}
						    			type="number"
	        						name="rating"
						          label="Rating Out of 10"
						          onChange={this.handleRating}
						          margin="normal"
						        />
					        </Grid>
					        <Grid item xs={6}>
					        	<TextField
					          	className={classes.FormControl}
					          	type="number"
      								InputLabelProps={{
        							shrink: true,
        							}}
        							name="price"
					          	label="Price"
					          	onChange={this.handlePrice}
					          	margin="normal"
					        	/>
					        </Grid>
					        <Grid item xs={6}>
						        <TextField
					            className={classes.FormControl}
					            label="Manufacturer"
					            name="manufacturer"
					            onChange={this.handleManufacturer}
					            margin="normal"
						        />
					       	</Grid>
					       	<Grid item xs={6}>
						        <TextField
					            className={classes.FormControl}
					            label="Discount"
					            name="discount"
					            type="number"
					            onChange={this.handleDiscount}
					            margin="normal"
						      	/>
						      </Grid>
						      <Grid style={{ marginTop: 20 }}>
						      	<input className={classes.FormControl} accept='.jpg, .png, .jpeg' type="file" name="image" onChange= {this.onChangeImage} />
						      </Grid>
						      <Grid item style={{ marginTop: 16, marginLeft: 225 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    onClick={this.handleSubmit}
                    >
                	Create
              	</Button>
            </Grid>						     
						    </Grid>    
	            </form>
	        	</div>
          </DialogContent>
        </Dialog>
			</Fragment>
		);
	}
}

const mapStateToProps = state => ({
	item: state.item
});

export default connect(mapStateToProps, {addItem})(withStyles(styles)(CreateDialog));