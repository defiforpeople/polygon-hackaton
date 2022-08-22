import { ReactComponent as EthereumLogo } from '../../../assets/logos/ethereum-logo.svg';
import { ReactComponent as PolygonLogo } from '../../../assets/logos/polygon-logo.svg';
// import { ReactComponent as BnbChainLogo } from '../../../assets/logos/bnbchain-logo.svg';
// import { ReactComponent as AvalancheLogo } from '../../../assets/logos/avalanche-logo.svg';
// import { ReactComponent as FantomLogo } from '../../../assets/logos/fantom-logo.svg';
import { ChainName } from '../../../utils/network-manager';

function LogoNetwork(props: { chainName: ChainName }) {
  // if (props.chainName === 'eth') {
  //   return <EthereumLogo width={25} height={25} />;
  // }

  if (props.chainName === 'matic' || props.chainName === 'maticmum') {
    return <PolygonLogo width={25} height={25} />;
  }

  // if (props.chainName === 'bsc') {
  //   return <BnbChainLogo width={25} height={25} />;
  // }

  // if (
  //   props.chainName === 'avalanche' ||
  //   props.chainName === 'avalanche testnet'
  // ) {
  //   return <AvalancheLogo width={25} height={25} />;
  // }

  // if (props.chainName === 'fantom') {
  //   return <FantomLogo width={25} height={25} />;
  // }

  return <EthereumLogo width={25} height={25} />;
}

export default LogoNetwork;
