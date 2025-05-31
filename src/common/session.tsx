const storeInSession = ({ key, value }: { key: string; value: string }) => {
  return sessionStorage.setItem(key, value);
};

const lookInSession = ({ key }: { key: string }) => {
    return sessionStorage.getItem(key)
};

const removeItemFromSession = ({key}:{key:string}) => {
    sessionStorage.removeItem(key)
}

export{
    storeInSession,
    lookInSession,
    removeItemFromSession
}
