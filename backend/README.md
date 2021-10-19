# Blockchain Project - gm app - Ethereum (Rinkeby) & Polygon (Mumbai)

A simple smart contract to log folks saying gm to each other. Deployed to test networks - rinkeby & mumbai.

Try running some of the following tasks:

```shell
npm ci

npx hardhat run scripts/run.js
npx hardhat run scripts/run.js --network rinkeby
npx hardhat run scripts/run.js --network mumbai
```

npm ci - installs all the package dependencies. Post this, you'd have to register at alchemy.com to get a rinkeby & mumbai API key.

Once, you get the API keys, create a ```shell .env``` file inside the backend folder with the following 3 lines in it. The private key is your private key of your wallet.

```shell
POLYGON_STAGING_ALCHEMY_KEY = 
RINKEBY_STAGING_ALCHEMY_KEY = 
PRIVATE_KEY = 
```

Before uploading your code anywhere, make sure it doesn't have your private key in it. Happy venturing!