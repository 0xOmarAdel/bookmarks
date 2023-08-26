import { useCallback, useEffect, useState } from "react";
import {
  doc,
  collection,
  where,
  query,
  limit,
  orderBy,
  getDocs,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";

const useGetFirestoreData = (
  c: string,
  documentId?: string | null,
  whereStatement?: { lhs: string, op: string, rhs: string } | null,
  orderBy_?: string | null,
  orderType?: any,
  limit_?: number | null,
) => {
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const [whereStatementProperty, setWhereStatementProperty] = useState(whereStatement?.lhs)
  const [whereStatementOperator, setWhereStatementOperator] = useState<any>(whereStatement?.op)
  const [whereStatementValue, setWhereStatementValue] = useState(whereStatement?.rhs)

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      if (documentId) {
        const docSnap = await getDoc(doc(db, c, documentId));

        if (docSnap.exists()) {
          setData({ ...docSnap.data(), id: documentId });
          setIsLoading(false);
        } else {
          setError('Document does not exist');
          setIsLoading(false);
        }
      } else {
        const queryCollection = collection(db, c);

        let queryWhere;
        if (whereStatementProperty && whereStatementOperator && whereStatementValue) {
          queryWhere = where(whereStatementProperty, whereStatementOperator, whereStatementValue);
        }

        const queryOrderBy = orderBy_ && orderBy(orderBy_, orderType || "asc");
        const queryLimit = limit_ && limit(limit_);

        const queryConstraints = { queryWhere, queryOrderBy, queryLimit };
        const filteredQueryConstraints = Object.entries(
          queryConstraints
        ).reduce((acc, [key, value]) => {
          if (value !== null && value !== undefined) {
            acc[key] = value;
          }
          return acc;
        }, {} as { [key: string]: any });
        const filteredQueryConstraintsArray: any = Object.values(
          filteredQueryConstraints
        );

        const result:object[] = [];

        const q = filteredQueryConstraintsArray ?
          query(queryCollection, ...filteredQueryConstraintsArray)
        :
          queryCollection

          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            result.push({ ...doc.data(), id: doc.id });
          });

          setData(result);
          setIsLoading(false);
      }
    } catch (error: any) {
      setError(error);
      setIsLoading(false);
    }
  }, [c, documentId, whereStatementProperty, whereStatementOperator, whereStatementValue, orderBy_, orderType, limit_]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    setWhereStatementProperty(whereStatement?.lhs);
    setWhereStatementOperator(whereStatement?.op);
    setWhereStatementValue(whereStatement?.rhs);
  }, [whereStatement]);

  const reFetchData = () => {
    fetchData();
  };

  return { data, isLoading, error, reFetchData };
};

export default useGetFirestoreData;