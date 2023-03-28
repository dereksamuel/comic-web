import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import ImageComponent from "../components/ImageComponent.vue";

describe("Image", () => {
  it("It should be rendered inside the component", () => {
    const image = mount(ImageComponent);
    expect(image.element.tagName).toEqual("IMG");
  });

  it("It should be render error picture when src attr is empty", async () => {
    const image = mount(ImageComponent);

    expect(image.element.src).toEqual("/src/assets/ErrorImage.png");
  });
});
