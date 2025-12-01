
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const authService = {
  // Register a new user
  register: async (userData) => {
    await delay(500);
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (users.find(u => u.email === userData.email)) {
      throw new Error('User already exists');
    }
    
    const newUser = { ...userData, id: Date.now() };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    return newUser;
  },

  // Login
  login: async (email, password) => {
    await delay(500);
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) throw new Error('Invalid credentials');
    
    // In a real app, you would return a JWT token here
    localStorage.setItem('currentUser', JSON.stringify(user));
    return user;
  },

  // Update Profile
  updateProfile: async (updatedData) => {
    await delay(500);
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    const updatedUsers = users.map(u => 
      u.id === currentUser.id ? { ...u, ...updatedData } : u
    );

    localStorage.setItem('users', JSON.stringify(updatedUsers));
    
    // Update current session
    const newSessionUser = { ...currentUser, ...updatedData };
    localStorage.setItem('currentUser', JSON.stringify(newSessionUser));
    
    return newSessionUser;
  },

  logout: () => {
    localStorage.removeItem('currentUser');
  },

  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem('currentUser'));
  }
};