import React from 'react';
import { observer } from 'mobx-react-lite';
import s from './main-window.module.sass';
import CopyPage from '../copy-page/copy-page';

const MainWindow = observer(() => (
  <div className={s.flexContainer}>
    <div className={s.mainContainer}>
      <aside className={s.leftAside} />
      <CopyPage />
      <aside className={s.rightAside} />
    </div>
  </div>
));

export default MainWindow;
