import { Box, Center, Flex } from '@chakra-ui/react';
import React from 'react';
import FooterApp from '../app/footers/FootersApp';
import NavbarLanding from '../app/navbar/NavbarLanding';
import SimulationChart from '../onboarding/simulate/SimulationChart';

function SimulatePage() {
  // Simulation state
  const recommendedMinTime = 1;

  const initialSimulation = {
    labels: ['Today', '1 year'],
    invested: [0, 10],
    pessimisticRevenue: [0, 10],
    optimisticRevenue: [0, 10],
    borderRadius: [0, 1],
  };

  const [simulateState, setSimulateState] = React.useState('notActive');

  const [simulationData, setSimulationData] = React.useState(initialSimulation);

  const [value, setValue] = React.useState('');

  const [monthlyAmount, setMonthlyAmount] = React.useState('');

  const [time, setTime] = React.useState(recommendedMinTime);

  return (
    <Flex bg={'white'} flexDirection="column" height={'95vh'}>
      <NavbarLanding />
      <Center marginTop={[0, 100, 100]}>
        <Box width={['100%', '50%', '50%']}>
          <SimulationChart
            value={value}
            setValue={setValue}
            monthlyAmount={monthlyAmount}
            setMonthlyAmount={setMonthlyAmount}
            time={time}
            setTime={setTime}
            setSimulateState={setSimulateState}
            setSimulationData={setSimulationData}
            simulationData={simulationData}
          />
        </Box>
      </Center>
      <FooterApp />
    </Flex>
  );
}

export default SimulatePage;
