"use client";

import { useEffect } from "react";

const LinkedInBadge = () => {
  useEffect(() => {
    // Dynamically load the LinkedIn script
    const script = document.createElement("script");
    script.src = "https://platform.linkedin.com/badges/js/profile.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="fixed-badge">
      <div
        className="badge-base LI-profile-badge"
        data-locale="en_US"
        data-size="medium"
        data-theme="light"
        data-type="VERTICAL"
        data-vanity="er-rahul-chauhan"
        data-version="v1"
      >
        <a
          className="badge-base__link LI-simple-link"
          href="https://in.linkedin.com/in/er-rahul-chauhan?trk=profile-badge"
        >
          Rahul Chauhan
        </a>
      </div>
    </div>
  );
};

export default LinkedInBadge;
