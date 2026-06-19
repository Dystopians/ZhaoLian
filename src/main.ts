import { AppController } from './app/AppController';
import './styles/main.css';

const root = document.querySelector<HTMLElement>('#app');
if (!root) {
  throw new Error('Missing #app root element.');
}

const controller = new AppController(root);
void controller.init();
