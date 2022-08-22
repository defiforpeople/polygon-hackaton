import { Route, Routes } from 'react-router-dom';

import DefiForPeopleApp from './pages/app/DefiForPeopleApp';

import Landing from './pages/landing/Landing';
import Onboarding from './pages/onboarding/Onboarding';
import Building from './pages/building/Building';
import SimulatePage from './pages/simulate/SimulatePage';
import Strategies from './pages/strategies/Strategies';
import Lending from './pages/strategies/lending/Lending';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/app" element={<DefiForPeopleApp />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/building" element={<Building />} />
      <Route path="/simulate" element={<SimulatePage />} />
      <Route path="/strategies" element={<Strategies />} />
      <Route path="/lending" element={<Lending />} />
    </Routes>
  );
}

export default App;
