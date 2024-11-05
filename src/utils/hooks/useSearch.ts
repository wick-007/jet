import { useLocation, useSearchParams } from "react-router-dom";

const useSearch = () => {
  const location = useLocation();
  const [searchParams, setSearchParam] = useSearchParams();

  const serialize = (key: string, value?: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    setSearchParam(params);
    return params;
  };

  return [searchParams, location.pathname, serialize] as const;
};

export default useSearch;
