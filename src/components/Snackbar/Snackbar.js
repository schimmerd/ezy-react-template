import React from 'react'
import PropTypes from "prop-types";
import { Snackbar } from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';


export default function CustomizedSnackbar (props) {
    const { message, severity, open, duration, handleClose, place } = props;
    return (
        <Snackbar
            onClose={() => handleClose()}
            autoHideDuration={duration}
            anchorOrigin={{
                vertical: place.indexOf("t") === -1 ? "bottom" : "top",
                horizontal:
                place.indexOf("l") !== -1
                    ? "left"
                    : place.indexOf("c") !== -1
                    ? "center"
                    : "right"
            }}
            open={open}
      >
          <MuiAlert elevation={6} variant="filled" onClose={() => handleClose()} severity={severity}>
              {message}
          </MuiAlert>
      </Snackbar>
    )
}

CustomizedSnackbar.propTypes = {
    message: PropTypes.string.isRequired,
    severity: PropTypes.oneOf(["info", "success", "error", "warning"]).isRequired,
    open: PropTypes.bool.isRequired,
    duration: PropTypes.number.isRequired,
    handleClose: PropTypes.func.isRequired,
    place: PropTypes.oneOf(["tl", "tr", "tc", "br", "bl", "bc"]).isRequired
  };