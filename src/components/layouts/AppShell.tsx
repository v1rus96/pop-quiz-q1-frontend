import { AppShell} from '@mantine/core';
import { Nav } from './Navbar';

const Shell = ({ children }: { children: React.ReactNode }) => {
  // Navbar and Header will not be rendered when hidden prop is set
  return (
    <AppShell navbar={<Nav/>}>
      {children}
    </AppShell>
  );
}

export default Shell;