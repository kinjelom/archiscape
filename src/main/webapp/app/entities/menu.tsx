import React from 'react';
import { Translate } from 'react-jhipster';

import MenuItem from 'app/shared/layout/menus/menu-item';

const EntitiesMenu = () => {
  return (
    <>
      {/* prettier-ignore */}
      <MenuItem icon="asterisk" to="/landscape">
        <Translate contentKey="global.menu.entities.landscape" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/landscape-element">
        <Translate contentKey="global.menu.entities.landscapeElement" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/project">
        <Translate contentKey="global.menu.entities.project" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/project-content">
        <Translate contentKey="global.menu.entities.projectContent" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/project-element">
        <Translate contentKey="global.menu.entities.projectElement" />
      </MenuItem>
      {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
    </>
  );
};

export default EntitiesMenu as React.ComponentType<any>;
