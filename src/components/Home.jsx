import { Alchemy, Network } from "alchemy-sdk";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

const Home = () => {
  const history = useHistory();
  const [blockNumbers, setBlockNumbers] = useState([]);
  const [latestTransactions, setLatestTransactions] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    async function getBlockNumber() {
      const latestBlockNumber = await alchemy.core.getBlockNumber();
      for (let i = 0; i < 5; i++) {
        const blockNumber = latestBlockNumber - i;
        const block = await alchemy.core.getBlock(blockNumber);
        setBlockNumbers((prev) => [...prev, block.number]);
      }
    }
    async function getTransactions() {
      const latestBlockNumber = await alchemy.core.getBlockNumber();
      const block = await alchemy.core.getBlock(latestBlockNumber);
      setLatestTransactions(block.transactions.slice(-5).reverse());
    }
    getBlockNumber();
    getTransactions();
  }, []);

  const getComponent = async (search) => {
    if (search.substring(0, 2) !== "0x") {
      if (!isNaN(parseInt(search))) {
        history.push(`/block/${search}`);
      } else {
        console.log("Not found.");
      }
    } else {
      try {
        const balance = await alchemy.core.getBalance(search);
        if (balance !== null) {
          history.push(`/address/${search}`);
          return;
        }
      } catch (error) {
        console.log("Not a address.");
      }
      try {
        const block = await alchemy.core.getBlock(search);
        if (block !== null) {
          history.push(`/block/${search}`);
          return;
        }
      } catch (error) {
        console.log("Not a block.");
      }
      try {
        const txn = await alchemy.transact.getTransaction(search);
        if (txn !== null) {
          history.push(`/tx/${search}`);
          return;
        }
      } catch (error) {
        console.log("Not a Txn.");
      }
    }
  };

  return (
    <main className="Home-App">
      <section className="section search-section">
        <input className="search-input" name="search" type="text" value={searchText} placeholder="Search by Address / Txn Hash / Block " onChange={(e) => setSearchText(e.target.value)} />
        <button
          className="search-btn"
          type="button"
          onClick={(e) => {
            e.preventDefault();
            getComponent(searchText);
          }}
        >
          Search
        </button>
      </section>
      <section className="section">
        <div className="heading-div" style={{ borderBottom: blockNumbers.length === 0 && "none" }}>
          <p className="heading">Latest Blocks:</p>
        </div>
        {blockNumbers &&
          blockNumbers.map((blockNumber, index) => (
            <p key={index}>
              {`Block Number ${index + 1}: `}
              <Link to={{ pathname: `/block/${blockNumber}` }}>{`${blockNumber}`}</Link>
            </p>
          ))}
      </section>
      <section className="section">
        <div className="heading-div" style={{ borderBottom: blockNumbers.length === 0 && "none" }}>
          <p className="heading">Latest Transactions:</p>
        </div>
        {latestTransactions &&
          latestTransactions.map((transaction, index) => (
            <p key={index}>
              {`Transaction ${index + 1}: `}
              <Link to={{ pathname: `/tx/${transaction}` }}>{`${transaction.substring(0, 25)}...`}</Link>
            </p>
          ))}
      </section>
    </main>
  );
};

export default Home;
