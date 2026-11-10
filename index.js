// ============================================================================
// NEWS CONNECT: Application Entry Point (React Native & Expo)
// Registers root component to mount into iOS, Android and Web DOM
// ============================================================================

import { registerRootComponent } from 'expo';
import App from './App.js';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// On Web, it automatically runs AppRegistry.runApplication to mount into #root
registerRootComponent(App);

export default App;

