import { createPublicClient, http } from "viem";
import { mainnet, goerli } from "viem/chains";

const publicClient = createPublicClient({
  chain: goerli,
  transport: http(
    "https://eth-goerli.g.alchemy.com/v2/iqutKCtSJcHpdW9WQVc2Zn08iK8yP9wz",
  ),
});

// const mainnetClient = createPublicClient({
//   chain: mainnet,
//   transport: http(
//     "https://eth-mainnet.g.alchemy.com/v2/htOoeuPRkBpfFb9nNyUdhNioA0hHb-yb",
//   ),
// });

export { publicClient };
