import React from 'react';
import {
    Card,
    CardMedia,
    Typography,
    CardContent,
    CardActionArea,
    Grid, withStyles,
    Fab,
} from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

const useStyles = () => ({
    root: {
        maxWidth: 250,
    },
    fab1: {
        position: "absolute",
        top: 10,
        right: 10
    }
});

class TrackCard extends React.Component {

    playPreview(url) {
        let audioObj = new Audio(url);

        audioObj.addEventListener("canplaythrough", event => {
            /* the audio is now playable; play it if permissions allow */
            audioObj.play();
            setTimeout(function () { audioObj.pause(); }, 7000);
        });
    }

    render() {

        const { classes } = this.props;
        let releaseDate = this.props.item.album.release_date;
        let previewURL = this.props.item.preview_url;
        let releaseYear = "";
        if (releaseDate) {
            releaseYear = releaseDate.substring(0, 4);
        }

        return (
            <Grid
                item
            >
                <Card raised={true} className={classes.root}>
                    <CardActionArea disableTouchRipple>
                        <CardMedia
                            component="img"
                            alt={this.props.item.name}
                            image={this.props.item.album.images[0].url}
                            title={this.props.item.name}
                            key={this.props.item.name}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2" noWrap>
                                {this.props.item.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {this.props.item.artists[0].name}
                            </Typography>
                            <Typography variant="caption" color="textSecondary" component="p" noWrap>
                                {this.props.item.album.name + " (" + releaseYear + ")"}
                            </Typography>
                        </CardContent>
                        <Fab
                            onClick={() => this.playPreview(previewURL)}
                            color="secondary"
                            className={classes.fab1}
                            size="small"
                        >
                            {/* {"Popularity: " + this.props.item.popularity} */}
                            <PlayArrowIcon className={classes.playIcon} />
                        </Fab>
                    </CardActionArea>
                </Card>
            </Grid>
        );
    }
}

export default withStyles(useStyles) (TrackCard);




