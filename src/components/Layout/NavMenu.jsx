import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

import dashboard from './icons/dashboard.svg';
import commits from './icons/commits.svg';
import files from './icons/files.svg';
import issues from './icons/issues.svg';
import pull_requests from './icons/pull_requests.svg';
import code_patterns from './icons/code_patterns.svg';
import settings from './icons/settings.svg';

const NavMenuTextButton = ({ icon, children }) => (
  <button className="NavMenuTextButton button is-small">
    <span className="icon is-small">
      <FontAwesomeIcon icon={icon} />
    </span>
    <span>{children}</span>
  </button>
);

const NavMenuButton = ({ icon, isActive, children }) => (
  <button className={`NavMenuButton button ${isActive ? 'is-active' : ''}`}>
    <img src={icon} alt={children.toString()} />
    <span>{children}</span>
  </button>
);

const NavMenu = () => (
  <div className="NavMenu">
    <div className="NavMenu-section">
      <NavMenuTextButton icon={faAngleLeft}>Team</NavMenuTextButton>
    </div>
    <div className="NavMenu-section">
      <NavMenuButton icon={dashboard}>Dashboard</NavMenuButton>
      <NavMenuButton icon={commits} isActive>
        Commits
      </NavMenuButton>
      <NavMenuButton icon={files}>Files</NavMenuButton>
      <NavMenuButton icon={issues}>Issues</NavMenuButton>
      <NavMenuButton icon={pull_requests}>Pull Requests</NavMenuButton>
    </div>
    <div className="NavMenu-section">
      <NavMenuButton icon={code_patterns}>Code Patterns</NavMenuButton>
      <NavMenuButton icon={settings}>Settings</NavMenuButton>
    </div>
  </div>
);

export default NavMenu;
