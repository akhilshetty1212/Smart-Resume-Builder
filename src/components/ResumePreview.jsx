import "./ResumePreview.css";
function ResumePreview({ formData }) {
  return (
    <div className="resume-preview">

      <div className="preview-header">
        <h1>{formData.name || "Your Name"}</h1>
        <p>
          {formData.email || "your@email.com"}
          {formData.phone && ` | ${formData.phone}`}
        </p>
        <p>{formData.address}</p>
      </div>

      <div className="preview-section">
        <h3>PROFESSIONAL SUMMARY</h3>
        <p>{formData.summary || "Your professional summary will appear here."}</p>
      </div>

      <div className="preview-section">
        <h3>EDUCATION</h3>
        <h4>{formData.degree}</h4>
        <p>{formData.college}</p>
        <p>{formData.graduation}</p>
      </div>

      <div className="preview-section">
        <h3>SKILLS</h3>
        <p>{formData.skills || "Your skills will appear here."}</p>
      </div>

      <div className="preview-section">
        <h3>PROJECTS</h3>
        <p>{formData.project || "Your projects will appear here."}</p>
      </div>

      <div className="preview-section">
        <h3>EXPERIENCE</h3>
        <p>{formData.experience || "Your experience will appear here."}</p>
      </div>

    </div>
  );
}

export default ResumePreview;