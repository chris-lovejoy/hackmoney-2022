import { ICoreOptions } from 'web3modal';
import { TNetworkInfo, TEthersProvider } from 'eth-hooks/models';
import { StaticJsonRpcProvider } from '@ethersproject/providers';

export const web3ModalConfigKeys = {
  coinbaseKey: 'custom-walletlink',
  localhostKey: 'custom-localhost',
} as const;

let hostname = 'localhost';
if (typeof window !== 'undefined') {
  hostname = window?.location?.hostname ?? 'localhost';
}

export type TNetworkNames = 'localhost' | 'mumbai';

export const NETWORKS: Readonly<Record<TNetworkNames, TNetworkInfo>> = {
  localhost: {
    name: 'localhost',
    color: '#666666',
    chainId: 31337,
    blockExplorer: '',
    url: 'http://' + hostname + ':8545',
  },
  mumbai: {
    name: 'mumbai',
    color: '#92D9FA',
    chainId: 80001,
    price: 1,
    gasPrice: 1100000000,
    url: 'https://rpc-mumbai.maticvigil.com',
    faucet: 'https://faucet.matic.network/',
    blockExplorer: 'https://mumbai-explorer.matic.today/',
  },
};

export const TARGET_NETWORK_INFO = NETWORKS['mumbai'];

export const LOCAL_PROVIDER: TEthersProvider | undefined =
  TARGET_NETWORK_INFO === NETWORKS.localhost
    ? new StaticJsonRpcProvider(NETWORKS.localhost.url)
    : undefined;

export const getWeb3ModalConfig = async (): Promise<Partial<ICoreOptions>> => {
  const providerOptions: Record<string, any> = {};

  // === WALLETCONNECT
  try {
    const WalletConnectProvider = (
      await import('@walletconnect/ethereum-provider')
    ).default;
    const walletConnectEthereum = {
      package: WalletConnectProvider,
      options: {
        bridge: 'https://polygon.bridge.walletconnect.org',
        infuraId: process.env.INFURA_ID,
        rpc: {},
      },
    };
    providerOptions.walletconnect = walletConnectEthereum;
  } catch (e) {
    console.log('Failed to load config for web3 connector WalletConnect: ', e);
  }

  // === LOCALHOST STATIC
  try {
    if (LOCAL_PROVIDER) {
      const { ConnectToStaticJsonRpcProvider } = await import(
        'eth-hooks/context'
      );
      const { StaticJsonRpcProvider } = await import(
        '@ethersproject/providers'
      );
      const localhostStaticConnector = {
        display: {
          logo: 'https://avatars.githubusercontent.com/u/56928858?s=200&v=4',
          name: 'BurnerWallet',
          description: '🔥 Connect to localhost with a burner wallet 🔥',
        },
        package: StaticJsonRpcProvider,
        connector: ConnectToStaticJsonRpcProvider,
        options: {
          chainId: NETWORKS.localhost.chainId,
          rpc: {
            [NETWORKS.localhost.chainId]: NETWORKS.localhost.url,
          },
        },
      };
      providerOptions[web3ModalConfigKeys.localhostKey] =
        localhostStaticConnector;
    }
  } catch (e) {
    console.log('Failed to load config for Localhost Static Connector: ', e);
  }

  return {
    cacheProvider: true,
    theme: 'light',
    providerOptions,
  };
};
