import { Button, Container, Grid, Typography } from '@material-ui/core'
import { ArrowRightAlt } from '@material-ui/icons'
import CheckIcon from '@material-ui/icons/Check'
import { makeStyles } from '@material-ui/styles'
import { MouseEvent, useEffect } from 'react'
import Tilt from 'react-parallax-tilt'
import Nav from '../components/Nav'
import { Gradient } from '../utils/gradient'
import msgs from 'cosmhop-msgs'
import GenericMessage from '../components/messages/GenericMessage'

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  before: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '7vw',
    transform: 'skew(-86deg)',
    transformOrigin: 'top'
    // zIndex: '-1',
  },
  text: {
    order: 1,
    // @ts-ignore
    [theme.breakpoints.down('sm')]: {
      order: 2
    }
  },
  gradient: {
    order: 2,
    // @ts-ignore
    [theme.breakpoints.down('sm')]: {
      order: 1
    }
  },
  secondaryButton: {
    background: '#0089FF',
    color: '#FFF',
    textTransform: 'none',
    borderRadius: '8px !important',
    boxShadow: 'none !important'
  },
  spacer: {
    paddingTop: 100
  },
  icon: {
    marginRight: 8,
    color: '#0066FF',
    height: 16,
    width: 16
  },
  content: {
    paddingTop: '7rem'
  }
}))

const App = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Nav />
      <Container maxWidth='lg' className={classes.content}>
        <Grid container spacing={3} alignItems='center'>
          {Object.keys(msgs.schema.osmosis.gamm.v1beta1)
            .filter(key => key.includes('Query') && key.includes('Request'))
            .map(key => {
              return (
                <Grid item xs={12} key={key}>
                  <GenericMessage
                    schemaName={key}
                    msgSchema={msgs.schema.osmosis.gamm.v1beta1[key]}
                  />
                </Grid>
              )
            })}
          {/* <Grid item xs={12}>
            <GenericMessage
              schemaName={'MsgSwapExactAmountIn'}
              msgSchema={msgs.schema.osmosis.gamm.v1beta1.MsgSwapExactAmountIn}
            />
          </Grid> */}
          {/* <Grid item xs={12}>
            <pre>{JSON.stringify(msgs, null, 2)}</pre>
          </Grid> */}
        </Grid>
      </Container>
    </div>
  )
}

export default App
