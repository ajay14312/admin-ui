import React from "react";
import { mount } from "enzyme";

import UserRow from "./UserRow";

const userData = {
  id: "1",
  name: "Aaron Miles",
  email: "aaron@mailinator.com",
  role: "member",
  isSelected: false,
};

describe("UserRow", () => {
  let wrapper;
  it("UserRow renders correctly", () => {
    wrapper = mount(<UserRow userData={userData} />, {
      attachTo: document.createElement("tbody"),
    });
  });

  it("checkbox is initially unchecked", () => {
    expect(wrapper.find('input[type="checkbox"]').prop("checked")).toBe(false);
  });

  it("accepts row props", () => {
    expect(wrapper.props().userData).toEqual(userData);
  });
});
