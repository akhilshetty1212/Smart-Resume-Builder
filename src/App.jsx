import ResumeForm from "./components/ResumeForm";
import "./App.css";

function App() {
  return (
    <div className="app">

      {/* Navigation Bar */}
      <nav className="navbar">
        <h2 className="logo">SmartResume<span>AI</span></h2>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#features">Features</a>
          <a href="#about">About</a>
        </div>

        <button
          className="nav-button"
          onClick={() =>
            document.getElementById("builder").scrollIntoView({
              behavior: "smooth"
            })
          }
        >
          Get Started
        </button>
      </nav>

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-content">
          <p className="tagline">AI POWERED RESUME BUILDER</p>

          <h1>
            Build Your Resume.
            <br />
            <span>Build Your Future.</span>
          </h1>

          <p className="description">
            Create professional resumes in minutes.
            Get smart AI suggestions and make your
            resume stand out from the crowd.
          </p>

          <button
            className="main-button"
            onClick={() =>
              document.getElementById("builder").scrollIntoView({
                behavior: "smooth"
              })
            }
          >
            Start Building Resume →
          </button>

          <p className="small-text">
            Simple • Smart • Professional
          </p>
        </div>

        <div className="hero-image">
          <div className="resume-card">
            <div className="resume-top"></div>
            <h2>YOUR NAME</h2>
            <p>Software Developer</p>
            <hr />
            <h4>EDUCATION</h4>
            <p>Computer Science Engineering</p>
            <h4>SKILLS</h4>
            <p>Java | React | Python | SQL</p>
            <h4>PROJECTS</h4>
            <p>Smart Resume Builder</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <h2>Everything You Need</h2>
        <p className="section-description">
          Build a better resume with powerful features.
        </p>

        <div className="feature-container">
          <div className="feature-card">
            <h3>📝 Easy Resume Creation</h3>
            <p>Enter your details and create a professional resume.</p>
          </div>

          <div className="feature-card">
            <h3>🤖 AI Suggestions</h3>
            <p>Get intelligent suggestions to improve your resume.</p>
          </div>

          <div className="feature-card">
            <h3>📄 PDF Download</h3>
            <p>Download your completed resume as a PDF.</p>
          </div>
        </div>
      </section>

      {/* Builder Section */}
      <section id="builder">
  <ResumeForm />
</section>cd 

      {/* About Section */}
      <footer id="about">
        <h3>SmartResume AI</h3>
        <p>Build your future with a better resume.</p>
      </footer>

    </div>
  );
}

export default App;