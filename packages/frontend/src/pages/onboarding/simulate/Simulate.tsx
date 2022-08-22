import React from 'react';

import {
  Box,
  Button,
  Center,
  HStack,
  Input,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  Tooltip,
} from '@chakra-ui/react';

import calculateInvesment from '../../../utils/calculateInvesment';

import { useTranslation } from 'react-i18next';
import '../../../i18n';

type Props = {
  value: string;
  setValue: any;
  monthlyAmount: string;
  setMonthlyAmount: any;
  time: number;
  setTime: any;
  setSimulateState: any;
  setSimulationData: any;
};

function Simulate({
  value,
  setValue,
  monthlyAmount,
  setMonthlyAmount,
  time,
  setTime,
  setSimulateState,
  setSimulationData,
}: Props) {
  const { t } = useTranslation('Simulation');

  const handleChangeValue = (event: any) => setValue(event.target.value);

  const handleChangeMonthlyAmount = (event: any) =>
    setMonthlyAmount(event.target.value);

  const simulate = () => {
    setSimulationData(
      calculateInvesment(time, Number(value), Number(monthlyAmount), 0.1),
    );
    setSimulateState('simulate');
  };

  const [showTooltip, setShowTooltip] = React.useState(false);

  return (
    <Box width={['100%', '50%', '50%']}>
      <Box>
        <Text
          paddingTop={10}
          paddingLeft={10}
          fontWeight={'bold'}
          fontSize={'22px'}
        >
          {t('title')}
        </Text>
      </Box>

      <Box width={'100%'} padding={5}>
        <Text fontWeight={'light'} fontSize={'15px'}>
          {t('amountMessage')}
        </Text>
        <Input
          type={'number'}
          value={value}
          onChange={handleChangeValue}
          placeholder="$ 0 USDT"
          borderRadius={'12px'}
          focusBorderColor="primary"
        />
      </Box>

      <Box width={'100%'} padding={5}>
        <Text fontWeight={'light'} fontSize={'15px'}>
          {t('recurringMessage')}
        </Text>
        <Input
          type={'number'}
          value={monthlyAmount}
          onChange={handleChangeMonthlyAmount}
          placeholder="$ 0 USDT"
          borderRadius={'12px'}
          focusBorderColor="primary"
        />
      </Box>

      <Box width={'100%'} padding={8}>
        <HStack justifyContent={'space-between'}>
          <Text fontWeight={'light'} fontSize={'15px'}>
            {t('during')}
          </Text>

          <Text fontWeight={'light'} fontSize={'15px'}>
            {time} {t('years')}
          </Text>
        </HStack>
        <Slider
          aria-label="slider-ex-2"
          colorScheme="pink"
          defaultValue={3}
          min={0}
          max={40}
          step={1}
          onChange={(val) => setTime(val)}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          onTouchStart={() => setShowTooltip(true)}
          onTouchEndCapture={() => setShowTooltip(false)}
        >
          <SliderTrack bg="#E5E4E5">
            <SliderFilledTrack />
          </SliderTrack>
          <Tooltip
            hasArrow
            bg="primary"
            color="white"
            placement="top"
            isOpen={showTooltip}
            label={`${time}`}
          >
            <SliderThumb bg="primary"></SliderThumb>
          </Tooltip>
        </Slider>
      </Box>

      <Center marginTop={'50px'}>
        <Button
          onClick={simulate}
          isDisabled={value === '' || monthlyAmount === ''}
          bg="primary"
          boxShadow="0px 2px 3px rgba(0, 0, 0, 0.15)"
          borderRadius={'15px'}
        >
          <Text color={'white'}>{t('continue')}</Text>
        </Button>
      </Center>
    </Box>
  );
}

export default Simulate;
