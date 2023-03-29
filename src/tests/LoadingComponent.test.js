import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import LoadingComponent from "../components/LoadingComponent.vue";

describe("Loading", () => {
  it("It should be rendered inside the component", () => {
    const loading = mount(LoadingComponent);
    expect(loading.element.id).toEqual("loading");
  });
});
