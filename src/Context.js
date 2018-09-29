import createReactContext from 'create-react-context';

const createContext = (name, value) => {
    const ctx = createReactContext(value);

    ctx.Consumer.displayName = `${name}.Consumer`;
    ctx.Provider.displayName = `${name}.Provider`;
    
    return ctx;
}

export default createContext('App');