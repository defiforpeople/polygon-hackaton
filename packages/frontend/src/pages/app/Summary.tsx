import { Box, HStack, Stack, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useAdapter } from '../../hooks/use-adapter';

import { Spinner } from '@chakra-ui/react';
import { Deposit, Withdraw } from '../../utils/network-manager';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

const second = 1000;

function Summary() {
  const { adapter, profile } = useAdapter();

  // polling datetime
  const [updatedDate, setUpdatedDate] = useState(new Date());

  // deposits
  const [deposits, setDeposits] = useState(0);
  const [depositsLoading, setDepositsLoading] = useState(false);
  const [firstDeposit, setFirstDeposit] = useState({} as Deposit);
  const [lastDeposit, setLastDeposit] = useState({} as Deposit);

  // withdrawals
  const [withdrawals, setWithdrawals] = useState(0);
  const [withdrawalsLoading, setWithdrawalsLoading] = useState(false);
  const [firstWithdraw, setFirstWithdraw] = useState({} as Withdraw);
  const [lastWithdraw, setLastWithdraw] = useState({} as Withdraw);

  useEffect(() => {
    // const deposits = async () => {
    //   setDepositsLoading(true);
    //   const depositsList = await adapter.getDeposits();

    //   // finish when depostir list are empty
    //   if (depositsList.length === 0) {
    //     setDepositsLoading(false);
    //     return;
    //   }

    //   // sort the array by asc timestamp
    //   const sortedDeposits = depositsList.sort(
    //     (a, b) => a.timestamp - b.timestamp,
    //   );

    //   // save fist deposit
    //   const [first] = sortedDeposits;
    //   setFirstDeposit(first);

    //   // save last deposit
    //   setLastDeposit(sortedDeposits[sortedDeposits.length - 1]);

    //   // calculate sum
    //   const sum = sortedDeposits.reduce((s, deposit) => s + deposit.amount, 0);
    //   setDeposits(Number((sum / 1e18).toFixed(3)));
    //   setDepositsLoading(false);
    // };

    // const withdrawals = async () => {
    //   setWithdrawalsLoading(true);
    //   const withdrawalsList = await adapter.getWithdrawals();

    //   // finish when withdraw list are empty
    //   if (withdrawalsList.length === 0) {
    //     setWithdrawalsLoading(false);
    //     return;
    //   }

    //   // sort the array by asc timestamp
    //   const sortedWithdrawals = withdrawalsList.sort(
    //     (a, b) => a.timestamp - b.timestamp,
    //   );

    //   // save fist withdraw
    //   const [first] = sortedWithdrawals;
    //   setFirstWithdraw(first);

    //   // save last withdraw
    //   setLastWithdraw(sortedWithdrawals[sortedWithdrawals.length - 1]);

    //   // calculate sum
    //   const sum = sortedWithdrawals.reduce(
    //     (s, withdraw) => s + withdraw.amount,
    //     0,
    //   );
    //   setWithdrawals(Number((sum / 1e18).toFixed(3)));
    //   setWithdrawalsLoading(false);
    // };

    const balances = async () => {
      if (!profile.address || profile.address === '') {
        return;
      }

      setWithdrawalsLoading(true);
      setDepositsLoading(true);

      const bb = await adapter.getStrategiesBalances(profile.address);

      console.log('B/B', bb);

      setWithdrawals(Number(bb.withdraws));
      setDeposits(Number(bb.deposits));

      setWithdrawalsLoading(false);
      setDepositsLoading(false);
    };

    // call only the first time
    balances();
    // withdrawals();

    const interval = setInterval(() => {
      // deposits();
      // withdrawals();
      setUpdatedDate(new Date());
    }, 15 * second);

    return () => clearInterval(interval);
  }, [adapter, profile]);

  return (
    <Box
      padding={10}
      width={{
        base: '100%',
        xl: '80%',
      }}
    >
      <Text
        fontWeight={700}
        fontSize={'26'}
        lineHeight={'31.2px'}
        color="black"
      >
        Investment Summary 📈
      </Text>

      {firstDeposit.timestamp ? (
        <Text
          fontWeight={400}
          fontSize={'16'}
          lineHeight={'19.2px'}
          letterSpacing={'1%'}
          color="grayLetter"
          paddingTop={3}
        >
          You have been investing from{' '}
          {dayjs(firstDeposit.timestamp).fromNow(true)} ago
        </Text>
      ) : null}

      <Box
        marginTop={5}
        boxShadow={'0px 0px 10px rgba(0, 0, 0, 0.1)'}
        borderRadius={14}
      >
        <Box
          borderBottom="1px"
          borderStyle="solid"
          borderColor="rgba(0, 0, 0, 0.1)"
          padding={2}
        >
          <HStack justifyContent="space-between">
            <HStack>
              <Text paddingLeft={3} paddingRight={3} fontSize={'20'}>
                🟢
              </Text>
              <Stack
                direction={{
                  base: 'column',
                  lg: 'row',
                }}
              >
                <Stack
                  direction={{
                    base: 'column',
                    lg: 'row',
                  }}
                  alignItems={{
                    base: 'flex-start',
                    lg: 'center',
                  }}
                >
                  <Text
                    paddingTop={3}
                    paddingBottom={3}
                    fontWeight={400}
                    fontSize={'20px'}
                    lineHeight={'24px'}
                    letterSpacing={'-3%'}
                    color="#282828"
                  >
                    Your deposits
                  </Text>
                  {!depositsLoading && deposits > 0 ? (
                    <Text
                      marginTop={{
                        base: '-10px !important',
                        lg: '0 !important',
                      }}
                      fontWeight={400}
                      fontSize={'12px'}
                      color="grayLetter"
                      fontStyle={'oblique'}
                    >
                      (Last deposit {dayjs(lastDeposit.timestamp).fromNow(true)}{' '}
                      ago)
                    </Text>
                  ) : null}
                </Stack>
              </Stack>
            </HStack>
            {!depositsLoading ? (
              <Text
                paddingRight={5}
                fontWeight={400}
                fontSize={'20px'}
                lineHeight={'24px'}
                letterSpacing={'-3%'}
                color="#282828"
              >
                ${deposits}
              </Text>
            ) : (
              <Box paddingRight={'25px'}>
                <Spinner color="primary" size={'md'} />
              </Box>
            )}
          </HStack>
        </Box>

        <Box
          borderBottom="1px"
          borderStyle="solid"
          borderColor="rgba(0, 0, 0, 0.1)"
          padding={2}
        >
          <HStack justifyContent="space-between">
            <HStack>
              <Text paddingLeft={3} paddingRight={3} fontSize={'20'}>
                🟢
              </Text>
              <Stack
                direction={{
                  base: 'column',
                  lg: 'row',
                }}
              >
                <Stack
                  direction={{
                    base: 'column',
                    lg: 'row',
                  }}
                  alignItems={{
                    base: 'flex-start',
                    lg: 'center',
                  }}
                >
                  <Text
                    paddingTop={3}
                    paddingBottom={3}
                    fontWeight={400}
                    fontSize={'20px'}
                    lineHeight={'24px'}
                    letterSpacing={'-3%'}
                    color="#282828"
                  >
                    Rewards
                  </Text>
                  {!depositsLoading ? (
                    <Text
                      marginTop={{
                        base: '-10px !important',
                        lg: '0 !important',
                      }}
                      fontWeight={400}
                      fontSize={'12px'}
                      color="grayLetter"
                      fontStyle={'oblique'}
                    >
                      (Estimaded average 1.23% APY)
                    </Text>
                  ) : (
                    <Text
                      marginTop={{
                        base: '-10px !important',
                        lg: '0 !important',
                      }}
                      fontWeight={400}
                      fontSize={'12px'}
                      color="grayLetter"
                      fontStyle={'oblique'}
                    >
                      (Estimaded average...)
                    </Text>
                  )}
                </Stack>
              </Stack>
            </HStack>
            {!depositsLoading ? (
              <Text
                paddingRight={5}
                fontWeight={400}
                fontSize={'20px'}
                lineHeight={'24px'}
                letterSpacing={'-3%'}
                color="#282828"
              >
                ${deposits}
              </Text>
            ) : (
              <Box paddingRight={'25px'}>
                <Spinner color="primary" size={'md'} />
              </Box>
            )}
          </HStack>
        </Box>

        <Box
          borderBottom="1px"
          borderStyle="solid"
          borderColor="rgba(0, 0, 0, 0.1)"
          padding={2}
        >
          <HStack justifyContent="space-between">
            <HStack>
              <Text paddingLeft={3} paddingRight={3} fontSize={'20'}>
                🔴
              </Text>
              <Stack
                direction={{
                  base: 'column',
                  lg: 'row',
                }}
              >
                <Stack
                  direction={{
                    base: 'column',
                    lg: 'row',
                  }}
                  alignItems={{
                    base: 'flex-start',
                    lg: 'center',
                  }}
                >
                  <Text
                    paddingTop={3}
                    paddingBottom={3}
                    fontWeight={400}
                    fontSize={'20px'}
                    lineHeight={'24px'}
                    letterSpacing={'-3%'}
                    color="#282828"
                  >
                    Withdrawals
                  </Text>

                  {!withdrawalsLoading && withdrawals > 0 ? (
                    <Text
                      marginTop={{
                        base: '-10px !important',
                        lg: '0 !important',
                      }}
                      fontWeight={400}
                      fontSize={'12px'}
                      color="grayLetter"
                      fontStyle={'oblique'}
                    >
                      (Last withdraw{' '}
                      {dayjs(lastWithdraw.timestamp).fromNow(true)} ago)
                    </Text>
                  ) : null}
                </Stack>
              </Stack>
            </HStack>
            {!withdrawalsLoading ? (
              <Text
                paddingRight={5}
                fontWeight={400}
                fontSize={'20px'}
                lineHeight={'24px'}
                letterSpacing={'-3%'}
                color="#282828"
              >
                ${withdrawals}
              </Text>
            ) : (
              <Box paddingRight={'25px'}>
                <Spinner color="primary" size={'md'} />
              </Box>
            )}
          </HStack>
        </Box>

        <Box
          borderBottom="1px"
          borderStyle="solid"
          borderColor="rgba(0, 0, 0, 0.1)"
          padding={2}
        >
          <HStack justifyContent="space-between">
            <HStack>
              <Text paddingLeft={3} paddingRight={3} fontSize={'20'}>
                🔴
              </Text>
              <Stack
                direction={{
                  base: 'column',
                  lg: 'row',
                }}
              >
                <Stack
                  direction={{
                    base: 'column',
                    lg: 'row',
                  }}
                  alignItems={{
                    base: 'flex-start',
                    lg: 'center',
                  }}
                >
                  <Text
                    paddingTop={3}
                    paddingBottom={3}
                    fontWeight={400}
                    fontSize={'20px'}
                    lineHeight={'24px'}
                    letterSpacing={'-3%'}
                    color="#282828"
                  >
                    Other charges
                  </Text>
                  <Text
                    marginTop={{
                      base: '-10px !important',
                      lg: '0 !important',
                    }}
                    fontWeight={400}
                    fontSize={'12px'}
                    color="grayLetter"
                    fontStyle={'oblique'}
                  >
                    (Operational/Administrative fees)
                  </Text>
                </Stack>
              </Stack>
            </HStack>
            {!depositsLoading ? (
              <Text
                paddingRight={5}
                fontWeight={400}
                fontSize={'20px'}
                lineHeight={'24px'}
                letterSpacing={'-3%'}
                color="#282828"
              >
                Free for now
              </Text>
            ) : (
              <Box paddingRight={'25px'}>
                <Spinner color="primary" size={'md'} />
              </Box>
            )}
          </HStack>
        </Box>

        <Box padding={2}>
          <HStack justifyContent="space-between">
            <HStack>
              <Text paddingLeft={3} paddingRight={3} fontSize={'20'}>
                💰
              </Text>
              <Stack
                direction={{
                  base: 'column',
                  lg: 'row',
                }}
              >
                <Stack
                  direction={{
                    base: 'column',
                    lg: 'row',
                  }}
                  alignItems={{
                    base: 'flex-start',
                    lg: 'center',
                  }}
                >
                  <Text
                    paddingTop={3}
                    paddingBottom={3}
                    fontWeight={400}
                    fontSize={'20px'}
                    lineHeight={'24px'}
                    letterSpacing={'-3%'}
                    color="#282828"
                  >
                    Total balance
                  </Text>
                  {/* {!depositsLoading ? (
                    <Text
                      marginTop={{
                        base: '-10px !important',
                        lg: '0 !important',
                      }}
                      fontWeight={400}
                      fontSize={'12px'}
                      color="grayLetter"
                      fontStyle={'oblique'}
                    >
                      (Operational/Administrative fees)
                    </Text>
                  ) : null} */}
                </Stack>
              </Stack>
            </HStack>
            {!depositsLoading && !withdrawalsLoading ? (
              <Text
                paddingRight={5}
                fontWeight={400}
                fontSize={'20px'}
                lineHeight={'24px'}
                letterSpacing={'-3%'}
                color="#282828"
              >
                ${deposits - withdrawals}
              </Text>
            ) : (
              <Box paddingRight={'25px'}>
                <Spinner color="primary" size={'md'} />
              </Box>
            )}
          </HStack>
        </Box>
      </Box>

      <Text
        fontWeight={400}
        fontSize={'16'}
        lineHeight={'19.2px'}
        letterSpacing={'1%'}
        color="grayLetter"
        paddingTop={5}
        textAlign={'right'}
      >
        Updated at {dayjs(updatedDate).fromNow(true)}
      </Text>
    </Box>
  );
}

export default Summary;
