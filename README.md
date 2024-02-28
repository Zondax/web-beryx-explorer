# Beryx Explorer

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

---

![zondax_light](docs/assets/zondax_light.png#gh-light-mode-only)
![zondax_dark](docs/assets/zondax_dark.png#gh-dark-mode-only)

_Please visit our website at [zondax.ch](https://zondax.ch)_

---

Welcome to Beryx, your one-stop data hub for Filecoin. This guide will help you explore Beryx and find cool features and useful tools. Beryx is for everyone - developers, network users, or anyone interested in blockchain. It's packed with developer insights.

To start exploring Beryx, visit the [Beryx Home Page](https://beryx.io/).

## :gear: Features

- **Search**: Find transactions, blocks, tipsets, addresses and smart contracts.
- **Insights**:
  - **Transactions**: Check status, timestamps, block, from, to, value exchanged, method, internal messages, and more. [Example here](https://beryx.io/v1/search/fil/mainnet/txs/bafy2bzaceab3xcn7qkcuj5oyifa6dn3ihke55bdmerphef4r6aorjdhk3uriq).
  - **Blocks**: Examine block creation, miner, timestamp, transactions and more. [Example here](https://beryx.io/v1/search/fil/mainnet/block-cid/bafy2bzaceb2udtsfnbz6viwq3mscy4msh4tcr5lhy7fscweovpsk4ksnl4sgu).
  - **Tipsets**: Explore its blocks, miners, timestamp, status, transactions, and more. [Example here](https://beryx.io/v1/search/fil/mainnet/tipset/2708613).
  - **Addresses**: Find address balance evolution, transactions, actor type, mempool activity, statistics, and more. [Example here](https://beryx.io/v1/search/fil/mainnet/address/f3u54wclxf5osictiuptwyhnu5nmdma6cdum4n7pdmanmflqt25srrtlwxjur5uhly2k476dhfwrierfa6o5pa)
  - **Smart Contracts**: See contract source code, creator, balance, invoke methods, check statistics, transaction and verification status. [Example here](https://beryx.io/v1/search/fil/mainnet/address/f410fg6dyyyr5q7k6tg7kmavzw4uimz3phxxqmfk2mky).
- **Leaderboards**: Discover top performers:
  - **Rich List**: Wealthiest addresses. [Go to page](https://beryx.io/leaderboard).
  - **Top Accounts by Gas Used**: The most active accounts in terms of gas consumption. [Go to page](https://beryx.io/leaderboard).
  - **Top Contracts by Unique Users**: Popular smart contracts among unique users. [Go to page](https://beryx.io/leaderboard).
- **Recent Activity**:
  - **Latest Tipsets**: Most recent tipsets in the network. [Go to page](https://beryx.io/recent_activity?tab=tipsets).
  - **Latest Transactions**: Transactions happening in real-time. [Go to page](https://beryx.io/recent_activity?tab=transactions).
  - **Latest Contract Invokes**: Most recent smart contract invocations. [Go to page](https://beryx.io/recent_activity?tab=contracts).
- **Dashboard**: Visualize the Filecoin network's activity [Go to Dashboard](https://beryx.io/dashboard):
  - **Gas Consumption**: Track the gas used across the network.
  - **Contract Activity**: Monitor the creation and invocation of smart contracts.
- **Tools**:
  - **Address Conversion**: Convert addresses between FIL and ETH formats. [Go to page](https://beryx.io/address_converter).
  - **Contract Verifier**: Upload source code and verify your contract. [Go to page](https://beryx.io/contract_verifier).
  - **RPC Node**: Access our RPC Node. [Go to page](https://beryx.io/rpc).
  - **Smart Contract Interaction**: Directly interact with smart contracts. [Go to page](https://beryx.io/interact).
  - **Faucet**: Get FIL for testing. [Go to page](https://beryx.io/faucet).

## :book: Docs

Please visit our [docs website](https://docs.zondax.ch/beryx-explorer) to find more information about the project.

## 🧑‍💻 Develop

- Install all dependencies `yarn install`
- Initialize your dev environment: `yarn dev:init`
- Get your Beryx API token on our [docs site](https://docs.zondax.ch/beryx-api), and set it on `.env.local` env file.
- Run the website: `yarn dev`

We use turbo for build caching. While you can use `yarn`, try using `turbo` to run all package.json tasks.

Example:

```
turbo lint
turbo build
```

### :rocket: In production

```bash
turbo build
turbo start
```
