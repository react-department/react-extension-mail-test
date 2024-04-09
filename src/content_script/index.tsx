import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { store } from '../store/store';
import Settings from './Settings';

const app = document.createElement('div');
app.id = 'CRA-container';
window.addEventListener('load', () => {
  document.body.appendChild(app);
  // eslint-disable-next-line react/no-deprecated
  ReactDOM.render(<Provider store={store}><Settings /></Provider>, app);
}, false);
