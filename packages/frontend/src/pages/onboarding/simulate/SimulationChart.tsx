import React from 'react';

import {
  Box,
  HStack,
  Input,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';

import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Legend,
  Filler,
  ScriptableContext,
  Tooltip as TooltipChart,
} from 'chart.js';

import { Line } from 'react-chartjs-2';

import calculateInvesment from '../../../utils/calculateInvesment';

import HowWorksModal from './HowWorksModal';

import { useTranslation } from 'react-i18next';
import '../../../i18n';

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  TooltipChart,
  Legend,
  Filler,
);

export const options = {
  responsive: true,
  animation: {
    duration: 1000,
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false,
    },
  },
};

type Props = {
  value: string;
  setValue: any;
  monthlyAmount: string;
  setMonthlyAmount: any;
  time: number;
  setTime: any;
  setSimulateState: any;
  setSimulationData: any;
  simulationData: any;
};

export function SimulationChart({
  value,
  setValue,
  monthlyAmount,
  setMonthlyAmount,
  time,
  setTime,
  setSimulationData,
  simulationData,
}: Props) {
  const { t } = useTranslation('Simulation');

  const handleChangeValue = (event: any) => {
    setValue(event.target.value);
    setSimulationData(
      calculateInvesment(
        time,
        Number(event.target.value),
        Number(monthlyAmount),
        0.1,
      ),
    );
  };

  const handleChangeMonthlyAmount = (event: any) => {
    setMonthlyAmount(event.target.value);
    setSimulationData(
      calculateInvesment(time, Number(value), Number(event.target.value), 0.1),
    );
  };

  const simulate = (time: number) => {
    setTime(time);
    setSimulationData(
      calculateInvesment(time, Number(value), Number(monthlyAmount), 0.1),
    );
  };

  const [showTooltip, setShowTooltip] = React.useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const data = () => {
    return {
      labels: simulationData.labels,
      datasets: [
        {
          data: simulationData.optimisticRevenue,
          borderColor: '#F72585',
          pointRadius: 0,
          borderWidth: 0,
          tension: 0.4,
          fill: true,
          backgroundColor: (context: ScriptableContext<'line'>) => {
            const ctx = context.chart.ctx;
            const gradient = ctx.createLinearGradient(0, 0, 0, 200);
            gradient.addColorStop(0, 'rgba(247, 37, 132, 0)');
            gradient.addColorStop(1, 'rgba(247, 37, 132, 0.6)');
            return gradient;
          },
          order: 3,
        },
        {
          data: simulationData.pessimisticRevenue,
          borderColor: '#F72585',
          pointRadius: 0,
          borderWidth: 0,
          tension: 0.4,
          fill: true,
          backgroundColor: 'white',
          order: 2,
        },
        {
          data: simulationData.invested,
          borderColor: '#3A0CA3',
          pointRadius: simulationData.borderRadius,
          borderWidth: 2,
          tension: 0.3,
          order: 1,
        },
      ],
    };
  };

  return (
    <Box width={'100%'}>
      <HStack>
        <Box width={'30%'} display={['none', 'block', 'block', 'block']}>
          <Text
            fontWeight="bold"
            fontSize={'16px'}
            paddingLeft={5}
            paddingTop={5}
          >
            ⚖️ {t('adjust')}
          </Text>
          <Box width={'100%'} paddingLeft={5} paddingRight={5} paddingTop={3}>
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
          <Box width={'100%'} paddingLeft={5} paddingRight={5} paddingTop={3}>
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
              defaultValue={time}
              min={1}
              max={40}
              step={1}
              onChange={(val) => simulate(val)}
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
                display={['none', 'block', 'block']}
              >
                <SliderThumb
                  bg="primary"
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                ></SliderThumb>
              </Tooltip>
            </Slider>
          </Box>
        </Box>
        <Box
          width={['100%', '70%', '70%']}
          display={['none', 'none', 'none', 'none']}
        >
          <HStack justifyContent={'space-between'} paddingTop={10}>
            <Text paddingLeft={5} fontSize={['18px', '20px', '20px']}>
              {t('in')} {time} {t('tittleChart')}
            </Text>
            <Text
              paddingRight={5}
              fontSize={['12px', '16px', '16px']}
              color={'primary'}
              onClick={onOpen}
              _hover={{
                cursor: 'pointer',
              }}
            >
              {t('howIsCalculated')}
            </Text>

            <HowWorksModal isOpen={isOpen} onClose={onClose} />
          </HStack>

          <Box width={'100%'} paddingLeft={5} paddingRight={5} paddingTop={3}>
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

          <Box width={'100%'} paddingLeft={5} paddingRight={5} paddingTop={3}>
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
              defaultValue={time}
              min={1}
              max={40}
              step={1}
              onChange={(val) => simulate(val)}
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
        </Box>

        <Box width={['100%', '100%', '70%']}>
          <HStack justifyContent={'space-between'} paddingTop={10}>
            <Text paddingLeft={5} fontSize={['18px', '20px', '20px']}>
              {t('in')} {time} {t('tittleChart')}
            </Text>
            <Text
              paddingRight={5}
              fontSize={['12px', '16px', '16px']}
              color={'primary'}
              onClick={onOpen}
              _hover={{
                cursor: 'pointer',
              }}
            >
              {t('howIsCalculated')}
            </Text>

            <HowWorksModal isOpen={isOpen} onClose={onClose} />
          </HStack>

          <Text
            paddingLeft={5}
            fontWeight="bold"
            fontSize={'26px'}
            color={'primary'}
          >
            {(
              (simulationData.optimisticRevenue[
                simulationData.labels.length - 1
              ] +
                simulationData.pessimisticRevenue[
                  simulationData.labels.length - 1
                ]) /
              2
            ).toFixed(0)}
          </Text>

          <HStack>
            <Box>
              <Text
                paddingLeft={5}
                paddingTop={5}
                fontSize={'14px'}
                color={'primary'}
              >
                {t('optimistic')}
              </Text>

              <Text
                paddingLeft={5}
                fontWeight="bold"
                fontSize={'16px'}
                color={'primary'}
              >
                {simulationData.optimisticRevenue[
                  simulationData.labels.length - 1
                ].toFixed(0)}
              </Text>
            </Box>

            <Box paddingLeft={30}>
              <Text
                paddingTop={5}
                fontSize={'14px'}
                color={'primary'}
                opacity={0.8}
              >
                {t('pessimistic')}
              </Text>

              <Text
                fontWeight="bold"
                fontSize={'16px'}
                color={'primary'}
                opacity={0.8}
              >
                {simulationData.pessimisticRevenue[
                  simulationData.labels.length - 1
                ].toFixed(0)}
              </Text>
            </Box>
          </HStack>

          <Text
            paddingLeft={5}
            paddingTop={5}
            fontSize={'14px'}
            color={'sixth'}
          >
            {t('invested')}
          </Text>

          <Text
            paddingLeft={5}
            fontWeight="bold"
            fontSize={'16px'}
            color={'sixth'}
          >
            {simulationData.invested[simulationData.labels.length - 1]}
          </Text>

          <Box marginTop={10}>
            <Line options={options} data={data()} />
          </Box>
        </Box>
      </HStack>

      <Box display={['block', 'none', 'none', 'none']}>
        <Text
          fontWeight="bold"
          fontSize={'16px'}
          paddingLeft={5}
          paddingTop={5}
        >
          ⚖️ {t('adjust')}
        </Text>

        <Box width={'100%'} paddingLeft={5} paddingRight={5} paddingTop={3}>
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

        <Box width={'100%'} paddingLeft={5} paddingRight={5} paddingTop={3}>
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
            defaultValue={time}
            min={1}
            max={40}
            step={1}
            onChange={(val) => simulate(val)}
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
      </Box>
    </Box>
  );
}

export default SimulationChart;
