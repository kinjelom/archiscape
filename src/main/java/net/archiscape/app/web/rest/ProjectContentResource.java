package net.archiscape.app.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import net.archiscape.app.domain.ProjectContent;
import net.archiscape.app.repository.ProjectContentRepository;
import net.archiscape.app.web.rest.errors.BadRequestAlertException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link net.archiscape.app.domain.ProjectContent}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ProjectContentResource {

    private final Logger log = LoggerFactory.getLogger(ProjectContentResource.class);

    private static final String ENTITY_NAME = "projectContent";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ProjectContentRepository projectContentRepository;

    public ProjectContentResource(ProjectContentRepository projectContentRepository) {
        this.projectContentRepository = projectContentRepository;
    }

    /**
     * {@code POST  /project-contents} : Create a new projectContent.
     *
     * @param projectContent the projectContent to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new projectContent, or with status {@code 400 (Bad Request)} if the projectContent has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/project-contents")
    public ResponseEntity<ProjectContent> createProjectContent(@Valid @RequestBody ProjectContent projectContent)
        throws URISyntaxException {
        log.debug("REST request to save ProjectContent : {}", projectContent);
        if (projectContent.getId() != null) {
            throw new BadRequestAlertException("A new projectContent cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ProjectContent result = projectContentRepository.save(projectContent);
        return ResponseEntity
            .created(new URI("/api/project-contents/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /project-contents/:id} : Updates an existing projectContent.
     *
     * @param id the id of the projectContent to save.
     * @param projectContent the projectContent to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated projectContent,
     * or with status {@code 400 (Bad Request)} if the projectContent is not valid,
     * or with status {@code 500 (Internal Server Error)} if the projectContent couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/project-contents/{id}")
    public ResponseEntity<ProjectContent> updateProjectContent(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody ProjectContent projectContent
    ) throws URISyntaxException {
        log.debug("REST request to update ProjectContent : {}, {}", id, projectContent);
        if (projectContent.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, projectContent.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!projectContentRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        ProjectContent result = projectContentRepository.save(projectContent);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, projectContent.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /project-contents/:id} : Partial updates given fields of an existing projectContent, field will ignore if it is null
     *
     * @param id the id of the projectContent to save.
     * @param projectContent the projectContent to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated projectContent,
     * or with status {@code 400 (Bad Request)} if the projectContent is not valid,
     * or with status {@code 404 (Not Found)} if the projectContent is not found,
     * or with status {@code 500 (Internal Server Error)} if the projectContent couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/project-contents/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<ProjectContent> partialUpdateProjectContent(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody ProjectContent projectContent
    ) throws URISyntaxException {
        log.debug("REST request to partial update ProjectContent partially : {}, {}", id, projectContent);
        if (projectContent.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, projectContent.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!projectContentRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<ProjectContent> result = projectContentRepository
            .findById(projectContent.getId())
            .map(existingProjectContent -> {
                if (projectContent.getVersion() != null) {
                    existingProjectContent.setVersion(projectContent.getVersion());
                }
                if (projectContent.getImportDate() != null) {
                    existingProjectContent.setImportDate(projectContent.getImportDate());
                }
                if (projectContent.getFileName() != null) {
                    existingProjectContent.setFileName(projectContent.getFileName());
                }
                if (projectContent.getContent() != null) {
                    existingProjectContent.setContent(projectContent.getContent());
                }

                return existingProjectContent;
            })
            .map(projectContentRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, projectContent.getId().toString())
        );
    }

    /**
     * {@code GET  /project-contents} : get all the projectContents.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of projectContents in body.
     */
    @GetMapping("/project-contents")
    public ResponseEntity<List<ProjectContent>> getAllProjectContents(@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of ProjectContents");
        Page<ProjectContent> page = projectContentRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /project-contents/:id} : get the "id" projectContent.
     *
     * @param id the id of the projectContent to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the projectContent, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/project-contents/{id}")
    public ResponseEntity<ProjectContent> getProjectContent(@PathVariable Long id) {
        log.debug("REST request to get ProjectContent : {}", id);
        Optional<ProjectContent> projectContent = projectContentRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(projectContent);
    }

    /**
     * {@code DELETE  /project-contents/:id} : delete the "id" projectContent.
     *
     * @param id the id of the projectContent to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/project-contents/{id}")
    public ResponseEntity<Void> deleteProjectContent(@PathVariable Long id) {
        log.debug("REST request to delete ProjectContent : {}", id);
        projectContentRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
