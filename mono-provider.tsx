import React from 'react';
import MonoConnect from './mono-connect';
import { MonoProviderProps } from './types';

export interface MonoContextType {
  init: () => void
  reauthorise: (reauth_code: string) => void;
  scope?: string;
}

export const MonoContext = React.createContext<MonoContextType>({
  init: () => null,
  reauthorise: () => null,
})

function MonoProvider(props: MonoProviderProps) {
  const [openWidget, setOpenWidget] = React.useState<boolean>(false);
  const [reauthToken, setReauthToken] = React.useState<any>(null);

  function init() {
    setReauthToken(null);
    setOpenWidget(true);
  }

  function reauthorise(reauth_token: string) {
    setReauthToken(reauth_token);
    setOpenWidget(true);
  }

  return (
    <MonoContext.Provider value={{init, reauthorise, scope: props?.scope}}>
      <MonoConnect {...{
        openWidget, 
        setOpenWidget,
        reauth_token: reauthToken,
        ...props
      }} />
        {props.children}
    </MonoContext.Provider>
  )
}

export default MonoProvider