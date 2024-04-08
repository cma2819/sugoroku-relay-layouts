import { ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
  
export const render = (app: ReactNode) => {
  const rootDom = document.getElementById('root');
  if (!rootDom) {
    console.error('#root DOM is not found');
    return;
  }
  const root = createRoot(rootDom);
  root.render(app);
};