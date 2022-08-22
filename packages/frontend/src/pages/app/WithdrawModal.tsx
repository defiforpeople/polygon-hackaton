import React, { useState } from 'react';

import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Center,
  Divider,
  HStack,
  Input,
  InputGroup,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
} from '@chakra-ui/react';

import { useTranslation } from 'react-i18next';
import '../../i18n';

import { ReactComponent as EthLogo } from '../../assets/logos/eth-logo.svg';
import { ReactComponent as PolygonLogo } from '../../assets/logos/polygon-matic-icon.svg';
import { ReactComponent as AvalancheLogo } from '../../assets/logos/avalanche-logo.svg';
import { ReactComponent as DaiLogo } from '../../assets/logos/dai-logo.svg';
import { ReactComponent as UniswapLogo } from '../../assets/logos/uniswap-logo.svg';
import { ReactComponent as AaveLogo } from '../../assets/logos/aave-logo.svg';

import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';

import { useNetworkManager } from '../../hooks/use-manager';
import { useAdapter } from '../../hooks/use-adapter';
import { ChainName, Deposit } from '../../utils/network-manager';

type Props = {
  isOpen: any;
  onClose: any;
};

function WithdrawModal({ isOpen, onClose }: Props) {
  const { manager, setNetwork } = useNetworkManager();
  const { adapter } = useAdapter();

  const { t } = useTranslation('InvesmentModal');

  const initialStrategy: string = t('selectStrategy');
  const initialToken: string = t('selectToken');
  const initialAmount: number = 0;
  // const initialTokensBalance: Token | NativeToken[] = [];

  const [strategy, setStrategy] = useState(initialStrategy);
  const [text, setText] = useState(initialToken);
  const [amount, setAmount] = useState(initialAmount);
  const [maxAmount, setMaxAmount] = useState(initialAmount);
  const [transactionLoading, setTransactionLoading] = useState(false);
  const [balanceLoading, setBalanceLoading] = useState(false);
  const [deposit, setDeposit] = useState({} as Deposit);
  const [showAlertSuccess, setShowAlertSuccess] = useState(false);
  const [showAlertConfirm, setShowAlertConfirm] = useState(false);
  const [showAlertError, setShowAlertError] = useState(false);
  // const [tokensBalance, setTextsBalance] = useState(initialTokensBalance);

  const [completeWithdraw, setCompleteWithdraw] = useState(false);
  const [txCompletedAave, setTxCompletedAave] = useState(false);

  const networks = manager.listNetworks();

  const handleStrategyChange = async (strategy: string) => {
    setStrategy(strategy);
  };

  const handleTokenChange = async (chainName: ChainName) => {
    const text = `${networks[chainName].nativeToken.symbol.toUpperCase()} (${
      networks[chainName].name
    })`;

    setText(text);
    setAmount(0);
    setMaxAmount(0);

    setBalanceLoading(true);
    const balanceAave = await adapter.getBalanceAave();

    setMaxAmount(balanceAave);

    setBalanceLoading(false);
  };

  const handleAmountChange = (event: any) => setAmount(event.target.value);

  const handleButtonMax = () => {
    setAmount(Number(maxAmount));
  };

  const resetStrategy = () => {
    setStrategy(initialStrategy);
    setText(initialToken);
    setMaxAmount(initialAmount);
    setShowAlertSuccess(false);
    setShowAlertConfirm(false);
    setShowAlertError(false);
    setTransactionLoading(false);
    setCompleteWithdraw(false);

    onClose();
  };

  const handleContinueButton = async () => {
    setTransactionLoading(true);
    setShowAlertError(false);
    setShowAlertConfirm(false);
    setShowAlertSuccess(false);

    try {
      const withdrawTx = await adapter.withdrawAave(amount);
      setShowAlertConfirm(true);
      const withdrawTxResponse = await withdrawTx.wait();

      console.log('withdrawTx', withdrawTxResponse);

      setTxCompletedAave(withdrawTxResponse.transactionHash);

      setShowAlertConfirm(false);
      setTransactionLoading(false);
      setCompleteWithdraw(true);
    } catch (err) {
      console.error(err);
      setTransactionLoading(false);
      setShowAlertConfirm(false);
      setShowAlertError(true);
      setShowAlertSuccess(false);
    }
  };

  const handleExplorerButton = async () => {
    const address = txCompletedAave;

    if (manager.chainName === 'maticmum') {
      window.open(`https://mumbai.polygonscan.com/tx/${address}`, '_blank');
    } else if (manager.chainName === 'matic') {
      window.open(`https://polygonscan.com/tx/${address}`, '_blank');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        boxShadow="0px 0px 10px rgba(0, 0, 0, 0.25)"
        borderRadius={'15px'}
      >
        <ModalHeader>Withdraw investment</ModalHeader>

        <Center>
          <Divider color={'#E1E1E0'} width={'90%'} />
        </Center>

        <ModalBody margin={'auto'}>
          {/* Menu for strategy */}
          {!completeWithdraw ? (
            <>
              <Text
                fontWeight={700}
                fontSize={'16px'}
                lineHeight={'18.75px'}
                letterSpacing="5%"
                color={'#282828'}
                paddingTop={3}
                paddingBottom={3}
              >
                {t('strategy')}
              </Text>

              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={
                    strategy === initialStrategy ? (
                      <ChevronDownIcon />
                    ) : (
                      <ChevronUpIcon />
                    )
                  }
                  width={'280px'}
                  height={'60px'}
                  boxShadow={'0px 4px 14px rgba(0, 0, 0, 0.1)'}
                  borderRadius={'8px'}
                  justifyContent="space-between"
                >
                  <HStack>
                    <Text
                      fontSize={'16px'}
                      lineHeight={'18.75px'}
                      letterSpacing="5%"
                      color={strategy === initialStrategy ? '#666666' : 'black'}
                      padding={3}
                    >
                      {strategy}
                    </Text>
                  </HStack>
                </MenuButton>
                <MenuList border={'0'} width={'280px'}>
                  <MenuItem
                    onClick={() => handleStrategyChange(t('strategy1'))}
                  >
                    <HStack>
                      <Text
                        fontSize={'16px'}
                        lineHeight={'18.75px'}
                        letterSpacing="5%"
                        color={'black'}
                        padding={3}
                      >
                        {t('strategy1')}
                      </Text>
                      <AaveLogo width={30} height={30} />
                    </HStack>
                  </MenuItem>

                  <MenuItem
                    onClick={() => handleStrategyChange(t('strategy2'))}
                  >
                    <HStack>
                      <Text
                        fontSize={'16px'}
                        lineHeight={'18.75px'}
                        letterSpacing="5%"
                        color={'black'}
                        padding={3}
                      >
                        {t('strategy2')}
                      </Text>
                      <UniswapLogo width={40} height={40} />
                    </HStack>
                  </MenuItem>
                </MenuList>
              </Menu>

              {/* Menu for Aave withdraw */}
              <Box display={strategy === t('strategy1') ? 'block' : 'none'}>
                <Text
                  fontWeight={700}
                  fontSize={'16px'}
                  lineHeight={'18.75px'}
                  letterSpacing="5%"
                  color={'#282828'}
                  paddingTop={8}
                  paddingBottom={3}
                >
                  Token
                </Text>

                <Menu>
                  <MenuButton
                    as={Button}
                    rightIcon={
                      strategy === initialStrategy ? (
                        <ChevronDownIcon />
                      ) : (
                        <ChevronUpIcon />
                      )
                    }
                    width={'280px'}
                    height={'60px'}
                    boxShadow={'0px 4px 14px rgba(0, 0, 0, 0.1)'}
                    borderRadius={'8px'}
                  >
                    <HStack>
                      <Box
                        display={text === 'ETH' ? 'block' : 'none'}
                        marginLeft={2}
                      >
                        <EthLogo width={25} height={25} />
                      </Box>

                      <Box display={text === 'AVAX' ? 'block' : 'none'}>
                        <AvalancheLogo width={25} height={25} />
                      </Box>

                      <Box display={text === 'DAI' ? 'block' : 'none'}>
                        <DaiLogo width={25} height={25} />
                      </Box>

                      <Text
                        fontSize={'16px'}
                        lineHeight={'18.75px'}
                        letterSpacing="5%"
                        color={text === initialToken ? '#666666' : 'black'}
                      >
                        {text}
                      </Text>
                    </HStack>
                  </MenuButton>
                  <MenuList border={'0'} width={'280px'}>
                    <MenuItem onClick={() => handleTokenChange('matic')}>
                      <PolygonLogo width={25} height={25} />

                      <Text
                        fontSize={'16px'}
                        lineHeight={'18.75px'}
                        letterSpacing="5%"
                        color={'black'}
                        padding={3}
                      >
                        {networks['matic'].nativeToken.symbol.toUpperCase()} (
                        {networks['matic'].name})
                      </Text>
                    </MenuItem>
                  </MenuList>
                </Menu>

                <HStack justifyContent={'space-between'}>
                  <Text
                    fontWeight={700}
                    fontSize={'16px'}
                    lineHeight={'18.75px'}
                    letterSpacing="5%"
                    color={'#282828'}
                    paddingTop={8}
                    paddingBottom={3}
                  >
                    {t('amount')}
                  </Text>

                  {!balanceLoading ? (
                    <Text
                      fontSize={'12px'}
                      lineHeight={'14.06px'}
                      color={'grayLetter'}
                      paddingTop={8}
                      paddingBottom={3}
                    >
                      {t('available')}: {maxAmount}
                    </Text>
                  ) : (
                    <Spinner marginTop={25} color="#E33E84" size={'xs'} />
                  )}
                </HStack>

                <InputGroup
                  width={'280px'}
                  height={'60px'}
                  boxShadow={'0px 4px 14px rgba(0, 0, 0, 0.1)'}
                  borderRadius={'8px'}
                >
                  <Input
                    type="number"
                    border={'0'}
                    margin={'auto'}
                    height={'60px'}
                    width={'70%'}
                    focusBorderColor="white"
                    onChange={handleAmountChange}
                    value={amount}
                  />

                  <Button
                    height={'24px'}
                    border="1px"
                    borderColor="primary"
                    borderRadius={'53px'}
                    margin={'auto'}
                    marginRight={'10px'}
                    width={'22%'}
                    onClick={handleButtonMax}
                    disabled={balanceLoading}
                  >
                    <Text
                      fontWeight={400}
                      fontSize={'14px'}
                      lineHeight={'16.8px'}
                      color={'primary'}
                    >
                      Max
                    </Text>
                  </Button>
                </InputGroup>
              </Box>
            </>
          ) : (
            <Alert
              status="success"
              variant="subtle"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              backgroundColor={'white'}
            >
              <AlertIcon boxSize="40px" mr={0} />
              <AlertTitle mt={4} mb={1} fontSize="lg">
                Withdraw submitted
              </AlertTitle>
              <AlertDescription maxWidth="sm">
                The transaction has been sended, it will be reflected in your
                dashboard soon. This may take a few moments to process.
              </AlertDescription>
            </Alert>
          )}
        </ModalBody>

        <ModalFooter flexDirection={'column'} paddingBottom={'25px'}>
          {showAlertError ? (
            <Alert marginBottom={5} status="error">
              <AlertIcon />
              <AlertTitle>The transaction has failed</AlertTitle>
            </Alert>
          ) : null}

          {showAlertConfirm ? (
            <Alert marginBottom={5} status="info">
              <AlertIcon />
              <AlertTitle fontWeight={'light'}>
                The transaction is being processed.
              </AlertTitle>
            </Alert>
          ) : null}

          {!showAlertSuccess && !completeWithdraw ? (
            <Button
              bg="primary"
              borderRadius={'70px'}
              boxShadow={'0px 2px 3px rgba(0, 0, 0, 0.15)'}
              isDisabled={
                !(
                  strategy !== initialStrategy &&
                  text !== initialToken &&
                  amount > 0 &&
                  amount <= Number(maxAmount)
                ) || transactionLoading
              }
              onClick={handleContinueButton}
            >
              {!transactionLoading ? (
                <Text color={'white'}>{t('continue')}</Text>
              ) : (
                <Spinner color="white" size={'xs'} />
              )}
            </Button>
          ) : (
            <Box
              width={'100%'}
              display={'flex'}
              flexDirection={'row'}
              justifyContent={'space-around'}
            >
              <Button
                bg="primary"
                borderRadius={'70px'}
                boxShadow={'0px 2px 3px rgba(0, 0, 0, 0.15)'}
                onClick={resetStrategy}
                width={150}
              >
                <Text color={'white'}>Close</Text>
              </Button>
              <Button
                bg="white"
                borderRadius={'70px'}
                boxShadow={'0px 2px 3px rgba(0, 0, 0, 0.15)'}
                onClick={handleExplorerButton}
                width={150}
              >
                <Text color={'primary'}>View on Explorer</Text>
              </Button>
            </Box>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default WithdrawModal;
