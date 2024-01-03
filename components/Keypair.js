
export default function Keypair({
  keypair, setKeypair, genKeypair,
}) {
  function genNew() {
    setKeypair(genKeypair());
  }
  return (<div>
    <ul>
      <li>Public Key: <textarea value={keypair ? keypair.pubKey.x.toString() + ', ' + keypair.pubKey.y.toString() : ''}></textarea></li>
      <li>Private Key: <textarea value={keypair ? keypair.privKey.toString() : ''}></textarea></li>
    </ul>
    <button type="button" onClick={genNew}>Generate new key</button>
  </div>);
}

