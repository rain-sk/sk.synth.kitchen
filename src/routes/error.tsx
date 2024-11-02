import React from "react";
import { useRouteError } from "react-router-dom";
import { ParallaxBackground } from "../components/parallax-background/ParallaxBackground";
import { Header } from "../components/header/Header";
import { Link } from "react-router-dom";

export const ErrorRoute: React.FC = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <>
      <ParallaxBackground />
      <Header />
      <main>
        <section>
          <h2>404</h2>
          <article>
            <p>
              Something went wrong... <Link to="/">Go home</Link>.
            </p>
          </article>
        </section>
      </main>
    </>
  );
};
