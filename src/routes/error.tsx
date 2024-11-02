import React from "react";
import { Link } from "wouter";

export const ErrorRoute: React.FC = () => {
  return (
    <main>
      <section>
        <h2>404</h2>
        <article>
          <p>
            Something went wrong... <Link href="/">Go home</Link>.
          </p>
        </article>
      </section>
    </main>
  );
};
