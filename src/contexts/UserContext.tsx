import { createContext, FC, useState } from 'react';

const emptyFunc = () => {};

type UserContextState = {
  isWalletConnectOpened: boolean;
  isTransactionModalOpened: boolean;
  currencyAmount: string;
  setIsWalletConnectOpened: (value: boolean) => void;
  setIsTransactionModalOpened: (value: boolean) => void;
  setCurrencyAmount: (value: string) => void;
};

export const UserContext = createContext<UserContextState>({
  currencyAmount: '',
  isTransactionModalOpened: false,
  isWalletConnectOpened: false,
  setCurrencyAmount: emptyFunc,
  setIsTransactionModalOpened: emptyFunc,
  setIsWalletConnectOpened: emptyFunc,
});

export const UserContextProvider: FC = ({ children }) => {
  const [isWalletConnectOpened, setIsWalletConnectOpened] = useState(false);
  const [isTransactionModalOpened, setIsTransactionModalOpened] =
    useState(false);
  const [currencyAmount, setCurrencyAmount] = useState<string>('');

  return (
    <UserContext.Provider
      value={{
        currencyAmount,
        isTransactionModalOpened,
        isWalletConnectOpened,
        setCurrencyAmount,
        setIsTransactionModalOpened,
        setIsWalletConnectOpened,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
