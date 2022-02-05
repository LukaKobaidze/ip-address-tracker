import { useEffect, useState } from 'react';

const getAddressType = (address: string): 'ipAddress' | 'domain' => {
  const indexOfDot = address.indexOf('.');
  if (typeof address[indexOfDot + 1] === 'string') {
    return 'domain';
  }
  return 'ipAddress';
};

/**
 *
 * @param address Can be IP Address, Domain or an empty string
 *
 * @returns An object `{ data, isLoading, error }`. `data` is an information based on `address`. If `address` is empty string, then returns an information about current user.
 *
 */
const useFetchAddress = (address: string) => {
  const [data, setData] = useState<unknown>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<{
    code: number;
    message: string;
  }>();

  useEffect(() => {
    const addressType = getAddressType(address);
    setIsLoading(true);
    fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=at_RTk0rwxaK8JXPgBj87O7nTL7ug6ZA&${addressType}=${address}`
    )
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            const parsedText = JSON.parse(text);
            setError({
              code: parsedText.code,
              message: "Couldn't get data",
            });
            throw new Error(text);
          });
        }
        return response.json();
      })
      .then((data: unknown) => {
        setError(undefined);
        setData(data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [address]);

  return { data, isLoading, error };
};

export default useFetchAddress;
