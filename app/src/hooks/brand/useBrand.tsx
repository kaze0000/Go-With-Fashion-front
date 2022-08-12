import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Brand } from "../../type/api/Brand";

// apiの実行部分をカスタムフックに閉じる
export const useBrand = () => {
  const [brands, setBrands] = useState<Array<Brand> | null>(null);

  const fetchBrands = useCallback(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/v1/brands`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setBrands(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return {
    fetchBrands,
    brands,
  };
};
