import React from "react";
import { Outlet } from "react-router-dom";

import { ProfilePicture } from "../components/profile-picture/ProfilePicture";

export const Root: React.FC = () => (
  <>
    <ProfilePicture />
    <section>
      <h1>Sk</h1>
      <p>
        Booking: <a href="mailto:rain@synth.kitchen">rain@synth.kitchen</a>
      </p>
    </section>
    <Outlet />
  </>
);
