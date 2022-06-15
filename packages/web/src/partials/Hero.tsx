import { MouseEvent, useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import {
  Grid,
  Typography,
  Container,
  Link,
  Button,
  AppBar,
  Toolbar
} from '@material-ui/core'
import Tilt from 'react-parallax-tilt'
import CheckIcon from '@material-ui/icons/Check'
import config from '../../config'
import { ArrowRightAlt } from '@material-ui/icons'
import { useEffect } from 'react'
import { Gradient } from '../utils/gradient'
import Nav from '../components/Nav'

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

const values = [
  {
    name: 'Personal or brand NFT'
  },
  {
    name: 'Custom ERC-721 metadata'
  },
  {
    name: 'Gasless edits, forever'
  },
  {
    name: 'Ramp into the web3 eco'
  }
]

const Hero = () => {
  const classes = useStyles()

  function handleLogin (e: MouseEvent<any, any>) {
    e.preventDefault()
    window.location.href =
      'https://us-central1-wapfp-25052.cloudfunctions.net/app/auth/twitter'
  }

  useEffect(() => {
    try {
      const gradient = new Gradient()
      // @ts-ignore
      gradient.initGradient('#gradient-canvas') //.init("#gradient-canvas");
    } catch {}
  }, [])

  return (
    <div className={classes.root}>
      <Nav signin twitterLoginHandler={handleLogin} />
      <Container maxWidth='lg' className={classes.content}>
        <Grid container spacing={3} alignItems='center'>
          <Grid item xs={12} sm={6} data-aos='fade-up' className={classes.text}>
            <Typography
              paragraph
              style={{ opacity: 0.85 }}
              variant='h3'
              className={'main-text'}
            >
              Join the hexagons but still be recognizeable
            </Typography>
            <Typography
              style={{ opacity: 0.65 }}
              variant='body1'
              paragraph
              className={'detail-text'}
            >
              Bring your personal or brand identity on-chain, so that you're
              immediately ready for the shift to the metaverse and decentralized
              social.
            </Typography>
            <Typography
              style={{ opacity: 0.65 }}
              variant='body1'
              paragraph
              className={'detail-text'}
            >
              Edit your web3 profile from one place, and have it propogate
              accross the blockchain
            </Typography>
            <div>
              <Grid container spacing={1}>
                {values.map(v => {
                  return (
                    <Grid item xs={12} key={v.name}>
                      <div className='horiz'>
                        <CheckIcon
                          className={classes.icon}
                          style={{ height: 16, width: 16, marginLeft: 8 }}
                        />
                        <Typography
                          variant='body2'
                          className='main-text'
                          style={{ opacity: 0.8, fontWeight: 500 }}
                        >
                          {v.name}
                        </Typography>
                      </div>
                    </Grid>
                  )
                })}
              </Grid>
            </div>
            <Typography
              style={{ opacity: 0.5, marginTop: 16 }}
              variant='body1'
              className={'detail-text'}
            >
              DApps use Candid to notify people about eligible airdrops via
              Twitter.
            </Typography>
            <Button
              variant='contained'
              size='small'
              className={classes.secondaryButton}
              style={{ marginTop: 16 }}
              onClick={handleLogin}
            >
              Sign in with Twitter
            </Button>

            {/* <Typography variant="body2" className="detail-text" style={{ marginTop: 16 }}><Link href="/collections/boredapeyachtclub">See the Bored Ape Graphs<ArrowRightAlt style={{ transform: 'translateY(4px)', height: 18 }} /></Link></Typography> */}
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            className={classes.gradient}
            style={{
              textAlign: 'center',
              display: 'flex',
              justifyContent: 'center'
            }}
            data-aos='fade-up'
          >
            <Tilt
              tiltAngleXInitial={0}
              tiltAngleYInitial={0}
              perspective={500}
              glareEnable={true}
              glareMaxOpacity={0.45}
              gyroscope={true}
              style={{
                position: 'relative',
                width: 450,
                height: 280,
                boxShadow: '0 0 20px rgb( 0 0 0 / 20% )',
                background: 'transparent',
                borderRadius: 24,
                transformStyle: 'preserve-3d'
              }}
            >
              <canvas
                id='gradient-canvas'
                // style={{'--gradient-color-1':'#ef008f','--gradient-color-2':'#6ec3f4', '--gradient-color-3':'#7038ff','--gradient-color-4':'#e2e2e2'}}
                // "--gradient-color-1:#ef008f;--gradient-color-2:#6ec3f4;--gradient-color-3:#7038ff;--gradient-color-4:#e2e2e2;"
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 24
                }}
                data-transition-in
              ></canvas>
              <div
                style={{
                  display: 'flex',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  alignItems: 'center',
                  transform: 'translate3d(-50%,-50%, 30px)'
                }}
              >
                <div
                  style={{
                    background: 'rgba( 255, 255, 255, 0.25 )',
                    boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
                    backdropFilter: 'blur( 4px )',
                    borderRadius: 10000,
                    border: '1px solid rgba( 255, 255, 255, 0.18 )',
                    height: 100,
                    width: 100
                  }}
                ></div>
                <div
                  style={{
                    filter: 'drop-shadow(0 8px 32px rgb( 0, 0, 0 ))'
                  }}
                >
                  <ArrowRightAlt
                    style={{
                      color: 'rgba( 255, 255, 255, 0.55 )',
                      width: 50,
                      height: 'auto',
                      margin: '0px 14px'
                    }}
                  />
                </div>
                <div
                  style={{
                    filter: 'drop-shadow(0 8px 32px rgb( 0, 0, 0 ))'
                  }}
                >
                  <div
                    style={{
                      background: 'rgba( 255, 255, 255, 0.3 )',
                      boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
                      backdropFilter: 'blur( 4px )',
                      borderRadius: 10,
                      border: '1px solid rgba( 255, 255, 255, 0.18 )',
                      height: 100,
                      width: 100,
                      clipPath: 'url(#hex-hw-shapeclip-clipconfig)'
                    }}
                  ></div>
                </div>
              </div>

              {/* <img
                alt='image of application'
                src='/collection-graphs.png'
                style={{
                  width: 380,
                  height: 'auto',
                  borderRadius: 8,
                  boxShadow: '0 0 20px rgb( 0 0 0 / 20% )',
                  padding: 16
                }}
              /> */}
            </Tilt>
          </Grid>
          <Grid item xs={12} style={{order: 3}}>
            <div className='horiz' style={{justifyContent: 'center', padding: 16}}>
              <Typography variant='body1' className='main-text' style={{marginRight: 8}}>
                Made possible by:
              </Typography>
              <svg
                viewBox='0 0 103 35'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                style={{maxWidth: 100}}
              >
                <path
                  fill-rule='evenodd'
                  clip-rule='evenodd'
                  d='M101.442 26.484c.093 0 .138-.067.138-.146v-.127c0-.086-.049-.138-.138-.138h-.356v.411h.356zm-.355.194v.467h-.243v-1.27h.584c.258 0 .404.146.404.404 0 .224-.124.347-.278.388l.281.478h-.269l-.262-.467h-.217zm.136.91a1.077 1.077 0 0 0 1.175-1.174 1.095 1.095 0 0 0-.984-.983 1.078 1.078 0 0 0-1.176 1.175c.042.51.473.94.985.983zm-.165-2.379a1.327 1.327 0 1 1 0 0zM50.89 19.796l-.198.06a8.094 8.094 0 0 1-4.676-.013l-.198-.062 2.364-7.722c.058-.188.325-.187.381 0l2.328 7.737zM45.48 8.649l-6.544 19.186h4.416l1.429-4.664.2.06c2.17.666 4.56.672 6.73.017l.2-.06 1.4 4.647h4.408l-6.51-19.182a2.986 2.986 0 0 0-2.829-2.025h-.074a2.986 2.986 0 0 0-2.826 2.021zM90.905 11.926H86.22l-4.574 6.146V6.628h-3.953v21.208h3.953v-7.633l5.349 7.633h4.407l-5.847-8.242a.795.795 0 0 1 .025-.954l5.325-6.714zM70.176 11.925H63.826a3.543 3.543 0 0 0-3.546 3.54v12.37h3.954v-11.46a.91.91 0 0 1 .91-.91h4.122a.91.91 0 0 1 .91.91v11.46h3.953v-12.37a3.543 3.543 0 0 0-3.545-3.54h-.408zM102.647 11.925h-5.378a3.543 3.543 0 0 0-3.546 3.54v12.37h3.953v-11.46a.91.91 0 0 1 .91-.91h4.061v-3.54zM18.13.884l11.104 5.69a4.798 4.798 0 0 1 2.622 4.286v2.594H27.76V10.86a.726.726 0 0 0-.397-.648l-11.103-5.69a.732.732 0 0 0-.666 0l-11.104 5.69a.726.726 0 0 0-.396.648v2.594H0V10.86a4.798 4.798 0 0 1 2.621-4.286L13.726.884a4.836 4.836 0 0 1 4.404 0zm1.301 16.244c0-1.93-1.572-3.5-3.504-3.5a3.506 3.506 0 0 0-3.505 3.5c0 1.93 1.572 3.5 3.505 3.5a3.507 3.507 0 0 0 3.504-3.5zm7.934 7.262a.725.725 0 0 0 .396-.648v-2.594h4.095v2.595a4.798 4.798 0 0 1-2.62 4.285l-11.106 5.69a4.854 4.854 0 0 1-2.202.53 4.855 4.855 0 0 1-2.202-.53L2.62 28.028a4.797 4.797 0 0 1-2.62-4.285v-2.595h4.094v2.595c0 .274.152.522.396.647l9.39 4.811v-4.767c-3.199-.894-5.553-3.83-5.553-7.306 0-4.185 3.41-7.59 7.6-7.59 4.19 0 7.6 3.405 7.6 7.59 0 3.476-2.354 6.412-5.553 7.306v4.768l9.39-4.812z'
                  fill='currentColor'
                ></path>
              </svg>
            </div>
          </Grid>
        </Grid>
      </Container>
      <div style={{ width: 0, height: 0 }}>
        <svg height='0' viewBox='0 0 200 188' width='0' >
          <defs>
            <clipPath
              clipPathUnits='objectBoundingBox'
              id='hex-hw-shapeclip-clipconfig'
              transform='scale(0.005 0.005319148936170213)'
            >
              <path d='M193.248 69.51C185.95 54.1634 177.44 39.4234 167.798 25.43L164.688 20.96C160.859 15.4049 155.841 10.7724 149.998 7.3994C144.155 4.02636 137.633 1.99743 130.908 1.46004L125.448 1.02004C108.508 -0.340012 91.4873 -0.340012 74.5479 1.02004L69.0879 1.46004C62.3625 1.99743 55.8413 4.02636 49.9981 7.3994C44.155 10.7724 39.1367 15.4049 35.3079 20.96L32.1979 25.47C22.5561 39.4634 14.0458 54.2034 6.74789 69.55L4.39789 74.49C1.50233 80.5829 0 87.2441 0 93.99C0 100.736 1.50233 107.397 4.39789 113.49L6.74789 118.43C14.0458 133.777 22.5561 148.517 32.1979 162.51L35.3079 167.02C39.1367 172.575 44.155 177.208 49.9981 180.581C55.8413 183.954 62.3625 185.983 69.0879 186.52L74.5479 186.96C91.4873 188.32 108.508 188.32 125.448 186.96L130.908 186.52C137.638 185.976 144.163 183.938 150.006 180.554C155.85 177.17 160.865 172.526 164.688 166.96L167.798 162.45C177.44 148.457 185.95 133.717 193.248 118.37L195.598 113.43C198.493 107.337 199.996 100.676 199.996 93.93C199.996 87.1841 198.493 80.5229 195.598 74.43L193.248 69.51Z'></path>
            </clipPath>
          </defs>
        </svg>
      </div>
    </div>
  )
}

export default Hero
