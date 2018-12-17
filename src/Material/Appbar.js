import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
        textAlign: 'center',
        fontWeight:'bold',
        fontFamily:'Vidaloka',
        fontSize:'1.7em',
        color:'#fde7ee'
    },
    bg:{
        backgroundColor:'#673ab7'
    },
    
};

function ButtonAppBar(props) {

    const { classes } = props;
    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.bg}>
                <Toolbar>
                    <Typography variant="h6" color="inherit" className={classes.grow}>
                        {props.top1}
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}

ButtonAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);