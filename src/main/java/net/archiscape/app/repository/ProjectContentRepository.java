package net.archiscape.app.repository;

import net.archiscape.app.domain.ProjectContent;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the ProjectContent entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProjectContentRepository extends JpaRepository<ProjectContent, Long> {}
