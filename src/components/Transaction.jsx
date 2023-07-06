import { Alchemy, Network, Utils } from "alchemy-sdk";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

const Transaction = () => {
  const param = useParams();
  const [txDetails, setTxDetails] = useState([]);

  useEffect(() => {
    async function getBlockDetails() {
      const tx = await alchemy.transact.getTransaction(param.tx);
      setTxDetails(tx);
    }
    getBlockDetails();
  }, [param]);

  return (
    <main className="App">
      <h1>Transaction Details</h1>
      <section className="details-section">
        <div className="detail">
          <p>Transaction Hash:</p>
          <span>{txDetails.hash}</span>
        </div>
        <div className="detail">
          <p>Block:</p>
          <span>{txDetails.blockNumber}</span>
        </div>
        <div className="detail">
          <p>From:</p>
          <span>
            <Link to={{ pathname: `/address/${txDetails.from}` }}>{txDetails.from}</Link>
          </span>
        </div>
        <div className="detail">
          <p>To:</p>
          <span>
            <Link to={{ pathname: `/address/${txDetails.to}` }}>{txDetails.to}</Link>
          </span>
        </div>
        <div className="detail">
          <p>Value:</p>
          <span>{txDetails.value && `${Utils.formatUnits(txDetails.value, "ether")} ETH`}</span>
        </div>
        <div className="detail">
          <p>Gas Price:</p>
          <span>{txDetails.gasPrice && `${Utils.formatUnits(txDetails.gasPrice, "gwei")} Gwei`}</span>
        </div>
        <div className="detail">
          <p>Gas Limit:</p>
          <span>{txDetails.gasLimit && parseInt(txDetails.gasLimit)}</span>
        </div>
        <div className="detail">
          <p>Txn Type:</p>
          <span>{txDetails.type}</span>
        </div>
        <div className="detail">
          <p>Nonce:</p>
          <span>{txDetails.nonce}</span>
        </div>
        <div className="detail">
          <p>Position in Block:</p>
          <span>{txDetails.transactionIndex}</span>
        </div>
        <div className="detail">
          <p>Input Data:</p>
          <span>{txDetails.data}</span>
        </div>
      </section>
    </main>
  );
};

export default Transaction;
