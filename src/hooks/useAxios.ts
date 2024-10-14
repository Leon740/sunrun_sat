import { useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';

const BASE_API_URI = 'http://localhost:5001/api';
export const SIGNIN_API_URI = `${BASE_API_URI}/signin`;
export const EMPLOYEE_API_URI = `${BASE_API_URI}/employees`;
export const SATURDAY_API_URI = `${BASE_API_URI}/saturdays`;

type TQuery = 'get' | 'post' | 'put' | 'delete';

interface IAxios<TData> {
  query: TQuery;
  url: string;
  body?: unknown;
  onSuccess?: (data: TData) => void;
}

export function useAxios<TData>({ query, url, body, onSuccess = () => {} }: IAxios<TData>) {
  const [dataSt, setDataSt] = useState<unknown>(null);
  const [isLoadingSt, setIsLoadingSt] = useState<boolean>(false);
  const [statusSt, setStatusSt] = useState<number>(0);
  const [errorSt, setErrorSt] = useState<string>('');

  const triggerRequest = async ({ reqBody }: { reqBody?: unknown } = {}) => {
    setIsLoadingSt(true);

    try {
      const config: AxiosRequestConfig = {};
      let response;

      if (query === 'get' || query === 'delete') {
        response = await axios[query](url, config);
      } else {
        const requestBody = reqBody ? reqBody : body;
        response = await axios[query](url, requestBody, config);
      }

      setDataSt(response.data);
      setStatusSt(response.status);
      onSuccess(response.data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setErrorSt(error.response?.data?.message || 'An error occurred');
        setStatusSt(error?.status || 404);
      } else {
        setErrorSt('An unexpected error occurred');
      }

      console.error(error);
    } finally {
      setIsLoadingSt(false);
    }
  };

  return {
    data: dataSt,
    isLoading: isLoadingSt,
    status: statusSt,
    error: errorSt,
    triggerRequest
  };
}
