import React from 'react'
import Footer from '../src/partials/Footer'
import Hero from '../src/partials/Hero'


function Home () {
  return (
    <div className='flex flex-col min-h-screen overflow-hidden'>
      {/*  Site header */}
      {/* <Header /> */}

      {/*  Page content */}
      <main
        className='flex-grow'
        style={{
          background: 'radial-gradient(#0089, transparent);',
          marginBottom: '6rem'
        }}
      >
        {/*  Page sections */}
        <Hero />
      </main>

      {/*  Site footer */}
      <Footer />
    </div>
  )
}

export default Home
