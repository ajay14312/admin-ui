import React from "react";
import { mount } from "enzyme";

import Pagination from "./Pagination";

describe("Pagination", () => {
  let wrapper;
  it("Pagination renders correctly", () => {
    wrapper = mount(<Pagination selectedPage={1} totalPages={5} />, {
      attachTo: document.createElement("div"),
    });
  });

  it("Pagination has divs", () => {
    expect(wrapper.props().selectedPage).toBe(1);
  });
});
