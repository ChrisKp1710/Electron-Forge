/* // src/components/Form/form.tsx
import React from "react";

const Form: React.FC = () => {
  return (
    <div>
      <h1>Form</h1>
    </div>
  );
};

export default Form;
 */

// src/components/Form/form.tsx
import React from "react";
import { Link } from "react-router-dom";

const Form: React.FC = () => {
  return (
    <div>
      <h1>Form Page</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Go to Home Page</Link>
          </li>
          <li>
            <Link to="/auth">Go to Auth Page</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Form;
