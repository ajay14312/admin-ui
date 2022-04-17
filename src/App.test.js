import React from "react";
import { shallow } from "enzyme";

import App from "./App";

describe("App", () => {
  it("app should render", () => {
    shallow(<App />);
  });
});
