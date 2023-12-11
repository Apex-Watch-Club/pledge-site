import { createPublicClient, http } from "viem";
import { mainnet, goerli } from "viem/chains";

const publicClient = createPublicClient({
  chain: goerli,
  transport: http(
    "https://eth-goerli.g.alchemy.com/v2/7CT8yY7l0dwFWv5tqYOedv84f2KlBa2p",
  ),
});

// const mainnetClient = createPublicClient({
//   chain: mainnet,
//   transport: http(
//     "https://eth-mainnet.g.alchemy.com/v2/htOoeuPRkBpfFb9nNyUdhNioA0hHb-yb",
//   ),
// });

export { publicClient };
