// ProductPage.js

import React from 'react';
import { useState } from 'react';
import './ProductPage.css';
import gq_image from './gq-image.png'
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
    transform: 'translate(-50%, -50%) translateX(-320px)',
  };
  
  return (
    <div className="product-page-container">
      <h1 className="guiding-questions-heading">Guiding Questions</h1>

      <section className="guiding-questions">
        <div className="guiding-questions-parent-container" style={{ height: containerHeightGQ }}>
        <div 
          className={`guiding-questions-image ${animateGQImage ? 'animate-image' : ''}`}
          onClick={() => setAnimateGQImage(true)}
        >
            <img 
              id="gq-image" 
              src={gq_image}
              className="gq-image"
              alt="gq-image"
            />
          </div>
          <div className={`guiding-questions-text ${animateGQImage ? 'animate-image' : ''}`} ref={refGQ}
          >
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
    

      <section className="rapid-cycle">
      <h1 className="rapid-cycle-heading">Rapid Cycle</h1>
      <div className="rapid-cycle-parent-container" style={{ height: containerHeightRC }}>
        <div 
          className={`rapid-cycle-image ${animateRCImage ? 'animate-image' : ''}`}
          onClick={() => setAnimateRCImage(true)}
        >
            <img 
              id="rc-image" 
              src=""
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
      
      <section className="chat-gpt-role">
        <h1 className="chat-gpt-role-heading">ChatGPT Role</h1>
        <div className="chat-gpt-role-parent-container" style={{ height: containerHeightCG }}>
          <div 
            className={`chat-gpt-role-image ${animateCGImage ? 'animate-image' : ''}`}
            onClick={() => setAnimateCGImage(true)}
          >
              <img 
                id="cgr-image" 
                src=""
                className="cgr-image"
                alt="cgr-image"
              />
            </div>
            <div className={`chat-gpt-role-text ${animateCGImage ? 'animate-image' : ''}`} ref={refCG}
            >
              <p>An artifical intelligence (AI) chatbot</p>
              <p>Medical trainees desire AI to be integrated into the curriculum</p>
              <p>ChatGPT can be effectively used to train physicans, including how to deliver bad news</p>
              <p>Limited empirical studies on impacts of generative AI on medical education</p>
              <p>A systematic review article identified features of simulation that lead to effective learning</p>
              <div className="chat-gpt-role-fading-effect"></div>
            </div>
          </div>
      </section>
      
      <section className="checklists">
        <h1 className="checklists-heading">Pediatric Airway Management Assessment Tools/Checklists</h1>
        <div className="checklists-parent-container" style={{ height: containerHeightCL }}>
          <div 
            className={`checklists-image ${animateCLImage ? 'animate-image' : ''}`}
            onClick={() => setAnimateCLImage(true)}
          >
              <img 
                id="cl-image" 
                src=""
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
      
      <section className="primary-objective">
        <h1 className="primary-objective-heading">Primary Objective</h1>
        <div className="primary-objective-parent-container" style={{ height: containerHeightPO }}>
          <div 
            className={`primary-objective-image ${animatePOImage ? 'animate-image' : ''}`}
            onClick={() => setAnimatePOImage(true)}
          >
              <img 
                id="po-image" 
                src=""
                className="po-image"
                alt="po-image"
              />
            </div>
            <div className={`primary-objective-text ${animatePOImage ? 'animate-image' : ''}`} ref={refPO}
            >
              <p>To determine if ChatGPT is equivalent to human simulation and debriefing with Rapid cycle Deliberate Practice (RCDP)</p>
              <div className="primary-objective-fading-effect"></div>
            </div>
          </div>
      </section>
      
      <section className="methods">
      <h1 className="methods-heading">Methods:</h1>
        <div className="methods-parent-container" style={{ height: containerHeightMO }}>
          <div 
            className={`methods-image ${animateMOImage ? 'animate-image' : ''}`}
            onClick={() => setAnimateMOImage(true)}
          >
              <img 
                id="mo-image" 
                src=""
                className="mo-image"
                alt="mo-image"
              />
            </div>
            <div className={`methods-text ${animateMOImage ? 'animate-image' : ''}`} ref={refMO}
            >
              <div className="study-population">
                <h4>Study Population & Setting</h4>
                <p>Pediatric Residents, Inpatient Rotation at Hughes Spalding (Morehouse and Emory).</p>
              </div>
              <div className="assessment">
                <h4>Pre-Assessment</h4>
                <p>Baseline Airway Simulation - Airway Checklist.</p>
              </div>
              <div className="intervention">
                <h4>Intervention</h4>
                <p>The study includes two arms: the Chat GPT Interactive Module and the Airway Simulation with RCDP Debriefing.</p>
              </div>
              <div className="post-intervention">
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