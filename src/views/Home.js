import React from "react";

import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import styles from "assets/jss/sample";
import Form from "components/Form/Form"
import API from "api/index-api"
import Snackbar from "components/Snackbar/Snackbar"

const useStyles = makeStyles(styles);


export default function Home(props) {
    const classes = useStyles();
    const [state, setState] = React.useState({disabled: !props.authenticated ? true : false})
    const [open, setOpen] = React.useState(false);
    const [severity, setSeverity] = React.useState("info");
    const [message, setMessage] = React.useState("");
    const [loading, setLoading] = React.useState(false)

    React.useEffect(() => {
        if (!props.authenticated) {
            setMessage("Using this form requires login!")
            setSeverity("warning")
            setOpen(true)
        }
    },[props.authenticated])

    const onFormChange = (e) => {
        const { target: { name, value } } = e
        setState({
            ...state, 
            [name]: value
        })
    }

    const validate = (...rest) => {
        if (Object.values(rest).indexOf("") !== -1) {
          return false;
        } else if (Object.values(rest).indexOf(undefined) !== -1) {
          return false;
        } else {
          return true;
        }
      }
    
    const onFormSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        if (!validate(state.sample)) {
            setMessage("Please fill out all required fields");
            setOpen(true);
            setSeverity("error");
            setLoading(false)
            return
        }
        const data = {
            sample_text: state.sample,
            numbers: !state.numbers ? 1 : parseInt(state.numbers)
        }
        console.log(data)
        API.postSamples(data).then(res => {
            setSeverity("success")
            setMessage(res.data)
            setOpen(true)
            setLoading(false)
        }).catch(error => {
            setSeverity("error")
            setMessage(error.response.data)
            setOpen(true)
            setLoading(false)
        })
    }

    const _handleClose = () => {
        setOpen(false)
    }

    return (
        <div>
            <Container maxWidth="sm" component="main" className={classes.heroContent}>
                <h1>
                    Sample Application
                </h1>
                <br/>
                <Form 
                    onFormSubmit={onFormSubmit} 
                    onFormChange={onFormChange}
                    disabled={state.disabled}
                    classes={classes}
                    loading={loading}
                />
            </Container>
            <Snackbar
                place="tc"
                open={open}
                severity={severity}
                message={message}
                duration={10000}
                handleClose={_handleClose}
            />
        </div>
    )

}