// ProductPage.js

import React from 'react';
import { useState } from 'react';
import './ProductPage.css';
import gq_image from './img1.png';
import rc_image from './img1.png';
import cg_image from './img1.png';
import cl_image from './img1.png';
import po_image from './img1.png';
import mo_image from './img1.png';
import {  useRef, useEffect } from 'react';


const ProductPage = () => {
  const [animateGQImage, setAnimateGQImage] = useState(false);
  const [animateRCImage, setAnimateRCImage] = useState(false);
  const [animateCGImage, setAnimateCGImage] = useState(false);
  const [animateCLImage, setAnimateCLImage] = useState(false);
  const [animatePOImage, setAnimatePOImage] = useState(false);
  const [animateMOImage, setAnimateMOImage] = useState(false);

  const [containerHeightGQ, setContainerHeightGQ] = useState('auto');
  const refGQ = useRef(null);

  const [containerHeightRC, setContainerHeightRC] = useState('auto');
  const refRC = useRef(null);

  const [containerHeightCG, setContainerHeightCG] = useState('auto');
  const refCG = useRef(null);
  
  const [containerHeightCL, setContainerHeightCL] = useState('auto');
  const refCL = useRef(null);

  const [containerHeightPO, setContainerHeightPO] = useState('auto');
  const refPO = useRef(null);

  const [containerHeightMO, setContainerHeightMO] = useState('auto');
  const refMO = useRef(null);


  useEffect(() => {
    if (refGQ.current) {
      setContainerHeightGQ(`${refGQ.current.scrollHeight}px`);
    }
    if (refRC.current) {
      setContainerHeightRC(`${refRC.current.scrollHeight}px`);
    }
    if (refCG.current) {
      setContainerHeightCG(`${refCG.current.scrollHeight}px`);
    }
    if (refCL.current) {
      setContainerHeightCL(`${refCL.current.scrollHeight}px`);
    }
    if (refPO.current) {
      setContainerHeightPO(`${refPO.current.scrollHeight}px`);
    }
    if (refMO.current) {
      setContainerHeightMO(`${refMO.current.scrollHeight}px`);
    }
    // You can add more refs and state updates for additional sections.
  }, [animateGQImage, animateRCImage, animateCGImage, animateCLImage, animatePOImage, animateMOImage]);


  const toggleGQAnimation = () => {
    setAnimateGQImage(true);  
  };

  const toggleRCAnimation = () => {
    setAnimateRCImage(true);
  };

  const toggleCGAnimation = () => {
    setAnimateCGImage(true);
  };

  const toggleCLAnimation = () => {
    setAnimateCLImage(true);
  }

  const togglePOAnimation = () => {
    setAnimatePOImage(true);
  }

  const toggleMOAnimation = () => {
    setAnimateMOImage(true);
  }

  const initialImageStyle = {
    transform: 'translate(-50%, -50%) translateX(-250px)',
  };
  
  return (
    <div className="product-page-container">
      <h1 className="guiding-questions-heading">Guiding Questions</h1>
      <section className="guiding-questions">
        <div className="guiding-questions-parent-container" style={{ height: containerHeightGQ }}>
        <div 
          className={`guiding-questions-image ${animateGQImage ? 'animate-image' : ''}`}
          onClick={() => setAnimateGQImage(true)} //THIS IS KEY LINE !!!!!!!!!!*********
          style={!animateGQImage ? initialImageStyle : {}}
        >
            <img 
              id="gq-image" 
              src={gq_image}
              className="gq-image"
              alt="gq-image"
            />
          </div>
          <div className={`guiding-questions-text ${animateGQImage ? 'animate-image' : ''}`} ref={refGQ}
          ><p> </p>
            <p>How can we improve basic airway management skills of residents using simulation?</p>
            <p>Are there other effective methods equivalent to Rapid Cycle Deliberate Practice 
              (RCDP) that could be utilized, particularly when time and resources are a limiting 
              factor?
            </p>
            <p>What valid measures can be used to assess airway skills to determine if the intervention is effective?
            </p>
            <div className="guiding-questions-fading-effect"></div>
          </div>
          
        </div>
      </section>
      
    

      
      <h1 className="rapid-cycle-heading">Rapid Cycle</h1>
      <section className="rapid-cycle">
      <div className="rapid-cycle-parent-container" style={{ height: containerHeightRC }}>
        <div 
          className={`rapid-cycle-image ${animateRCImage ? 'animate-image' : ''}`}
          onClick={() => setAnimateRCImage(true)}
          style={!animateGQImage ? initialImageStyle : {}}
        >
            <img 
              id="rc-image" 
              src={rc_image}
              className="rc-image"
              alt="rc-image"
            />
          </div>
          <div className={`rapid-cycle-text ${animateRCImage ? 'animate-image' : ''}`} ref={refRC}
          >
            <p>Prior randomized controlled study compared RCDP vs. traditional feedback for airwaymanagement skills in pediatrics
            </p>
            <p>Suggested RCDP is an effective method for simulation debriefing with procedural skills in pediatrics </p>
            <div className="rapid-cycle-fading-effect"></div>
          </div>
          
        </div>
        </section>
        
     
      
      
        <h1 className="chat-gpt-role-heading">Chat Bot Interface for Pediatric Airway Emergencies Training</h1>
        <section className="chat-gpt-role">
        <div className="chat-gpt-role-parent-container" style={{ height: containerHeightCG }}>
          <div 
            className={`chat-gpt-role-image ${animateCGImage ? 'animate-image' : ''}`}
            onClick={() => setAnimateCGImage(true)}
            style={!animateGQImage ? initialImageStyle : {}}
          >
              <img 
                id="cgr-image" 
                src={cg_image}
                className="cgr-image"
                alt="cgr-image"
              />
            </div>
            <div className={`chat-gpt-role-text ${animateCGImage ? 'animate-image' : ''}`} ref={refCG}
            >
              <h3>Our chat bot interface integrates a tailored version of the GPT model specifically designed for hospital residents. This cutting-edge tool offers:</h3>
              <div className="content-box">
              <p>Realistic Simulations: Engage in high-fidelity simulations of pediatric airway emergencies to hone your response skills in critical situations.</p>
              <p>Guided Decision-Making: Utilize structured checklists and procedures that guide you through the steps necessary to stabilize and save young patients.</p>
              <p>Skill Enhancement: Improve your clinical decision-making capabilities within a controlled, educational environment, preparing you for real-life medical challenges.</p>
              </div>
              <h3>Data Collection Assistant</h3>
              <div className="content-box">
              <p>This feature empowers administrative users to continuously refine the training model by inputting new and emergent pediatric cases into our database:</p>
              <p>Continuous Model Improvement: Regular updates with new case data ensure the GPT model remains at the forefront of medical training technology.</p>
              <p>Adaptability to Medical Trends: By incorporating the latest in pediatric emergency care, the model increases in accuracy and relevance, providing residents with up-to-date training scenarios.</p>
              </div>
              <h3>Chat History Access</h3>
              <div className="content-box">
              <p>Our chat history access feature is an essential tool for training oversight and quality control, designed specifically for administrative users:</p>
              <p>Detailed Review Capabilities: Easily access and review past interactions based on specific dates to monitor training engagement and protocol adherence.</p>
              <p>Training Effectiveness Assessment: Evaluate the effectiveness of the simulation training, identify areas for improvement, and gather insights into how residents apply their skills in simulated settings.</p>
              </div>
              <div className="chat-gpt-role-fading-effect"></div>
            </div>
          </div>
      </section>
      
      
        <h1 className="checklists-heading">Pediatric Airway Management Assessment Tools/Checklists</h1>
        <section className="checklists">
        <div className="checklists-parent-container" style={{ height: containerHeightCL }}>
          <div 
            className={`checklists-image ${animateCLImage ? 'animate-image' : ''}`}
            onClick={() => setAnimateCLImage(true)}
            style={!animateGQImage ? initialImageStyle : {}}
          >
              <img 
                id="cl-image" 
                src={cl_image}
                className="cl-image"
                alt="cl-image"
              />
            </div>
            <div className={`checklists-text ${animateCLImage ? 'animate-image' : ''}`} ref={refCL}
            >
              <h2>Prior studieshave developed airway assessment checklists for airway management in pediatrics</h2>
              <h3>(1) Management of the airway (BMV-1 to BMV-7)</h3>
              <h3>(2) Choice of the ventilation equipment (BMV-8 to BMV-10)</h3>
              <h3>(3) Positioing of the mask (BMV-11 to BMV-15)</h3>
              <h3>(4) Ventilaion Techniques (BMV-16 to BMV20)</h3>
              <div className="checklists-fading-effect"></div>
            </div>
          </div>
      </section>
      
      
        <h1 className="primary-objective-heading">Primary Objective</h1>
        <section className="primary-objective">
        <div className="primary-objective-parent-container" style={{ height: containerHeightPO }}>
          <div 
            className={`primary-objective-image ${animatePOImage ? 'animate-image' : ''}`}
            onClick={() => setAnimatePOImage(true)}
            style={!animateGQImage ? initialImageStyle : {}}
          >
              <img 
                id="po-image" 
                src={po_image}
                className="po-image"
                alt="po-image"
              />
            </div>
            <div className={`primary-objective-text ${animatePOImage ? 'animate-image' : ''}`} ref={refPO}
            >
              <p>To determine if ChatGPT is equivalent to human simulation and debriefing with Rapid cycle Deliberate Practice (RCDP)</p>
              <p>By doing so, we are able to significantly reduce the training time and the resources spent on training; and even if it does not come out to be as robust as expected, it can still serve as a great supporting resource</p>
              <div className="primary-objective-fading-effect"></div>
            </div>
          </div>
      </section>
      
      
      <h1 className="methods-heading">Methods:</h1>
      <section className="methods">
        <div className="methods-parent-container" style={{ height: containerHeightMO }}>
          <div 
            className={`methods-image ${animateMOImage ? 'animate-image' : ''}`}
            onClick={() => setAnimateMOImage(true)}
            style={!animateGQImage ? initialImageStyle : {}}
          >
              <img 
                id="mo-image" 
                src={mo_image}
                className="mo-image"
                alt="mo-image"
              />
            </div>
            <div className={`methods-text ${animateMOImage ? 'animate-image' : ''}`} ref={refMO}>
            <div className="content-box">
              <h4>Study Population & Setting</h4>
              <p>Pediatric Residents, Inpatient Rotation at Hughes Spalding (Morehouse and Emory).</p>
            </div>
            <div className="content-box">
              <h4>Pre-Assessment</h4>
              <p>Baseline Airway Simulation - Airway Checklist.</p>
            </div>
            <div className="content-box">
              <h4>Intervention</h4>
              <p>The study includes two arms: the Chat GPT Interactive Module and the Airway Simulation with RCDP Debriefing.</p>
            </div>
            <div className="content-box">
              <h4>Post-Intervention</h4>
              <p>Final Airway Simulation - Airway Checklist. The outcomes of both interventions are compared to measure effectiveness.</p>
            </div>
                <div className="methods-fading-effect"></div>
            </div>
            </div>
        
      </section>

      <style jsx global>{`
        .about-page-container {
          max-width: 800px;
          margin: auto;
          padding: 20px;
          background-color: white;
        }
        section {
          margin-bottom: 20px;
        }
        h3 {
          color: #0056b3;
        }
        .study-population, .assessment, .intervention, .post-intervention {
          background-color: #e6f7ff;
          padding: 10px;
          border-radius: 5px;
          margin-top: 10px;
        }
      `}</style>
    </div>
    
  );
};

export default ProductPage;