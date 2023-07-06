import { Alchemy, Network, Utils } from "alchemy-sdk";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

const Address = () => {
  const param = useParams();
  const [balance, setBalance] = useState();

  useEffect(() => {
    async function getBlockDetails() {
      const balanceInBigNum = await alchemy.core.getBalance(param.address);
      const balance = Utils.formatUnits(balanceInBigNum, "ether");
      setBalance(balance);
    }
    getBlockDetails();
  }, [param]);

  return (
    <main className="App">
      <h1>
        Address <span className="heading">#{param.address}</span>
      </h1>
      <section className="details-section">
        <div className="detail">
          <p>Balance:</p>
          <span>{balance && `${balance} ETH`}</span>
        </div>
      </section>
    </main>
  );
};

export default Address;
