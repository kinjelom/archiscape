package net.archiscape.app.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.LocalDate;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A ProjectContent.
 */
@Entity
@Table(name = "project_content")
public class ProjectContent implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "version", nullable = false)
    private Integer version;

    @NotNull
    @Column(name = "import_date", nullable = false)
    private LocalDate importDate;

    @Column(name = "file_name")
    private String fileName;

    @Lob
    @Column(name = "content", nullable = false)
    private String content;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = { "landscape" }, allowSetters = true)
    private Project project;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public ProjectContent id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getVersion() {
        return this.version;
    }

    public ProjectContent version(Integer version) {
        this.setVersion(version);
        return this;
    }

    public void setVersion(Integer version) {
        this.version = version;
    }

    public LocalDate getImportDate() {
        return this.importDate;
    }

    public ProjectContent importDate(LocalDate importDate) {
        this.setImportDate(importDate);
        return this;
    }

    public void setImportDate(LocalDate importDate) {
        this.importDate = importDate;
    }

    public String getFileName() {
        return this.fileName;
    }

    public ProjectContent fileName(String fileName) {
        this.setFileName(fileName);
        return this;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getContent() {
        return this.content;
    }

    public ProjectContent content(String content) {
        this.setContent(content);
        return this;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Project getProject() {
        return this.project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public ProjectContent project(Project project) {
        this.setProject(project);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ProjectContent)) {
            return false;
        }
        return id != null && id.equals(((ProjectContent) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ProjectContent{" +
            "id=" + getId() +
            ", version=" + getVersion() +
            ", importDate='" + getImportDate() + "'" +
            ", fileName='" + getFileName() + "'" +
            ", content='" + getContent() + "'" +
            "}";
    }
}
