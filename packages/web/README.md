<!-- # Web3Zapier

Pseudo use-cases:

Build routers that will run towards bridges/from bridges

## Events (triggers)

Received ERC20
Received NFT
Received native token

## Actions

call methods
send money -->


# Cosmos Smart Contract Explorer Proposal
Name: ? (blockhopper, chainhopper, chainex, explorer, cosmexplorer, cosmhopper, )

With tons of new attention directed at the Cosmos ecosystem, we have drafted the following proposal text on launching a Cosmos smart contract explorer. We would like your feedback on what we have so far.

We propose to create a web app where smart contract developers can come explore all the different messages offered by different chains and contracts on those chains. This is a huge gap in the market seeing as how the only way to currently interact with a chain is to use the cli or through building a web app or smart contract. This is tedious and hard to keep track of.

Furthermore, there doesn't exist a good way to integration test a smart contract deployed on a local network, often a developer will need to create mocks on a chain where the dev net does not have the tooling in place to support extensive & complete testing.

We propose to start a Cosmos public good organization focused on improving and expanding the tools available across the Cosmos ecosystem.

For this work we are requesting $XXX to get started with the Phase 1 deliverables.

## Phase 1
* Osmosis chain support
* Cosmos (maybe neutron) chain support
* ?? chain support
* Compile proto library of chain
* Allow for github repo linking to add your smart contract (how to do for private repos?)
* Compile of Instantiate, ExecuteMsg, and QueryMsg types to protos -> to jsonschema for UI
* easy coin/denom picker with prices included in UI 
* UI search bar for arbitrary contract addresses 
* Seed explorer with already-deployed & open source contracts
* send queries to RPC node & display results
* send arbitrary transactions through keplr
* testnet chain support?

## Phase 2
* forking mainnet locally when running integration tests on localnet (maybe merge into wasmd)
* automatic updates for when chains upgrade (update proto defs daily from github)
* 
* Release support for more chains (injective, composable, secret, stargaze)

## Phase 3
* in-browser CosmWasm Repl for easy testing/prototyping
* 


