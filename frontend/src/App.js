import React from "react";
import {Button, Container, Grid, makeStyles, Paper, Typography} from "@material-ui/core";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";

const useStyles = makeStyles((theme) => ({
    pageContainer: {
        padding: theme.spacing(3)
    },
    grid: {
        paddingBottom: theme.spacing(1)
    },
    imgContainer: {
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
    },
    img: {
        width: "100%",
        height: "100%",
        maxWidth: "400px",
        maxHeight: "300px",
    },
    input: {
        display: "none"
    }
}));

const roundTo2DP = number => {
    return Math.round(number * 100) / 100
}

function App() {
    const classes = useStyles();

    const [selectedFile, setFile] = React.useState(null);
    const [objURL, setObjURL] = React.useState(null);
    const [cat, setCat] = React.useState("")
    const [dog, setDog] = React.useState("")

    const onChangeHandler = event => {
        try {
            if (event.target.files.length > 0) {
                setFile(event.target.files[0]);
                setObjURL(URL.createObjectURL(event.target.files[0]))
            }
        }
        catch (e) {
            console.warn("Handled Error: " + e)
        }
    }

    const onClickHandler = event => {
        const data = new FormData();
        data.append("image", selectedFile)

        fetch(apiUrl + "/submit", {
            method: "post",
            mode: "cors",
            body: data
        })
            .then(res => {
                return res.json()
            })
            .then(json => {
                setCat("Cat: " + roundTo2DP(json.cat * 100) + "%")
                setDog("Dog: " + roundTo2DP(json.dog * 100) + "%")
            })
    }

    return (
        <Container maxWidth="xs" className={classes.pageContainer}>
            <Paper>
                <Grid container direction="column" alignItems="center" spacing={2} className={classes.grid}>
                    <Grid item>
                        <Typography variant="h4">Cats vs Dogs</Typography>
                    </Grid>
                    <Grid item>
                        <div className={classes.imgContainer}>
                            {objURL !== null ? <img src={objURL} className={classes.img}/> : <div/>}
                        </div>
                    </Grid>
                    <Grid item>
                        <Typography variant="body1">{cat}</Typography>
                        <Typography variant="body1">{dog}</Typography>
                    </Grid>
                    <Grid item>
                        <Grid container direction="row" spacing={2}>
                            <Grid item>
                                <input
                                    accept="image/jpeg"
                                    className={classes.input}
                                    id="contained-button-file"
                                    type="file"
                                    onChange={onChangeHandler}
                                />
                                <label htmlFor="contained-button-file">
                                    <Button variant="contained" color="primary" component="span">
                                        Upload
                                    </Button>
                                </label>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" color="primary" onClick={onClickHandler}>
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
}

export default App;
