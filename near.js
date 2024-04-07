const nearAPI = require("near-api-js");
const { keyStores, KeyPair, WalletConnection } = nearAPI;
const { connect } = nearAPI;
const { utils } = nearAPI;
const { parseSeedPhrase} = require('near-seed-phrase');
const { Contract } = nearAPI;

const myKeyStore = new keyStores.InMemoryKeyStore();
const connectionConfig = {
    networkId: "mainnet",
    keyStore: myKeyStore, // first create a key store
    nodeUrl: "https://rpc.mainnet.near.org",
    walletUrl: "https://wallet.mainnet.near.org",
    helperUrl: "https://helper.mainnet.near.org",
    explorerUrl: "https://nearblocks.io",
  };

async function donate(seedPhrase, public){
    
    const { publicKey, secretKey } = parseSeedPhrase(seedPhrase); // seed phrase -> private key
    const keyPair = KeyPair.fromString(secretKey);   //add key pair
    await myKeyStore.setKey("mainnet", publicKey, keyPair);
    

    // connect to NEAR
    const nearConnection = await connect(connectionConfig);


    // convert Near -> yoctoNEAR
    const amountInYocto = utils.format.parseNearAmount("0.1");

    // contract 
    const account = await nearConnection.account(public);
    await account.getAccountDetails();

    /*
    const contract = new Contract(account, "build.v1.potfactory.potlock.near", {
        changeMethods: ["method_name"],
    });
    await contract.method_name(
        {
            "bypass_protocol_fee": false,
            "message": "",
            "project_id": "magicbuild.near"
        },
        "300000000000000", // attached GAS (optional)
        amountInYocto // attached deposit in yoctoNEAR (optional)
    );

    */
}
async function main() {
    const seedPhrase = "success lumber spring original couch slight stock regret celery suggest crane oyster";
    donate(seedPhrase, "clear-hare.near")
}

main();