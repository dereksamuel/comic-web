import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import StarsComponent from "../components/StarsComponent.vue";

describe("Stars", () => {
  it("It should be rendered inside the component", () => {
    const stars = mount(StarsComponent);
    expect(stars.element.id).toEqual("stars");
  });

  it("It should be rendered five stars", () => {
    const stars = mount(StarsComponent);
    const starsCount = stars.element.querySelectorAll(".star--inactive").length;
    expect(starsCount).toEqual(5);
  });

  it("When a star is active it must was emitted", () => {
    const stars = mount(StarsComponent);
    stars.find("button").trigger("click");
    expect(stars.emitted()).toHaveProperty("selected");
  });
});
