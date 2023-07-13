import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { MantineProvider } from '@mantine/core';
import { Register } from './components/Accounts/Register'
import { Login } from './components/Accounts/Login'
import { ForgotPassword } from './components/Accounts/ForgotPassword'
import Dashboard from './components/Accounts/Dashboard'
import Order from './components/Garment/Order';
import EKYC from './components/eKYC/eKYC';
import Approval from './components/Admin/Approval';
import { AuthSession } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { supabase } from './supabase';

export default function App() {
  const [session, setSession] = useState<AuthSession | null>(null)
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.auth.getSession()
      return data
    }

    fetchData()
      .then(({ session }) => {
        setSession(session)
      })
      .catch((error) => {
        console.log(error)
      })

    supabase.auth.onAuthStateChange(
      (_event: string, session: AuthSession | null) => {
        setSession(session)
      }
    )
  }, [])

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Router>
        <Switch>
          <Route path="/signup">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/forgot">
            <ForgotPassword />
          </Route>
          <Route path="/order">
            <Order />
          </Route>
          <Route path="/ekyc">
            <EKYC />
          </Route>
          <Route path="/approval">
            <Approval />
          </Route>
          {session && (
            <Route path="/dashboard">
              <Dashboard> HELLOW </Dashboard>
            </Route>
          )}
        </Switch>
      </Router>
    </MantineProvider>
  );
}