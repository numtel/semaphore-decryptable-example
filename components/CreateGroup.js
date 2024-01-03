import { useAccount } from 'wagmi';

import Transaction from './Transaction';

const ONE_HOUR = 60 * 60;

export default function CreateGroup({
  contract,
  groupId,
  setGroupId,
}) {
  const { address: account } = useAccount();

  return (<div>
    <label>
      <span>Group ID:</span>
      <input type="number" value={groupId} onChange={(e) => setGroupId(e.target.value)} />
      <Transaction submitText="Create Group" writeArgs={{
        ...contract,
        functionName: 'createGroup',
        args: [ groupId, account, ONE_HOUR ]
      }} />
    </label>
  </div>);
}
