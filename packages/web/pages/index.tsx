import React from 'react'
import Footer from '../src/partials/Footer'
import Hero from '../src/partials/Hero'

export function getServerSideProps (context) {
  // redirect to app
  context.res.writeHead(301, {
    Location: '/app'
  })
  context.res.end()
  return {
    props: {}
  }
}

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

        <iframe
          width='560'
          height='315'
          src='https://www.youtube.com/embed/w5_91cCWFEQ'
          title='YouTube video player'
          frameBorder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
        ></iframe>
        <p>
          <a
            href='https://medium.com/dragonfly-research/a-visual-explanation-of-frax-bcce72c1730f'
            rel='noreferrer'
            target='_blank'
          >
            visual explanation
          </a>
        </p>
        <p>
          <a href='metamask://0x13adc' rel='noreferrer' target='_blank'>
            Twitter
          </a>
        </p>
        <div>
          <p>Manifesto:</p>
          <div className='text-secondary'>
            <p>
              In a world where attention is short and minds wander from trend to
              trend, few have the imagination necessary and even fewer the
              patience required to build the institutions of tomorrow.
            </p>
            <br />
            <p>
              The preeminent pioneers of all ages whether it be in fields of
              science, exploration, or something else entirely were once
              considered misfits and scoundrels going against the established
              cultural grain, venturing into the unknown with no promise of
              returning. Today, those who were successful in their endeavors
              have their legacies enshrined in our societal zeitgeist. Every
              generation births its cohort of trailblazers who are capable of
              charting the course forward for the rest of us. In the present era
              that we find ourselves in, those at the cutting edge of innovation
              are sharpening its blade in the digital realm.
            </p>
            <br />
            <p>
              The internet has made it possible to proliferate information
              without restraint, enabling people to share ideas and connect with
              others on a global scale. The next step forward in the digital age
              was the capacity to send value trustlessly, and securely in a
              sovereign manner. Enter the Web3-era, and over a decade into its
              development, we see it segmenting into different categories with
              one of the most promising today being DeFi.
            </p>
            <br />
            <p>
              Still in its relative infancy, DeFi has offered a blank slate for
              the builders to lay the foundation for the global economy of
              tomorrow. Marked by 24/7 markets, rapid feedback loops, and
              constant iteration, the breakneck advancement and open-source
              nature of DeFi allows experimentation to happen at a pace never
              seen before in history. Calling it a grind does not do justice in
              describing what builders undergo on a daily basis. The persistent
              pressure to perform and stay ahead of the curve, the endless
              jabber about prices and demands of speculators to “do something”.
            </p>
            <br />
            <p>
              While the clouds of emotion may blur the vision of many in this
              short-circuited attention landscape, few have their objectives
              clear and goals in mind. What protocols will be the pillars of a
              new global economic system a decade from now? What teams and
              communities have the mindshare to innovate but also the grit to
              persevere through the toughest of times? With the information in
              front of us, the answer is blatantly obvious.
            </p>
            <div className='text-center font-blender-pro text-xl font-normal my-8'>
              ALL ROADS LEAD TO FRAX
            </div>
            <p>
              That’s right, we believe that Frax will become the Central Bank of
              DeFi, Web3, and beyond. Frax’s model stood the toughest of tests
              over the past year and has always maintained its $1 peg even as
              the majority of similar algorithmic stablecoins have come up
              short. Through pioneering primitives such as Automated Market
              Operations, Frax is inspiring protocols to create their own AMOs
              such as Maker and their DAI Direct Deposit Module. This won’t be
              the last time as more and more protocols copy Frax’s design and
              mechanics, far from it. Given a long enough time period, all
              stablecoin designs will converge on one. The pavement is already
              being laid and when it's dried, the final destination is clear.
            </p>
            <br />
            <p>
              Like mycelium growing in a forest, Frax has cemented itself as a
              vital component connecting the DeFi landscape. Through creating
              symbiotic relationships with partners, Frax’s strategy of playing
              positive-sum games has created a culture of long-term building
              rather than short-term gain. Because of this Frax is in the best
              position to become Layer 0 of DeFi, a capital efficient liquidity
              layer that is truly an evolutionary leap forward in monetary
              policy.
            </p>
            <br />
            <p>
              We are planting our flag and shining as a beacon of support in
              Frax’s development and expansion as well as empowering more
              protocols that are aligned with our mission.
            </p>
            <div className='mt-10 text-center font-blender-pro text-xl font-normal'>
              <div>IN FRAX WE TRUST,</div>
              <div className='mt-4'>FRAXIMALISTS</div>
            </div>
          </div>
        </div>
      </main>

      {/*  Site footer */}
      <Footer />
    </div>
  )
}

export default Home
