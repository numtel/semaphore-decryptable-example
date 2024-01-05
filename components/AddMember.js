import React, { useState } from 'react';
import { useAccount, useWalletClient } from 'wagmi';
import { Identity } from "zk-group-decryptable";

import Transaction from './Transaction';

export default function AddMember({contract, groupId, idSeed, setIdSeed}) {
  const { address: account } = useAccount();
  const walletClient = useWalletClient({ chainId: contract.chain });
  const [loading, setLoading] = useState(false);
  const identity = idSeed ? new Identity(idSeed) : null;

  async function genSeed() {
    setLoading(true);
    try {
      const signature = await walletClient.data.signMessage({
        message: `This signature is the seed for the identity.`,
      });
      setIdSeed(signature);
    } catch(error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  return (<div>
    {!idSeed ?
      <button type="button" disabled={!account || loading} onClick={genSeed}>Sign Identity</button>
      : <Transaction submitText="Add Member" writeArgs={{
        ...contract,
        functionName: 'addMember',
        args: [groupId, identity.commitment],
      }} />}
  </div>);
}

