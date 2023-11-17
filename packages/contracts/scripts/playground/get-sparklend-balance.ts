import hre, { viem } from "hardhat";
import { SPARKLEND_POOL_ADDRESS_MAINNET } from "../../utils/constants";
import { getDeploymentAddress } from "../../deployment/deployment-manager";

async function main() {
  const [deployer, alice, bob] = await viem.getWalletClients();

  const network = hre.network.name;
  console.log("Network:", network);

  // Get contracts
  const sparkLendPool = await viem.getContractAt(
    "ISparkLendPool",
    SPARKLEND_POOL_ADDRESS_MAINNET
  );

  const fairdrop = await viem.getContractAt(
    "Fairdrop",
    getDeploymentAddress(network, "Fairdrop")
  );

  const sparkLendStrategy = await viem.getContractAt(
    "SparkLendStrategy",
    getDeploymentAddress(network, "SparkLendStrategy")
  );

  // Get balances
  const accountData = await sparkLendPool.read.getUserAccountData([
    sparkLendStrategy.address,
  ]);

  console.log("Account data: ", accountData);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
