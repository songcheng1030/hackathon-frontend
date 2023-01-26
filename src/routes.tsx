import { Redirect } from 'react-router-dom';
import Home from './pages/Home';
import LiveRaffles from './pages/LiveRaffles';
import DetailRaffles from './pages/DetailRaffles';
import SellDashboard from './pages/SellDashboard';
import DetailProfileRaffles from './pages/DetailProfileRaffles';
import SellDetailNft from './pages/SellDetailNft';
import Profile from './pages/Profile';
import WalletConnet from './pages/WalletConnet';

export const routes = {
  dashboard: [ 
    {
      path: "/",
      component: Home,
      exact: true
    },
    {
      path: "/buy/raffles",
      component: LiveRaffles,
      exact: true
    },
    {
      path: "/buy/raffles/:raffle_id",
      component: DetailRaffles,
      exact: true
    },
    {
      path: "/profile/dashboard",
      component: SellDashboard,
      exact: true
    },
    {
      path: "/profile/dashboard/:id",
      component: SellDashboard,
      exact: true
    },
    {
      path: "/profile/listed/:raffle_id",
      component: DetailProfileRaffles,
      exact: true
    },
    {
      path: "/sell/detail/:address/:token_id",
      component: SellDetailNft,
      exact: true
    },
    {
      path: "/profile/edit",
      component: Profile,
      exact: true
    },
    {
      path: "**",
      exact: true,
      component: () => <Redirect to="/" />
    },
  ],
  minimal: [
    {
      path: "/",
      component: Home,
      exact: true
    },
    {
      path: "/wallet",
      component: WalletConnet,
      exact: true
    },
    {
      path: "**",
      exact: true,
      component: () => <Redirect to="/" />,
    },
  ],
};
