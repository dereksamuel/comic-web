import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import ButtonComponent from "../components/ButtonComponent.vue";

describe("Button", () => {
  it("It should be rendered inside the component", () => {
    const button = mount(ButtonComponent);
    expect(button.element.tagName).toEqual("BUTTON");
  });

  it("It should has a slot error when it has not slot and both", () => {
    const button = mount(ButtonComponent);
    expect(button.text()).toContain("No hay contenido");

    const button2 = mount(ButtonComponent, {
      slots: {
        default: "Hello",
      },
    });
    expect(button2.text()).not.toContain("No hay contenido");
  });
});
