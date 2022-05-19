import { web3 } from "./web3";

export const send = async (account, contractAddress, methodCall) => {
  const hashedTxn = await account.signTransaction({
    from: account.address,
    to: contractAddress,
    data: await methodCall.encodeABI(),
    gas: await methodCall.estimateGas({
      from: account.address,
      to: contractAddress,
    }),
  });
  const res = await web3.eth.sendSignedTransaction(
    hashedTxn.rawTransaction || ""
  );
  return res;
};
