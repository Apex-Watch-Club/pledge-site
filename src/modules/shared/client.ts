import { createPublicClient, http } from "viem";
import { mainnet, goerli } from "viem/chains";

const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(
    "https://eth-mainnet.g.alchemy.com/v2/htOoeuPRkBpfFb9nNyUdhNioA0hHb-yb",
  ),
});

// const mainnetClient = createPublicClient({
//   chain: mainnet,
//   transport: http(
//     "https://eth-mainnet.g.alchemy.com/v2/htOoeuPRkBpfFb9nNyUdhNioA0hHb-yb",
//   ),
// });

export { publicClient };
