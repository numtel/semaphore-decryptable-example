import React, { useState } from 'react';
import { usePublicClient } from 'wagmi';
import { Identity } from "@semaphore-protocol/identity";
import { Group } from "@semaphore-protocol/group";

import Transaction from "./Transaction";

export default function VerifyProof({
  contract,
  idSeed,
  groupId,
  keypair,
  generateProof,
}) {
  const [loading, setLoading] = useState(false);
  const [proof, setProof] = useState(null);
  const publicClient = usePublicClient({ chainId: contract.chain });

  async function genProof() {
    setLoading(true);
    let fullProof;
    try {
      const merkleRoot = await publicClient.readContract({
        ...contract,
        functionName: 'getMerkleTreeRoot',
        args: [ groupId ],
      });
      const identity = new Identity(idSeed);
      // Any real app would need to load all existing identity commitments
      const group = new Group([identity.commitment]);
      // Signal can be any 254 bit integer
      const signal = 1;
      const scope = 12345;

      setProof(await generateProof(identity, group, signal, scope, keypair.pubKey, 20));
    } catch(error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (<div>
    {!proof ? <button type="button" disabled={loading || !idSeed || !groupId} onClick={() => genProof()}>Generate Proof</button>
      : <Transaction submitText="Submit Proof" writeArgs={{
        ...contract,
        functionName: 'verifyProof',
        args: [
          groupId,
          proof.treeRoot,
          proof.nullifier,
          proof.message,
          proof.scope,
          proof.decryptables,
          proof.proof,
        ],
      }} />}
  </div>);
}
