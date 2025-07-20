// theme.js
const lightTheme = {
    background: '#E5E5E5',
    card: '#FAFAFA',
    text: '#222',
    subtext: '#666',
    button: '#3A86FF',
    buttonText: '#fff',
    border: '#DDD',
  };
  
  const darkTheme = {
    background: '#1C1C1E',
    card: '#2C2C2E',
    text: '#F5F5F5',
    subtext: '#A9A9A9',
    button: '#0A84FF',
    buttonText: '#fff',
    border: '#333',
  };
  
  export const getTheme = (scheme) => (scheme === 'dark' ? darkTheme : lightTheme);
  