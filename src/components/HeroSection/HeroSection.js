import "./HeroSection.css";

import heroImage from './HeroSection_Front_Image.jpeg';


const HeroSection = () => (
    <div className="hero-section">
      <div className="text-content">
        <p className="project-type">Emory University</p>
        <h1 className="project-heading-1">PEDIATRIC AIRWAY</h1>
        <h1 className="project-heading-2">MANAGEMENT ASSISTANT</h1>
        <p className="project-description">Leading tool in evaluating AI's effectiveness in Pediatric Airway Management. 
                                            Our team transformed the Pediatric Airway training procedure 
                                            into a Chatbot that assists you instead.
        </p>
      </div>
      <div className="hero-image">
        {/* Place your SVG or image tag here */}
        <img src={heroImage} className = "hero-image" alt="Hero Image" />
        {/*./src/components/HeroSection/HeroSection_Front_Image.png*/}
      </div>
    </div>
  );

  export default HeroSection;