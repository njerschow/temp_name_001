import React, { Component, MouseEventHandler, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { AppBar, Button, Grid, Toolbar, Typography } from '@material-ui/core'
import axios from 'axios'
import { Gradient } from '../utils/gradient'
import Image from 'next/image'
import config from '../../config'

const useStyles = makeStyles({
  root: { height: 66 }
})

let gradient2 = null

const AppNav = ({
  signin,
  twitterLoginHandler
}: {
  signin?: boolean
  twitterLoginHandler?: MouseEventHandler<HTMLButtonElement>
}) => {
  const classes = useStyles()

  useEffect(() => {
    try {
      setTimeout(() => {
        gradient2 = new Gradient()
        // @ts-ignore
        gradient2.initGradient('#gradient-canvas-2')
      }, 30)
    } catch {}
  })

  return (
    <AppBar color='transparent' elevation={0} position='static'>
      <Toolbar style={{ width: '100%' }} disableGutters>
        <Grid container alignItems='center' alignContent='center' spacing={0}>
          <Grid item xs={12}>
            <Grid
              container
              component='a'
              href='/'
              spacing={0}
              style={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'nowrap'
              }}
            >
              {/* {hovering ? ( */}
              <canvas
                id='gradient-canvas-2'
                // style={{'--gradient-color-1':'#ef008f','--gradient-color-2':'#6ec3f4', '--gradient-color-3':'#7038ff','--gradient-color-4':'#e2e2e2'}}
                // "--gradient-color-1:#ef008f;--gradient-color-2:#6ec3f4;--gradient-color-3:#7038ff;--gradient-color-4:#e2e2e2;"
                style={{
                  width: '66px',
                  height: '66px',
                  borderRadius: '0 2px 8px 2px',
                  clipPath: 'url(#hex-hw-shapeclip-clipconfig)'
                }}
                data-transition-in
              ></canvas>
              {/* ) : (
                <Image
                  alt='logo'
                  width={50}
                  height={50}
                  src={config.COMPANY_LOGO_URL}
                />
              )} */}
              <Typography
                variant='h6'
                display='inline'
                style={{
                  fontWeight: 100,
                  marginLeft: 14,
                  fontFamily:
                    'Comfortaa, Quicksand, Arial, Helvetica, sans-serif'
                }}
              >
                {config.DISPLAY_COMPANY_NAME}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export default AppNav
