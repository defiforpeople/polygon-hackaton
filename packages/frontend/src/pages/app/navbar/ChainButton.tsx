import { useState } from 'react';

import {
  Button,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';

// import { ReactComponent as EthereumLogo } from '../../../assets/logos/ethereum-logo.svg';
import { ReactComponent as PolygonLogo } from '../../../assets/logos/polygon-logo.svg';
// import { ReactComponent as BnbChainLogo } from '../../../assets/logos/bnbchain-logo.svg';
// import { ReactComponent as AvalancheLogo } from '../../../assets/logos/avalanche-logo.svg';
// import { ReactComponent as FantomLogo } from '../../../assets/logos/fantom-logo.svg';

import LogoNetwork from './LogoNetwork';
import ConnectedNetwork from './ConnectedNetwork';
import { useNetworkManager } from '../../../hooks/use-manager';
import { ChainName, DFPStrategy } from '../../../utils/network-manager';
import { useAdapter } from '../../../hooks/use-adapter';

function ChainButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { manager, network, setNetwork } = useNetworkManager();
  const { strategies } = useAdapter();

  // console.log('network', network);
  // console.log('strategies', strategies);

  const nn: { [key: string]: DFPStrategy[] } = {};
  for (let i = 0; i < strategies.length; i++) {
    const s = strategies[i];

    if (!nn[s.network]) {
      nn[s.network] = [];
    }

    nn[s.network].push(s);
  }

  // console.log('kakakaka');
  // console.log('kakakaka');
  // console.log('kakakaka');
  // console.log('kakakaka', nn);

  const changeNetwork = async (networkName: ChainName) => {
    console.log(`Change network to networkName: ${networkName}`);

    try {
      await manager.switchNetwork(networkName);
      const networks = manager.listNetworks();

      setNetwork(networks[networkName]);

      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const networks = manager.listNetworks();

  return (
    <>
      <Button
        marginRight={5}
        leftIcon={<LogoNetwork chainName={network.chainName} />}
        iconSpacing={3}
        onClick={onOpen}
        variant="solid"
        bg={'gray'}
        size="md"
        borderRadius={70}
        display={['none', 'inherit', 'inherit']}
      >
        <ConnectedNetwork networkName={network.name} />
      </Button>

      <Modal onClose={onClose} isOpen={isOpen} size={'sm'} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select a Blockchain</ModalHeader>
          <ModalCloseButton />

          {/* <Button
            leftIcon={<EthereumLogo width={25} />}
            width={'75%'}
            margin={'auto'}
            marginBottom={3}
            justifyContent="start"
            iconSpacing={5}
            isDisabled={'eth' === network.chainName}
            onClick={() => changeNetwork('eth')}
          >
            {networks['eth'].name}
          </Button>

          <Button
            leftIcon={<EthereumLogo width={25} />}
            width={'75%'}
            margin={'auto'}
            marginBottom={3}
            justifyContent="start"
            iconSpacing={5}
            isDisabled={'rinkeby' === network.chainName}
            onClick={() => changeNetwork('rinkeby')}
          >
            {networks['rinkeby'].name}
          </Button> */}

          <Button
            leftIcon={<PolygonLogo width={25} />}
            width={'75%'}
            margin={'auto'}
            marginBottom={3}
            justifyContent="start"
            iconSpacing={5}
            isDisabled={'matic' === network.chainName}
            onClick={() => changeNetwork('matic')}
          >
            {networks['matic'].name}
          </Button>

          <Button
            leftIcon={<PolygonLogo width={25} />}
            width={'75%'}
            margin={'auto'}
            marginBottom={3}
            justifyContent="start"
            iconSpacing={5}
            isDisabled={'maticmum' === network.chainName}
            onClick={() => changeNetwork('maticmum')}
          >
            {networks['maticmum'].name}
          </Button>

          {/* <Button
            leftIcon={<BnbChainLogo width={25} />}
            width={'75%'}
            margin={'auto'}
            marginBottom={3}
            justifyContent="start"
            iconSpacing={5}
            isDisabled={'bsc' === network.chainName}
            onClick={() => changeNetwork('bsc')}
          >
            {networks['bsc'].name}
          </Button>

          <Button
            leftIcon={<AvalancheLogo width={25} />}
            width={'75%'}
            margin={'auto'}
            marginBottom={3}
            justifyContent="start"
            iconSpacing={5}
            isDisabled={'avalanche' === network.chainName}
            onClick={() => changeNetwork('avalanche')}
          >
            {networks['avalanche'].name}
          </Button> */}

          {/* <Button
            leftIcon={<AvalancheLogo width={25} />}
            width={'75%'}
            margin={'auto'}
            marginBottom={3}
            justifyContent="start"
            iconSpacing={5}
            isDisabled={'avalanche testnet' === network.chainName}
            onClick={() => changeNetwork('avalanche testnet')}
          >
            {networks['avalanche testnet'].name}
          </Button>

          <Button
            leftIcon={<FantomLogo width={25} />}
            width={'75%'}
            margin={'auto'}
            justifyContent="start"
            iconSpacing={5}
            isDisabled={'fantom' === network.chainName}
            onClick={() => changeNetwork('fantom')}
          >
            {networks['fantom'].name}
          </Button> */}

          <ModalFooter>
            <Button onClick={onClose} bg="third" color="white" variant="solid">
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ChainButton;
