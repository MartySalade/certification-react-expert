import { useEffect, useState } from "react";
import { GenericWithId } from "../types/genericWithId";

/**
 * This hook fetches data from the https://jsonplaceholder.typicode.com api.
 * We use here a GenericWithId type to avoid typescript errors while modifying the id of each object into a string
 * instead of a number.
 *
 * @param route route to fetch
 * @returns {GenericWithId<T>[] | undefined} the data fetched
 */
export function useGetData<T>(route: string) {
  const [data, setData] = useState<GenericWithId<T>[]>();

  useEffect(() => {
    async function asyncGetComments() {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/${route}`
      );
      const result = await response.json();
      const resultWithStringIds = result.map((item: GenericWithId<T>) => ({
        ...item,
        id: item.id.toString(),
      }));
      setData(resultWithStringIds);
    }
    asyncGetComments();
  }, [route]);

  return data;
}
