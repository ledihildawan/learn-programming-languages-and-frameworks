// File: UserContext.js
import { createContext } from 'react';

export const UserContext = createContext(); 

// File: UserProfile.js
import { useContext } from 'react';
import { UserContext } from './UserContext';

function UserProfile() {
  // Uses useContext to access user and logout from UserContext
  const { user, logout } = useContext(UserContext);

  return (
    // Displays user details and a logout button
    <div>
      <h2>User Profile</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <button onClick={logout}>Log out</button>
    </div>
  );
}

export default UserProfile;

// File: App.js
import { useState } from 'react';
import UserProfile from './UserProfile';

function App() {
  // Initializes user state with a default user object
  const [user, setUser] = useState({ name: 'John Doe', email: 'john@example.com' });

  // Provides a logout function to clear the user state
  const logout = () => setUser(null); 

  return (
    // Wraps components in UserContext.Provider
    // and passes user and logout as the context value
    <UserContext.Provider value={{ user, logout }}>
      <div>
        <h1>User Authentication Example</h1>
        {user ? <UserProfile /> : <p>Please log in.</p>}
      </div>
    </UserContext.Provider>
  );
}

export default App;