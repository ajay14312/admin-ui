import React from "react";
import { shallow, mount } from "enzyme";
import { act } from "react-dom/test-utils";

import AdminScreen from "./AdminScreen";

const usersData = [
  {
    id: "1",
    name: "Aaron Miles",
    email: "aaron@mailinator.com",
    role: "member",
  },
  {
    id: "2",
    name: "Aishwarya Naik",
    email: "aishwarya@mailinator.com",
    role: "member",
  },
  {
    id: "3",
    name: "Arvind Kumar",
    email: "arvind@mailinator.com",
    role: "admin",
  },
];

describe("<AdminScreen />", () => {
  let wrapper;
  let useEffect;

  const mockUseEffect = () => {
    useEffect.mockImplementationOnce((f) => f());
  };

  beforeEach(() => {
    fetch.resetMocks();
    useEffect = jest.spyOn(React, "useEffect");
    mockUseEffect();
    mockUseEffect();

    wrapper = shallow(<AdminScreen />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("AdminScreen should render", () => {
    shallow(<AdminScreen />);
  });

  it("search value should be empty initially", () => {
    expect(wrapper.find('input[name="search"]').prop("value")).toBe("");
  });

  it("search value value should update on entering text", () => {
    wrapper.find('input[name="search"]').simulate("change", {
      target: {
        value: "aaron",
      },
    });
    expect(wrapper.find('input[name="search"]').prop("value")).toBe("aaron");
  });

  it("API should trigger", async () => {
    await act(async () => {
      await fetch.mockImplementationOnce(() => Promise.resolve(usersData));
      wrapper = mount(<AdminScreen />);
    });

    await expect(fetch).toHaveBeenCalledWith(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    );

    await expect(fetch).toHaveBeenCalledTimes(1);
  });
});
