/* eslint-disable prettier/prettier */
import {createContext, useContext} from 'react';
export type GlobalContent = {
  userId: number;
  setUserId: (c: number) => void;
};
export const MyGlobalContext = createContext<GlobalContent>({
  userId: 0, // set a default value
  setUserId: () => {},
});
export const useGlobalContext = () => useContext(MyGlobalContext);
