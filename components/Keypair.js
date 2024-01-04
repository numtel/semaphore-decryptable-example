import { genKeypair } from "zk-group-decryptable";

export default function Keypair({keypair, setKeypair}) {
  return (<div>
    <ul>
      <li>Public Key: <textarea value={keypair ? keypair.pubKey.x.toString() + ', ' + keypair.pubKey.y.toString() : ''} onChange={() => {}}></textarea></li>
      <li>Private Key: <textarea value={keypair ? keypair.privKey.toString() : ''} onChange={() => {}}></textarea></li>
    </ul>
    <button type="button" onClick={() => setKeypair(genKeypair())}>Generate new key</button>
  </div>);
}

