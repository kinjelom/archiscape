package net.archiscape.app.domain;

import static org.assertj.core.api.Assertions.assertThat;

import net.archiscape.app.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ProjectContentTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProjectContent.class);
        ProjectContent projectContent1 = new ProjectContent();
        projectContent1.setId(1L);
        ProjectContent projectContent2 = new ProjectContent();
        projectContent2.setId(projectContent1.getId());
        assertThat(projectContent1).isEqualTo(projectContent2);
        projectContent2.setId(2L);
        assertThat(projectContent1).isNotEqualTo(projectContent2);
        projectContent1.setId(null);
        assertThat(projectContent1).isNotEqualTo(projectContent2);
    }
}
