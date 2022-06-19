import landscape from 'app/entities/landscape/landscape.reducer';
import landscapeElement from 'app/entities/landscape-element/landscape-element.reducer';
import project from 'app/entities/project/project.reducer';
import projectContent from 'app/entities/project-content/project-content.reducer';
import projectElement from 'app/entities/project-element/project-element.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

const entitiesReducers = {
  landscape,
  landscapeElement,
  project,
  projectContent,
  projectElement,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
};

export default entitiesReducers;
