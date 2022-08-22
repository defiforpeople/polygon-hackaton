import { useState } from 'react';

import {
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
  Text,
  VStack,
} from '@chakra-ui/react';

import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';

import { ReactComponent as EthLogo } from '../../assets/logos/eth-logo.svg';
import { ReactComponent as PolygonLogo } from '../../assets/logos/polygon-matic-icon.svg';
import { ReactComponent as AvalancheLogo } from '../../assets/logos/avalanche-logo.svg';
import { ReactComponent as DaiLogo } from '../../assets/logos/dai-logo.svg';
import { ReactComponent as UniswapLogo } from '../../assets/logos/uniswap-logo.svg';
import { ReactComponent as AaveLogo } from '../../assets/logos/aave-logo.svg';

import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';

import { useTranslation } from 'react-i18next';
import '../../i18n';

import { useAdapter } from '../../hooks/use-adapter';
import { ChainName, TokenSymbol } from '../../utils/network-manager';
import { useNetworkManager } from '../../hooks/use-manager';

import { Spinner } from '@chakra-ui/react';

type Props = {
  isOpen: any;
  onClose: any;
};

function InvesmentModal({ isOpen, onClose }: Props) {
  const { manager, setNetwork } = useNetworkManager();
  const { adapter, strategies } = useAdapter();

  const { t } = useTranslation('InvesmentModal');

  const initialStrategy: string = t('selectStrategy');
  const initialToken: string = t('selectToken');
  const initialAmount: number = 0;
  // const initialTokensBalance: Token | NativeToken[] = [];

  const [strategy, setStrategy] = useState(initialStrategy);
  const [symbol, setSymbol] = useState('weth' as TokenSymbol);
  const [text, setText] = useState(initialToken);
  const [amount, setAmount] = useState(initialAmount);
  const [maxAmount, setMaxAmount] = useState(initialAmount);
  const [transactionLoading, setTransactionLoading] = useState(false);
  const [balanceLoading, setBalanceLoading] = useState(false);
  const [showAlertSuccess, setShowAlertSuccess] = useState(false);
  const [showAlertConfirm, setShowAlertConfirm] = useState(false);
  const [showAlertError, setShowAlertError] = useState(false);

  // Aave
  const [approvedAave, setApprovedAave] = useState(false);
  const [depositAave, setDepositAave] = useState(false);
  const [txCompletedAave, setTxCompletedAave] = useState('');

  // Uniswap
  const [token2, setToken2] = useState(initialToken);
  const [amount2, setAmount2] = useState(initialAmount);
  const [maxAmount2, setMaxAmount2] = useState(initialAmount);
  const [firstApproveComplete, setFirstApproveComplete] = useState(false);
  const [secondApproveComplete, setSecondApproveComplete] = useState(false);

  // const [approvedUniswap, setApprovedUniswap] = useState(false);
  // const [depositUniswap, setDepositUniswap] = useState(false);

  // complete strategy
  const [completeStrategy, setCompleteStrategy] = useState(false);

  const networks = manager.listNetworks();

  const handleStrategyChange = async (strategy: string) => {
    setStrategy(strategy);
  };

  const handleTokenChange = async (
    chainName: ChainName,
    symbol: TokenSymbol,
  ) => {
    const text = `${symbol.toUpperCase()} (${networks[chainName].name})`;

    setText(text);
    setAmount(0);
    setMaxAmount(0);
    setSymbol(symbol);

    setBalanceLoading(true);
    const nativeToken = await adapter.getNativeToken();
    if (!nativeToken || Number(nativeToken.balance) === 0) {
      setMaxAmount(0);
      setBalanceLoading(false);
      return;
    }

    const tokens = await adapter.getTokens();

    const WETH = tokens.find((token) => token.symbol === 'WETH');

    const amount2 = (Number(WETH!.balance!) / 1e18).toFixed(12);
    setMaxAmount2(Number(amount2));

    if (symbol === 'matic') {
      setToken2('ETH');
    }

    setBalanceLoading(false);
    const amount = (Number(nativeToken.balance!) / 1e18).toFixed(12);
    setMaxAmount(Number(amount));
  };

  const handleAmountChange = (event: any) => setAmount(event.target.value);

  const handleAmountChange2 = (event: any) => setAmount2(event.target.value);

  const handleButtonMax = () => {
    if (maxAmount >= maxAmount2) {
      setAmount(maxAmount2);
      setAmount2(maxAmount2);
    } else {
      setAmount(maxAmount);
      setAmount2(maxAmount);
    }
  };

  const handleButtonMax2 = () => {
    if (maxAmount >= maxAmount2) {
      setAmount(maxAmount2);
      setAmount2(maxAmount2);
    } else {
      setAmount(maxAmount);
      setAmount2(maxAmount);
    }
  };

  const resetStrategy = () => {
    setStrategy(initialStrategy);
    setText(initialToken);
    setMaxAmount(initialAmount);
    setShowAlertSuccess(false);
    setShowAlertConfirm(false);
    setShowAlertError(false);
    setTransactionLoading(false);
    setCompleteStrategy(false);

    onClose();
  };

  const handleContinueButton = async () => {
    console.log('Starting approve  ...');

    setTransactionLoading(true);
    setShowAlertError(false);
    setShowAlertConfirm(false);
    setShowAlertSuccess(false);

    if (strategy === t('strategy1')) {
      try {
        const approveDeposit = await adapter.approveDepositAave(amount, symbol);
        setShowAlertConfirm(true);
        const approveTx = await approveDeposit.wait();

        console.log('approvedTx', approveTx);

        setShowAlertConfirm(false);
        setTransactionLoading(false);
        setApprovedAave(true);
      } catch (err) {
        console.error(err);
        setTransactionLoading(false);
        setShowAlertConfirm(false);
        setShowAlertError(true);
        setShowAlertSuccess(false);
      }
    } else if (strategy === t('strategy2')) {
      try {
        const approveDeposit = await adapter.approveDepositUniswap(
          amount,
          symbol,
        );
        setShowAlertConfirm(true);
        const approveTx = await approveDeposit.wait();

        console.log('approvedTx', approveTx);

        setShowAlertConfirm(false);
        setTransactionLoading(false);
        setFirstApproveComplete(true);
      } catch (err) {
        console.error(err);
        setTransactionLoading(false);
        setShowAlertConfirm(false);
        setShowAlertError(true);
        setShowAlertSuccess(false);
      }
    }
  };

  const handleApprove2 = async () => {
    console.log('Starting second approve  ...');

    setTransactionLoading(true);
    setShowAlertError(false);
    setShowAlertConfirm(false);
    setShowAlertSuccess(false);
    setFirstApproveComplete(false);

    try {
      const approveDeposit = await adapter.approveDepositUniswap(
        amount2,
        'eth',
      );
      setShowAlertConfirm(true);
      const approveTx = await approveDeposit.wait();

      console.log('approvedTx', approveTx);

      setShowAlertConfirm(false);
      setTransactionLoading(false);
      setSecondApproveComplete(true);
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

  const handleDepositAave = async () => {
    console.log('Starting deposit ...');

    try {
      const depositAave = await adapter.depositAave(amount, symbol);
      setApprovedAave(false);

      setShowAlertConfirm(true);
      setTransactionLoading(true);

      const depositTx = await depositAave.wait();

      setTxCompletedAave(depositTx.transactionHash);
      setShowAlertConfirm(false);
      setTransactionLoading(false);
      setDepositAave(true);
      setCompleteStrategy(true);
    } catch (err) {
      console.error(err);
      setTransactionLoading(false);
      setShowAlertConfirm(false);
      setShowAlertError(true);
      setShowAlertSuccess(false);
    }
  };

  const handleMintPosition = async () => {
    console.log('Starting mint position ...');

    try {
      const mintPosition = await adapter.mintNewPosition(amount, amount2);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={resetStrategy} isCentered>
      <ModalOverlay />
      <ModalContent
        boxShadow="0px 0px 10px rgba(0, 0, 0, 0.25)"
        borderRadius={'15px'}
      >
        <ModalHeader>{t('title')}</ModalHeader>

        <Center>
          <Divider color={'#E1E1E0'} width={'90%'} />
        </Center>

        <ModalBody margin={'auto'} alignItems="center">
          {/* Menu for strategy */}
          {!completeStrategy ? (
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

              {/* Aave protocol */}
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
                  Lending in Aave Protocol
                </Text>

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
                    <MenuItem
                      onClick={() => handleTokenChange('matic', 'matic')}
                    >
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

              {/* Uniswap protocol */}
              <Box display={strategy === t('strategy2') ? 'block' : 'none'}>
                <Text
                  fontWeight={700}
                  fontSize={'16px'}
                  lineHeight={'18.75px'}
                  letterSpacing="5%"
                  color={'#282828'}
                  paddingTop={8}
                  paddingBottom={3}
                >
                  Token 1
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
                        display={text === 'MATIC (Polygon)' ? 'block' : 'none'}
                      >
                        <PolygonLogo width={25} height={25} />
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
                    <MenuItem
                      onClick={() => handleTokenChange('matic', 'matic')}
                    >
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

                <Text
                  fontWeight={700}
                  fontSize={'16px'}
                  lineHeight={'18.75px'}
                  letterSpacing="5%"
                  color={'#282828'}
                  paddingTop={8}
                  paddingBottom={3}
                >
                  Token 2
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
                        display={text === 'MATIC (Polygon)' ? 'block' : 'none'}
                      >
                        <EthLogo width={25} height={25} />
                      </Box>

                      <Text
                        fontSize={'16px'}
                        lineHeight={'18.75px'}
                        letterSpacing="5%"
                        color={text === initialToken ? '#666666' : 'black'}
                      >
                        {token2}
                      </Text>
                    </HStack>
                  </MenuButton>
                  <MenuList border={'0'} width={'280px'}>
                    <MenuItem
                    // onClick={() => handleToken2Change('matic', 'matic')}
                    >
                      <EthLogo width={25} height={25} />

                      <Text
                        fontSize={'16px'}
                        lineHeight={'18.75px'}
                        letterSpacing="5%"
                        color={'black'}
                        padding={3}
                      >
                        ETH
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
                    Amount token 1
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
                    Amount token 2
                  </Text>

                  {!balanceLoading ? (
                    <Text
                      fontSize={'12px'}
                      lineHeight={'14.06px'}
                      color={'grayLetter'}
                      paddingTop={8}
                      paddingBottom={3}
                    >
                      {t('available')}: {maxAmount2}
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
                    onChange={handleAmountChange2}
                    value={amount2}
                  />

                  <Button
                    height={'24px'}
                    border="1px"
                    borderColor="primary"
                    borderRadius={'53px'}
                    margin={'auto'}
                    marginRight={'10px'}
                    width={'22%'}
                    onClick={handleButtonMax2}
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
                Investment submitted
              </AlertTitle>
              <AlertDescription maxWidth="sm">
                The transaction has been sended. Your deposit {amount}
                Protocol, it will be reflected in your dashboard soon. This may
                take a few moments to process.
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

          {approvedAave && !transactionLoading ? (
            <VStack>
              <Alert marginBottom={5} status="success" borderRadius={15}>
                <AlertIcon />
                <AlertTitle fontWeight={'light'}>
                  You have approved our contract to lend your tokens to the Aave
                  protocol. Now finish the process by approving the lending.
                </AlertTitle>
              </Alert>

              <Button
                bg="fourth"
                borderRadius={'70px'}
                boxShadow={'0px 2px 3px rgba(0, 0, 0, 0.15)'}
                color={'white'}
                onClick={handleDepositAave}
              >
                Finish
              </Button>
            </VStack>
          ) : null}

          {firstApproveComplete && !transactionLoading ? (
            <VStack>
              <Alert marginBottom={5} status="success" borderRadius={15}>
                <AlertIcon />
                <AlertTitle fontWeight={'light'}>
                  You have approved our contract to use your tokens to provide
                  liquidity to Uniswap protocol. Completes the process by
                  approving the use of token 2.
                </AlertTitle>
              </Alert>

              <Button
                bg="fourth"
                borderRadius={'70px'}
                boxShadow={'0px 2px 3px rgba(0, 0, 0, 0.15)'}
                color={'white'}
                onClick={handleApprove2}
              >
                Approve second token
              </Button>
            </VStack>
          ) : null}

          {secondApproveComplete && !transactionLoading ? (
            <VStack>
              <Alert marginBottom={5} status="success" borderRadius={15}>
                <AlertIcon />
                <AlertTitle fontWeight={'light'}>
                  You have approved our contract to use your tokens to provide
                  liquidity to Uniswap protocol. Now finish the proccess
                </AlertTitle>
              </Alert>

              <Button
                bg="fourth"
                borderRadius={'70px'}
                boxShadow={'0px 2px 3px rgba(0, 0, 0, 0.15)'}
                color={'white'}
                onClick={handleMintPosition}
              >
                Finish
              </Button>
            </VStack>
          ) : null}

          {!completeStrategy ? (
            <Button
              bg="primary"
              borderRadius={'70px'}
              boxShadow={'0px 2px 3px rgba(0, 0, 0, 0.15)'}
              display={
                approvedAave || firstApproveComplete || secondApproveComplete
                  ? 'none'
                  : 'block'
              }
              isDisabled={
                !(
                  strategy !== initialStrategy &&
                  text !== initialToken &&
                  amount > 0 &&
                  amount <= Number(maxAmount)
                ) ||
                transactionLoading ||
                depositAave
              }
              onClick={handleContinueButton}
            >
              {!transactionLoading ? (
                <Text color={'white'}>Continue</Text>
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

export default InvesmentModal;
