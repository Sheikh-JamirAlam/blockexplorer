import { Alchemy, Network } from "alchemy-sdk";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

const Block = () => {
  const param = useParams();
  const [blockDetails, setBlockDetails] = useState([]);
  const [time, setTime] = useState("");

  useEffect(() => {
    async function getBlockDetails() {
      const block = await alchemy.core.getBlock(param.block.substring(0, 2) === "0x" ? param.block : parseInt(param.block));
      setBlockDetails(block);
    }
    getBlockDetails();
  }, [param]);

  useEffect(() => {
    const date = new Date(blockDetails.timestamp * 1000);
    setTime(date.toLocaleString("en-US", { timeZone: "UTC" }));
  }, [blockDetails]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <main className="App">
      <h1>
        Block <span className="heading">#{param.block}</span>
      </h1>
      <section className="details-section">
        <div className="detail">
          <p>Block Height:</p>
          <span>{blockDetails.number}</span>
        </div>
        <div className="detail">
          <p>Timestamp:</p>
          <span>{time !== "Invalid Date" && time}</span>
        </div>
        <div className="detail">
          <p>Transactions:</p>
          <span>{blockDetails.transactions && blockDetails.transactions.length}</span>
        </div>
        <div className="detail">
          <p>Difficulty:</p>
          <span>{blockDetails.difficulty}</span>
        </div>
        <div className="detail">
          <p>Gas Used:</p>
          <span>{blockDetails.gasUsed && parseInt(blockDetails.gasUsed)}</span>
        </div>
        <div className="detail">
          <p>Gas Limit:</p>
          <span>{blockDetails.gasLimit && parseInt(blockDetails.gasLimit)}</span>
        </div>
        <div className="detail">
          <p>Hash:</p>
          <span>{blockDetails.hash}</span>
        </div>
        <div className="detail">
          <p>Parent Hash:</p>
          <span>
            <Link to={{ pathname: `/block/${blockDetails.parentHash}` }}>{blockDetails.parentHash}</Link>
          </span>
        </div>
        <div className="detail">
          <p>Miner:</p>
          <span>{blockDetails.miner}</span>
        </div>
        <div className="detail">
          <p>Nonce:</p>
          <span>{blockDetails.nonce}</span>
        </div>
        <div className="detail">
          <p>Extra Data:</p>
          <span>{blockDetails.extraData}</span>
        </div>
      </section>
    </main>
  );
};

export default Block;
