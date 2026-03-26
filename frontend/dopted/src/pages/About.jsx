export default function About() {
  return (
    <div className="container py-5">
      <div className="row align-items-center g-5 mb-5">
        <div className="col-12 col-lg-6">
          <h1 className="display-5 fw-bold mb-4">About Dopted</h1>

          <p className="lead text-muted mb-4">
            Dopted is a platform built to help connect people with pets in need
            of loving homes. Our goal is to make the adoption journey feel more
            welcoming, clear, and accessible for both future pet owners and the
            organizations that care for these animals.
          </p>

          <p className="text-muted mb-0">
            Whether someone is searching for a new companion, learning more
            about adoption, or exploring local shelters and resources, Dopted is
            here to make that process easier and more supportive.
          </p>
        </div>

        <div className="col-12 col-lg-6">
          <img
            src="/cat.jpg"
            alt="Cat and owner high five"
            className="img-fluid rounded-4 shadow"
            style={{ maxHeight: "450px", width: "100%", objectFit: "cover" }}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="bg-white bg-opacity-75 rounded-4 shadow-sm p-4 p-md-5">
            <h2 className="h2 fw-bold mb-3">Our Mission</h2>
            <p className="text-muted mb-0">
              Our mission is to connect loving families with pets who need a
              safe, permanent home. We want to support adoption, highlight local
              shelters and animal resources, and help create a community where
              more animals are seen, supported, and adopted.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}