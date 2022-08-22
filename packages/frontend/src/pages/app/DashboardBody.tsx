import React from 'react';

import { Grid, GridItem } from '@chakra-ui/react';

import Menu from './Menu';
import Summary from './Summary';
import StakingFarming from './strategies/StakingFarming';
import RecursiveFarming from './strategies/RecursiveFarming';
import DeltaNeutral from './strategies/DeltaNeutral';
import Faq from './Faq';

function DashboardBody(this: any) {
  const [menuIndex, setMenuIndex] = React.useState(0);

  const renderStrategy = (index: number) => {
    switch (index) {
      case 0:
        return <Summary />;
      case 1:
        return <RecursiveFarming />;
      case 2:
        return <StakingFarming />;
      case 3:
        return <DeltaNeutral />;
      case 4:
        return <Faq />;
      default:
        return <Summary />;
    }
  };

  return (
    <Grid templateRows="repeat(2, 1fr)" templateColumns="repeat(5, 1fr)">
      <GridItem rowSpan={2} colSpan={1}>
        <Menu menuIndex={menuIndex} setMenuIndex={setMenuIndex} />
      </GridItem>

      <GridItem rowSpan={2} colSpan={4}>
        {renderStrategy(menuIndex)}
      </GridItem>
    </Grid>
  );
}

export default DashboardBody;
