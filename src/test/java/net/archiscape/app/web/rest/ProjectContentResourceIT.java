package net.archiscape.app.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import net.archiscape.app.IntegrationTest;
import net.archiscape.app.domain.Project;
import net.archiscape.app.domain.ProjectContent;
import net.archiscape.app.repository.ProjectContentRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;

/**
 * Integration tests for the {@link ProjectContentResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ProjectContentResourceIT {

    private static final Integer DEFAULT_VERSION = 1;
    private static final Integer UPDATED_VERSION = 2;

    private static final LocalDate DEFAULT_IMPORT_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_IMPORT_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_FILE_NAME = "AAAAAAAAAA";
    private static final String UPDATED_FILE_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_CONTENT = "AAAAAAAAAA";
    private static final String UPDATED_CONTENT = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/project-contents";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ProjectContentRepository projectContentRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restProjectContentMockMvc;

    private ProjectContent projectContent;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProjectContent createEntity(EntityManager em) {
        ProjectContent projectContent = new ProjectContent()
            .version(DEFAULT_VERSION)
            .importDate(DEFAULT_IMPORT_DATE)
            .fileName(DEFAULT_FILE_NAME)
            .content(DEFAULT_CONTENT);
        // Add required entity
        Project project;
        if (TestUtil.findAll(em, Project.class).isEmpty()) {
            project = ProjectResourceIT.createEntity(em);
            em.persist(project);
            em.flush();
        } else {
            project = TestUtil.findAll(em, Project.class).get(0);
        }
        projectContent.setProject(project);
        return projectContent;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProjectContent createUpdatedEntity(EntityManager em) {
        ProjectContent projectContent = new ProjectContent()
            .version(UPDATED_VERSION)
            .importDate(UPDATED_IMPORT_DATE)
            .fileName(UPDATED_FILE_NAME)
            .content(UPDATED_CONTENT);
        // Add required entity
        Project project;
        if (TestUtil.findAll(em, Project.class).isEmpty()) {
            project = ProjectResourceIT.createUpdatedEntity(em);
            em.persist(project);
            em.flush();
        } else {
            project = TestUtil.findAll(em, Project.class).get(0);
        }
        projectContent.setProject(project);
        return projectContent;
    }

    @BeforeEach
    public void initTest() {
        projectContent = createEntity(em);
    }

    @Test
    @Transactional
    void createProjectContent() throws Exception {
        int databaseSizeBeforeCreate = projectContentRepository.findAll().size();
        // Create the ProjectContent
        restProjectContentMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(projectContent))
            )
            .andExpect(status().isCreated());

        // Validate the ProjectContent in the database
        List<ProjectContent> projectContentList = projectContentRepository.findAll();
        assertThat(projectContentList).hasSize(databaseSizeBeforeCreate + 1);
        ProjectContent testProjectContent = projectContentList.get(projectContentList.size() - 1);
        assertThat(testProjectContent.getVersion()).isEqualTo(DEFAULT_VERSION);
        assertThat(testProjectContent.getImportDate()).isEqualTo(DEFAULT_IMPORT_DATE);
        assertThat(testProjectContent.getFileName()).isEqualTo(DEFAULT_FILE_NAME);
        assertThat(testProjectContent.getContent()).isEqualTo(DEFAULT_CONTENT);
    }

    @Test
    @Transactional
    void createProjectContentWithExistingId() throws Exception {
        // Create the ProjectContent with an existing ID
        projectContent.setId(1L);

        int databaseSizeBeforeCreate = projectContentRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restProjectContentMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(projectContent))
            )
            .andExpect(status().isBadRequest());

        // Validate the ProjectContent in the database
        List<ProjectContent> projectContentList = projectContentRepository.findAll();
        assertThat(projectContentList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkVersionIsRequired() throws Exception {
        int databaseSizeBeforeTest = projectContentRepository.findAll().size();
        // set the field null
        projectContent.setVersion(null);

        // Create the ProjectContent, which fails.

        restProjectContentMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(projectContent))
            )
            .andExpect(status().isBadRequest());

        List<ProjectContent> projectContentList = projectContentRepository.findAll();
        assertThat(projectContentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkImportDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = projectContentRepository.findAll().size();
        // set the field null
        projectContent.setImportDate(null);

        // Create the ProjectContent, which fails.

        restProjectContentMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(projectContent))
            )
            .andExpect(status().isBadRequest());

        List<ProjectContent> projectContentList = projectContentRepository.findAll();
        assertThat(projectContentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllProjectContents() throws Exception {
        // Initialize the database
        projectContentRepository.saveAndFlush(projectContent);

        // Get all the projectContentList
        restProjectContentMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(projectContent.getId().intValue())))
            .andExpect(jsonPath("$.[*].version").value(hasItem(DEFAULT_VERSION)))
            .andExpect(jsonPath("$.[*].importDate").value(hasItem(DEFAULT_IMPORT_DATE.toString())))
            .andExpect(jsonPath("$.[*].fileName").value(hasItem(DEFAULT_FILE_NAME)))
            .andExpect(jsonPath("$.[*].content").value(hasItem(DEFAULT_CONTENT.toString())));
    }

    @Test
    @Transactional
    void getProjectContent() throws Exception {
        // Initialize the database
        projectContentRepository.saveAndFlush(projectContent);

        // Get the projectContent
        restProjectContentMockMvc
            .perform(get(ENTITY_API_URL_ID, projectContent.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(projectContent.getId().intValue()))
            .andExpect(jsonPath("$.version").value(DEFAULT_VERSION))
            .andExpect(jsonPath("$.importDate").value(DEFAULT_IMPORT_DATE.toString()))
            .andExpect(jsonPath("$.fileName").value(DEFAULT_FILE_NAME))
            .andExpect(jsonPath("$.content").value(DEFAULT_CONTENT.toString()));
    }

    @Test
    @Transactional
    void getNonExistingProjectContent() throws Exception {
        // Get the projectContent
        restProjectContentMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewProjectContent() throws Exception {
        // Initialize the database
        projectContentRepository.saveAndFlush(projectContent);

        int databaseSizeBeforeUpdate = projectContentRepository.findAll().size();

        // Update the projectContent
        ProjectContent updatedProjectContent = projectContentRepository.findById(projectContent.getId()).get();
        // Disconnect from session so that the updates on updatedProjectContent are not directly saved in db
        em.detach(updatedProjectContent);
        updatedProjectContent.version(UPDATED_VERSION).importDate(UPDATED_IMPORT_DATE).fileName(UPDATED_FILE_NAME).content(UPDATED_CONTENT);

        restProjectContentMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedProjectContent.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedProjectContent))
            )
            .andExpect(status().isOk());

        // Validate the ProjectContent in the database
        List<ProjectContent> projectContentList = projectContentRepository.findAll();
        assertThat(projectContentList).hasSize(databaseSizeBeforeUpdate);
        ProjectContent testProjectContent = projectContentList.get(projectContentList.size() - 1);
        assertThat(testProjectContent.getVersion()).isEqualTo(UPDATED_VERSION);
        assertThat(testProjectContent.getImportDate()).isEqualTo(UPDATED_IMPORT_DATE);
        assertThat(testProjectContent.getFileName()).isEqualTo(UPDATED_FILE_NAME);
        assertThat(testProjectContent.getContent()).isEqualTo(UPDATED_CONTENT);
    }

    @Test
    @Transactional
    void putNonExistingProjectContent() throws Exception {
        int databaseSizeBeforeUpdate = projectContentRepository.findAll().size();
        projectContent.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProjectContentMockMvc
            .perform(
                put(ENTITY_API_URL_ID, projectContent.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(projectContent))
            )
            .andExpect(status().isBadRequest());

        // Validate the ProjectContent in the database
        List<ProjectContent> projectContentList = projectContentRepository.findAll();
        assertThat(projectContentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchProjectContent() throws Exception {
        int databaseSizeBeforeUpdate = projectContentRepository.findAll().size();
        projectContent.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restProjectContentMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(projectContent))
            )
            .andExpect(status().isBadRequest());

        // Validate the ProjectContent in the database
        List<ProjectContent> projectContentList = projectContentRepository.findAll();
        assertThat(projectContentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamProjectContent() throws Exception {
        int databaseSizeBeforeUpdate = projectContentRepository.findAll().size();
        projectContent.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restProjectContentMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(projectContent)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the ProjectContent in the database
        List<ProjectContent> projectContentList = projectContentRepository.findAll();
        assertThat(projectContentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateProjectContentWithPatch() throws Exception {
        // Initialize the database
        projectContentRepository.saveAndFlush(projectContent);

        int databaseSizeBeforeUpdate = projectContentRepository.findAll().size();

        // Update the projectContent using partial update
        ProjectContent partialUpdatedProjectContent = new ProjectContent();
        partialUpdatedProjectContent.setId(projectContent.getId());

        partialUpdatedProjectContent.version(UPDATED_VERSION).importDate(UPDATED_IMPORT_DATE).content(UPDATED_CONTENT);

        restProjectContentMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedProjectContent.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedProjectContent))
            )
            .andExpect(status().isOk());

        // Validate the ProjectContent in the database
        List<ProjectContent> projectContentList = projectContentRepository.findAll();
        assertThat(projectContentList).hasSize(databaseSizeBeforeUpdate);
        ProjectContent testProjectContent = projectContentList.get(projectContentList.size() - 1);
        assertThat(testProjectContent.getVersion()).isEqualTo(UPDATED_VERSION);
        assertThat(testProjectContent.getImportDate()).isEqualTo(UPDATED_IMPORT_DATE);
        assertThat(testProjectContent.getFileName()).isEqualTo(DEFAULT_FILE_NAME);
        assertThat(testProjectContent.getContent()).isEqualTo(UPDATED_CONTENT);
    }

    @Test
    @Transactional
    void fullUpdateProjectContentWithPatch() throws Exception {
        // Initialize the database
        projectContentRepository.saveAndFlush(projectContent);

        int databaseSizeBeforeUpdate = projectContentRepository.findAll().size();

        // Update the projectContent using partial update
        ProjectContent partialUpdatedProjectContent = new ProjectContent();
        partialUpdatedProjectContent.setId(projectContent.getId());

        partialUpdatedProjectContent
            .version(UPDATED_VERSION)
            .importDate(UPDATED_IMPORT_DATE)
            .fileName(UPDATED_FILE_NAME)
            .content(UPDATED_CONTENT);

        restProjectContentMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedProjectContent.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedProjectContent))
            )
            .andExpect(status().isOk());

        // Validate the ProjectContent in the database
        List<ProjectContent> projectContentList = projectContentRepository.findAll();
        assertThat(projectContentList).hasSize(databaseSizeBeforeUpdate);
        ProjectContent testProjectContent = projectContentList.get(projectContentList.size() - 1);
        assertThat(testProjectContent.getVersion()).isEqualTo(UPDATED_VERSION);
        assertThat(testProjectContent.getImportDate()).isEqualTo(UPDATED_IMPORT_DATE);
        assertThat(testProjectContent.getFileName()).isEqualTo(UPDATED_FILE_NAME);
        assertThat(testProjectContent.getContent()).isEqualTo(UPDATED_CONTENT);
    }

    @Test
    @Transactional
    void patchNonExistingProjectContent() throws Exception {
        int databaseSizeBeforeUpdate = projectContentRepository.findAll().size();
        projectContent.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProjectContentMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, projectContent.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(projectContent))
            )
            .andExpect(status().isBadRequest());

        // Validate the ProjectContent in the database
        List<ProjectContent> projectContentList = projectContentRepository.findAll();
        assertThat(projectContentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchProjectContent() throws Exception {
        int databaseSizeBeforeUpdate = projectContentRepository.findAll().size();
        projectContent.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restProjectContentMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(projectContent))
            )
            .andExpect(status().isBadRequest());

        // Validate the ProjectContent in the database
        List<ProjectContent> projectContentList = projectContentRepository.findAll();
        assertThat(projectContentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamProjectContent() throws Exception {
        int databaseSizeBeforeUpdate = projectContentRepository.findAll().size();
        projectContent.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restProjectContentMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(projectContent))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the ProjectContent in the database
        List<ProjectContent> projectContentList = projectContentRepository.findAll();
        assertThat(projectContentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteProjectContent() throws Exception {
        // Initialize the database
        projectContentRepository.saveAndFlush(projectContent);

        int databaseSizeBeforeDelete = projectContentRepository.findAll().size();

        // Delete the projectContent
        restProjectContentMockMvc
            .perform(delete(ENTITY_API_URL_ID, projectContent.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ProjectContent> projectContentList = projectContentRepository.findAll();
        assertThat(projectContentList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
