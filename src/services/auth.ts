import { supabase } from "../supabase";

// Register a new user
export const registerUser = async (email: string, password: string) => {
  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw error;
};

// Authenticate an existing user
export const loginUser = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  // Update failed login attempts
  if (!data) {
    const { error } = await supabase
      .from('users')
      .update({ login_attempts: 'login_attempts + 1' })
      .match({ email });

    if (error) throw error;

    //get the login attempts attribute
    const { data: userData } = await supabase
      .from('users')
      .select('login_attempts')
      .match({ email });
      

    // If the login attempts are 3, block the user
    if (userData && userData[0].login_attempts === 3) {
      const { error } = await supabase
        .from('users')
        .update({ blocked: true })
        .match({ email });

      if (error) throw error;
    }
  } else {
    // If the login is successful, reset the login attempts
    const { error } = await supabase
      .from('users')
      .update({ login_attempts: 0 })
      .match({ email });

    if (error) throw error;
  }
};

// Logout the current user
export const logoutUser = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) throw error;
};

// Get the current user session
export const getSession = () => {
  return supabase.auth.getSession();
};

// Get the current user
export const getUser = () => {
  return supabase.auth.getUser();
};

// Recover user password
export const recoverPassword = async (email: string) => {
  const { error } = await supabase.auth.resetPasswordForEmail(email);

  if (error) throw error;
};
