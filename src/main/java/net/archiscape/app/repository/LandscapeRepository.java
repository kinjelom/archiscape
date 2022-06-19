package net.archiscape.app.repository;

import net.archiscape.app.domain.Landscape;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Landscape entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LandscapeRepository extends JpaRepository<Landscape, String> {}
