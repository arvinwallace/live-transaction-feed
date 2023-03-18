import { useEffect, useState } from "react";

const url = process.env.COIN_GECKO

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
      .catch(err => console.log(err))
  },[]);

  // Coin Gecko occasionally returns errors, I may be hitting some limits.
  // so I need to provide a default value so the rest of my app doesn't break.
  return { price: price || 1831.88, error };
};

export default usePrice;