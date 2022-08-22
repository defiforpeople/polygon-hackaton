import { useAdapter } from '../../hooks/use-adapter';
import ConnectWallet from './ConnectWallet';
import DashboardBody from './DashboardBody';

function Dashboard() {
  const { isAuthenticated } = useAdapter();
  return isAuthenticated ? <DashboardBody /> : <ConnectWallet />;
}

export default Dashboard;
