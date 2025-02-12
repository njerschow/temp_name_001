import React from 'react'
import Footer from '../src/partials/Footer'
import App from '../src/partials/App'

function Home () {
  return (
    <div className='flex flex-col min-h-screen overflow-hidden'>
      {/*  Site header */}
      {/* <Header /> */}

      {/*  Page content */}
      <main
        className='flex-grow'
        // style={{
        //   background: 'radial-gradient(#0089, transparent);',
        //   marginBottom: '6rem'
        // }}
      >
        {/*  Page sections */}
        <App />
      </main>
      {/*  Site footer */}
      {/* <Footer /> */}
    </div>
  )
}

export default Home
