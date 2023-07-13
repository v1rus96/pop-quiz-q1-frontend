import Shell from "../layouts/AppShell";

export function Dashboard({ children }: { children: any }) {


  return (
    <Shell>
      {children}
    </Shell>
  );
}

export default Dashboard;
