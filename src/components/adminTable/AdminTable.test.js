import React from "react";
import { mount } from "enzyme";

import AdminTable from "./AdminTable";

const data = [
  {
    id: "1",
    name: "Aaron Miles",
    email: "aaron@mailinator.com",
    role: "member",
    isSelected: false,
  },
  {
    id: "2",
    name: "Aishwarya Naik",
    email: "aishwarya@mailinator.com",
    role: "member",
    isSelected: false,
  },
  {
    id: "3",
    name: "Arvind Kumar",
    email: "arvind@mailinator.com",
    role: "admin",
    isSelected: false,
  },
];

describe("<AdminTable />", () => {
  let wrapper;
  it("AdminTable renders correctly", () => {
    wrapper = mount(<AdminTable paginatedUsers={data} />, {
      attachTo: document.createElement("div"),
    });
  });

  it("AdminTable should have 4 table rows", () => {
    expect(wrapper.find("tr").length).toBe(4);
  });

  it("AdminTable should have 1 table rows", () => {
    expect(Array.from(wrapper.find("tr")).length).toBe(4);
  });
});
