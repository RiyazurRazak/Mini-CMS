import React from 'react'

//ui
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'

function Loader({isLoad}) {
    return (
        <div>
            <Backdrop className="loader" open={isLoad}>
             <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    )
}

export default Loader
