// ============================================================================
// NEWS CONNECT: Web Entry Point for React Native Web / Expo
// ============================================================================

import { AppRegistry } from 'react-native';
import App from './App';

// Register the main App component for Web
AppRegistry.registerComponent('App', () => App);

// Mount to DOM root if running directly in a browser environment
if (typeof document !== 'undefined') {
  const rootTag = document.getElementById('root') || document.getElementById('app');
  if (rootTag) {
    AppRegistry.runApplication('App', { rootTag });
  }
}

export default App;

