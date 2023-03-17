import { useEffect, useState } from "react";

const url = process.env.NEXT_PUBLIC_COIN_GECKO

const usePrice = () => {
  const [price, setPrice] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setError(data.error)
        setPrice(data.ethereum.usd)
      })
  },[]);

  return { price, error };
};

export default usePrice;