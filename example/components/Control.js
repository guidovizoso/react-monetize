import React, { useState } from 'react';
import { useStatus } from 'react-monetize';

import monetize from '../utils/monetize';

export default function () {
  const { state, events } = useStatus();
  const [amount, setAmount] = useState('');
  const [assetCode, setAssetCode] = useState('');
  const amountHandler = (e) => setAmount(e.target.value);
  const assetCodeHandler = (e) => setAssetCode(e.target.value);
  const monetizeHandler = () => monetize({ amount, assetCode });
  return (
    <React.Fragment>
      <div className="control-container">
        <span>💸</span>
        <h1>react-monetize</h1>
        <div className="controls">
          <input
            type="number"
            value={amount}
            onChange={amountHandler}
            placeholder="Amount"
          />
          <input
            type="text"
            value={assetCode}
            onChange={assetCodeHandler}
            placeholder="Asset code (USD, BTC...)"
          />
          <button onClick={monetizeHandler}>Monetize</button>
        </div>
        <div className="info">
          <p>State: {state}</p>
          <ul>
            {events.map((e) => (
              <li key={e.timeStamp}>
                {`${e.detail.amount} ${e.detail.assetCode}`}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <style jsx>{`
        .control-container {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        span {
          font-size: 2rem;
        }
        h1 {
          margin: 0 0 1rem 0;
        }
        .controls {
          display: flex;
          flex-direction: row;
        }
      `}</style>
    </React.Fragment>
  );
}
