import { NavigationControlProvider, useNavigationControl } from './navigation-control-context';
import { Sidebar } from './sidebar/sidebar';
import { Header } from './header/header';

export { useNavigationControl };
export const Navigation = {
  Sidebar,
  Header,
  Provider: NavigationControlProvider,
};
