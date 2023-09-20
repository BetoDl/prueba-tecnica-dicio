
import { App } from "./App.jsx";
import { createRoot } from 'react-dom/client';

const domNode = document.getElementById('body');
const root = createRoot(domNode);
root.render(<App />);