import  React from "react"

import axios from 'axios';
import { Switch, Route, Redirect} from "react-router-dom"
import CookieConsent from "react-cookie-consent"
import { GoogleLogin } from "react-google-login"
import { CssBaseline, AppBar, Toolbar, Button, Link, Container, Grid } from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles"

import Snackbar from "components/Snackbar/Snackbar"

import { sampleRoutes, footers} from "routes"
import auth from "middleware/auth"
import styles from "assets/jss/sample"
import logo from "assets/img/logo"

// Set your client id
const clientId = "$CLIENT_ID"

const useStyles = makeStyles(styles)
const switchRoutes = (
    <Switch>
        {sampleRoutes.map((prop, key) => {
            if (prop.layout === "/sample") {
                return (
                    <Route
                        path={prop.layout + prop.path}
                        component={() => prop.component}
                        key={key}
                    />
                )
            }
            return null
        })}
        {
            footers.map((prop, key) => {
                if (prop.layout === "/sample") {
                    return (
                        <Route 
                            path={prop.layout + prop.path}
                            component={prop.component}
                            key={key}
                        />
                    )
                }
                return null
            })
        } 
        <Redirect from="/sample" to="/sample/home" />
    </Switch>
)

export default function Default() {
    const classes = useStyles()
    const [email, setEmail] = React.useState(auth.isAuthenticated() ? auth.getSession().profile.email : "unknown");
    const [error, setError] = React.useState(false)
    const [timestamp, setTimestamp] = React.useState(null)
    const [message, setMessage] = React.useState("")
    
    React.useEffect(() => {
        // Check if session token is still valid
        const session = auth.getSession()
        if (session) {
            if (session.exp < timestamp) {
                setError(true)
                setMessage("Session expired, please login again")
                auth.logout()
            }
           
        }
    }, [timestamp])

    const handleFailure = (e) => {
        setError(true)
        setMessage("Login failed, try again")
    }

     // google login handler
     const handleSuccess = async (response) => {
        const idToken = response.tokenObj.id_token;
        const access_token = response.tokenObj.access_token
        const error = await afterLogin(idToken, access_token)
        if (error) {
            setError(true)
            setMessage(error)
        }
    }

    const afterLogin = async (id_token, access_token) => {
        axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${id_token}`)
            .then(async user => {
                if (user.status === 200) {
                    setTimestamp(Math.round(new Date() / 1000))
                    setEmail(user.data.email)
                    await auth.setAuthenticated(true, user.data, access_token, id_token, user.data.exp)
                    return null
                } else {
                    return "Error 401: Session expired"
                }
            })
            .catch(error => {
                return error.toString()
            })
    }

    const _handleClose = () => {
        setError(false)
    }

    return (
        <div>
            <CssBaseline />
            <AppBar position="sticky" color="default" elevation={0} className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <span className={classes.toolbarTitle}>
                        <img alt="logo" src={logo} className={classes.logo} />
                    </span>
                    <nav>
                        {sampleRoutes.map((prop, key) => {
                            return (
                                <Link 
                                    variant="button" 
                                    color="textPrimary" 
                                    href={prop.layout + prop.path} 
                                    className={classes.link}
                                    key={key}>
                                {prop.name}
                                </Link>
                            )
                        })}
                    </nav>
                    {auth.isAuthenticated() !== true ?
                        <GoogleLogin
                            className={classes.link}
                            clientId={clientId}
                            buttonText="Login with Google "
                            scope="https://www.googleapis.com/auth/cloud-platform https://www.googleapis.com/auth/cloud-platform.read-only"
                            onSuccess={async res => await handleSuccess(res)}
                            onFailure={res => handleFailure(res)}
                            cookiePolicy={"single_host_origin"}
                            />  :
                            <Button className={classes.link} variant="outlined" color="secondary">
                                {email}
                            </Button>
                        }
                </Toolbar>
            </AppBar>
            <div>
                {switchRoutes}
            </div>
            <Container component="footer" className={classes.footer}>
                <Grid container spacing={2} justify="space-evenly">
                    <Grid item xs={6} sm={'auto'} key="Contact us">
                        <Link color="textPrimary" href="mailto:" gutterBottom>
                            Contact us
                        </Link>
                    </Grid>
                    {footers.map((footer) => (
                        <Grid item xs={6} sm={'auto'} key={footer.name}>
                            <Link color="textPrimary" href={footer.layout + footer.path} gutterBottom>
                                {footer.name}
                            </Link>
                        </Grid>
                    ))}
                </Grid>
                <Snackbar 
                    place="tc" 
                    open={error} 
                    severity="error" 
                    duration={5000} 
                    handleClose={_handleClose} 
                    message={message}
                />
            </Container>
            <CookieConsent
                buttonText="Understand"
            >
                This website uses cookies to enhance the user experience.</CookieConsent>
        </div>
    )
}