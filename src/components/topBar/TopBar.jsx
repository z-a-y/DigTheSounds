import React from 'react';
import {
    Radio,
    RadioGroup, FormControlLabel,
    AppBar, Toolbar, withStyles,
    IconButton,
} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';

const useStyles = () => ({
    root: {
        float: 'none',
        maxWidth: '450px',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
});

class TopBar extends React.Component {

    render() {
        const { classes } = this.props;

        return (
            <AppBar position="static">
                <Toolbar dense="true">
                    <RadioGroup row name="gender1" defaultValue="" onChange={this.props.handleChange} className={classes.root}>
                        <FormControlLabel value="short" control={<Radio />} label="Short Term" />
                        <FormControlLabel value="medium" control={<Radio />} label="Medium Term" />
                        <FormControlLabel value="long" control={<Radio />} label="Long Term" />
                    </RadioGroup>
                    {/* <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        // aria-haspopup="true"
                        // onClick={handleMenu}
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton> */}
                </Toolbar>
            </AppBar>
        );
    }
}

export default withStyles(useStyles)(TopBar);