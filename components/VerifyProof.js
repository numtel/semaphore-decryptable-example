import React, { useState } from 'react';
import { usePublicClient } from 'wagmi';
import { Identity, Group, generateProof } from "zk-group-decryptable";

import Transaction from "./Transaction";

export default function VerifyProof({contract, idSeed, groupId, keypair}) {
  const [loading, setLoading] = useState(false);
  const [proof, setProof] = useState(null);

  async function genProof() {
    setLoading(true);
    try {
      const identity = new Identity(idSeed);
      // Any real app would need to load all existing identity commitments
      const group = new Group([identity.commitment]);
      // Signal, scope can be any 254 bit integer
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
