import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

export default function Shelters() {
  const shelters = [
    {
      name: "Nova Scotia SPCA – Halifax",
      location: "Halifax, NS",
      description:
        "A trusted local shelter helping cats, dogs, and other companion animals find safe, loving homes.",
      url: "https://www.novascotiaspca.ca/",
      buttonText: "Visit Halifax SPCA"
    },
    {
      name: "Nova Scotia SPCA – Dartmouth",
      location: "Dartmouth, NS",
      description:
        "Support and adoption services for animals in the Dartmouth area, including companion animal care and rehoming.",
      url: "https://www.novascotiaspca.ca/",
      buttonText: "Visit Dartmouth SPCA"
    },
    {
      name: "Bide Awhile Animal Shelter",
      location: "Dartmouth, NS",
      description:
        "A well-known no-kill shelter focused on finding homes for cats and dogs while supporting animal welfare in the community.",
      url: "https://bideawhile.org/",
      buttonText: "Visit Bide Awhile"
    }
  ];

  const otherResources = [
    {
      name: "Hope for Wildlife",
      location: "Seaforth, NS",
      description:
        "A respected wildlife rehabilitation organization offering help, education, and resources for injured and orphaned wild animals.",
      url: "https://www.hopeforwildlife.net/",
      buttonText: "Visit Hope for Wildlife"
    }
  ];

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold mb-3">Local Shelters & Resources</h1>
        <p className="lead text-muted mx-auto" style={{ maxWidth: "750px" }}>
          Looking for more places to adopt or learn about animal care in Nova Scotia?
          Here are some trusted local shelters and wildlife resources.
        </p>
      </div>

      <h2 className="h4 fw-semibold mb-4">Adoption Shelters</h2>

      <div className="row g-4 mb-5">
        {shelters.map((shelter) => (
          <div className="col-12 col-md-6 col-lg-4" key={shelter.name}>
            <div className="card h-100 shadow-sm border-0 rounded-4">
              <div className="card-body d-flex flex-column p-4">
                <h3 className="h5 fw-bold mb-2">{shelter.name}</h3>
                <p className="text-primary fw-semibold mb-2">{shelter.location}</p>
                <p className="text-muted mb-4">{shelter.description}</p>

                <a
                  href={shelter.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary mt-auto"
                >
                  {shelter.buttonText}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2 className="h4 fw-semibold mb-4">Other Animal Help</h2>

      <div className="row g-4">
        {otherResources.map((resource) => (
          <div className="col-12 col-lg-6" key={resource.name}>
            <div className="card h-100 shadow-sm border-0 rounded-4 bg-light">
              <div className="card-body d-flex flex-column p-4">
                <h3 className="h5 fw-bold mb-2">{resource.name}</h3>
                <p className="text-success fw-semibold mb-2">{resource.location}</p>
                <p className="text-muted mb-4">{resource.description}</p>

                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-success mt-auto"
                >
                  {resource.buttonText}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}