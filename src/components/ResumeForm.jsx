import { useState, useEffect } from "react";
import "./ResumeForm.css";
import ResumePreview from "./ResumePreview";
import jsPDF from "jspdf";

function ResumeForm() {
 const [formData, setFormData] = useState(() => {
  const savedData = localStorage.getItem("myResume");

  return savedData
    ? JSON.parse(savedData)
    : {
        name: "",
        email: "",
        phone: "",
        address: "",
        summary: "",
        degree: "",
        college: "",
        graduation: "",
        skills: "",
        project: "",
        experience: "",
      };
});
useEffect(() => {
  localStorage.setItem("myResume", JSON.stringify(formData));
}, [formData]);

  const [aiSuggestions, setAiSuggestions] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiError, setAiError] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit resume
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Resume submitted successfully!");
    console.log(formData);
  };

  // Download PDF
  const downloadPDF = () => {
    const doc = new jsPDF();
    let y = 20;

    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text(formData.name || "Your Name", 20, y);

    y += 10;

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");

    const contact = [
      formData.email,
      formData.phone,
      formData.address,
    ].filter(Boolean).join(" | ");

    if (contact) {
      doc.text(contact, 20, y);
      y += 12;
    }

    const addSection = (title, content) => {
      if (!content) return;

      if (y > 260) {
        doc.addPage();
        y = 20;
      }

      y += 5;

      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text(title, 20, y);

      y += 8;

      doc.setFontSize(11);
      doc.setFont("helvetica", "normal");

      const lines = doc.splitTextToSize(content, 170);

      lines.forEach((line) => {
        if (y > 280) {
          doc.addPage();
          y = 20;
        }

        doc.text(line, 20, y);
        y += 7;
      });
    };

    addSection("Professional Summary", formData.summary);

    addSection(
      "Education",
      `${formData.degree}\n${formData.college}\n${formData.graduation}`
    );

    addSection("Skills", formData.skills);
    addSection("Projects", formData.project);
    addSection("Work Experience", formData.experience);

    doc.save("My-Resume.pdf");
  };

  // Get AI suggestions
  const getAISuggestions = async () => {
    setLoading(true);
    setAiSuggestions("");
    setAiError("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/suggestions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            resume: formData,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setAiSuggestions(data.suggestions);

    } catch (error) {
      setAiError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="resume-container">

      <h2>Create Your Resume</h2>

      <form onSubmit={handleSubmit}>

        <h3>Personal Information</h3>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
        />

        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
        />

        <h3>Professional Summary</h3>

        <textarea
          name="summary"
          placeholder="Write a short summary about yourself"
          value={formData.summary}
          onChange={handleChange}
        />

        <h3>Education</h3>

        <input
          type="text"
          name="degree"
          placeholder="Degree"
          value={formData.degree}
          onChange={handleChange}
        />

        <input
          type="text"
          name="college"
          placeholder="College Name"
          value={formData.college}
          onChange={handleChange}
        />

        <input
          type="text"
          name="graduation"
          placeholder="Graduation Year"
          value={formData.graduation}
          onChange={handleChange}
        />

        <h3>Skills</h3>

        <textarea
          name="skills"
          placeholder="Enter your skills"
          value={formData.skills}
          onChange={handleChange}
        />

        <h3>Projects</h3>

        <textarea
          name="project"
          placeholder="Describe your projects"
          value={formData.project}
          onChange={handleChange}
        />

        <h3>Work Experience</h3>

        <textarea
          name="experience"
          placeholder="Describe your work experience"
          value={formData.experience}
          onChange={handleChange}
        />

        <button type="submit" className="submit-button">
          Submit Resume
        </button>

      </form>

      <button
        type="button"
        className="submit-button"
        onClick={downloadPDF}
      >
        Download Resume as PDF
      </button>

      <button
        type="button"
        className="submit-button"
        onClick={getAISuggestions}
        disabled={loading}
      >
        {loading ? "Generating Suggestions..." : "Get AI Suggestions"}
      </button>

      {aiError && (
        <p className="ai-error">
          {aiError}
        </p>
      )}

      {aiSuggestions && (
        <div className="ai-suggestions">
          <h2>AI Resume Suggestions</h2>
          <pre>{aiSuggestions}</pre>
        </div>
      )}

      <ResumePreview formData={formData} />

    </div>
  );
}

export default ResumeForm;