import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";
import projImg1 from "../assets/img/project-img1.png";
import projImg2 from "../assets/img/project-img2.png";
import projImg3 from "../assets/img/project-img3.png";
import colorSharp2 from "../assets/img/color-sharp2.png";
import "animate.css";
import TrackVisibility from "react-on-screen";

export const Projects = () => {
  const projects = [
    {
      title: "Hybrid Machine Learning Model for Autism Prediction",
      description: "Hybrid ML Autism Detection",
      imgUrl: projImg3,
    },
    {
      title: "Attendance System Using Facial Recognition",
      description: "Facial Biometrics Attendance",
      imgUrl: projImg1,
    },
    {
      title: "Hospital Management System",
      description: "Smart System for Hospital Management",
      imgUrl: projImg2,
    },
  ];

  return (
    <section className="project" id="projects">
      <Container>
        <Row>
          <Col xs={12}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <h2>Bringing Ideas to Life: My Projects</h2>
                  <p>
                    From data-driven insights to AI-powered solutions, my work
                    blends creativity with technology. Here’s a showcase of my
                    passion in action.
                  </p>
                  <Row>
                    {projects.map((project, index) => (
                      <ProjectCard key={index} {...project} />
                    ))}
                  </Row>
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      <img className="background-image-right" src={colorSharp2} alt="Background Design" />
    </section>
  );
};
