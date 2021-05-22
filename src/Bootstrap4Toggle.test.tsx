import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { Bootstrap4Toggle } from "./Bootstrap4Toggle";

describe("Bootstrap4Toggle", () => {
  test("should render toggle with defaults", () => {
    const { container } = render(<Bootstrap4Toggle />);

    const toggle = container.querySelector(".toggle");
    expect(toggle).toBeInTheDocument();
    expect(toggle).toHaveClass("btn");
    expect(toggle).toHaveClass("off");
    expect(toggle).toHaveClass("btn-md");
    expect(toggle).toHaveAttribute("tabindex", "0");

    const toggleGroup = toggle!.querySelector("div.toggle-group");
    expect(toggleGroup).toBeInTheDocument();

    const toggleOn = toggleGroup!.querySelector("label.toggle-on");
    expect(toggleOn).toHaveClass("btn-primary");
    expect(toggleOn).toHaveClass("btn-md");
    expect(toggleOn).toHaveClass("btn");
    expect(toggleOn).toHaveTextContent("On");

    const toggleOff = toggleGroup!.querySelector("label.toggle-off");
    expect(toggleOff).toHaveClass("btn-default");
    expect(toggleOff).toHaveClass("btn-md");
    expect(toggleOff).toHaveClass("btn");
    expect(toggleOff).toHaveClass("active");
    expect(toggleOff).toHaveTextContent("Off");

    const toggleHandle = toggleGroup!.querySelector(".toggle-handle");
    expect(toggleHandle).toHaveClass("btn-default");
    expect(toggleHandle).toHaveClass("btn-md");
    expect(toggleHandle).toHaveClass("btn");
  });

  test("should be on or off matching check property", () => {
    const { container: c1 } = render(<Bootstrap4Toggle checked={false} />);
    expect(c1.querySelector(".toggle")).toHaveClass("off");
    const { container: c2 } = render(<Bootstrap4Toggle checked={true} />);
    expect(c2.querySelector(".toggle")).toHaveClass("on");
  });

  test("should toggle checked value when clicked", () => {
    const onChange = jest.fn();
    const { container } = render(
      <Bootstrap4Toggle checked={false} onChange={onChange} />
    );
    expect(container.querySelector(".toggle")).toHaveClass("off");
    expect(onChange).not.toHaveBeenCalled();

    fireEvent.click(container.querySelector(".toggle")!);
    expect(container.querySelector(".toggle")).toHaveClass("on");
    expect(onChange).toHaveBeenCalled();
    expect(onChange.mock.calls[0][0]).toBe(true);

    fireEvent.click(container.querySelector(".toggle")!);
    expect(container.querySelector(".toggle")).toHaveClass("off");
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange.mock.calls[1][0]).toBe(false);
  });

  test("should toggle checked value when left and right keys are pressed on the keyboard", () => {
    const onChange = jest.fn();
    const { container } = render(
      <Bootstrap4Toggle checked={false} onChange={onChange} />
    );

    const toggle = container.querySelector(".toggle")!;
    fireEvent.keyDown(toggle, { key: "ArrowRight", code: "ArrowRight" });
    expect(onChange).toHaveBeenCalled();
    expect(onChange.mock.calls[0][0]).toBe(true);
    onChange.mockClear();

    fireEvent.keyDown(toggle, { key: "ArrowRight", code: "ArrowRight" });
    expect(onChange).not.toHaveBeenCalled();
    onChange.mockClear();

    fireEvent.keyDown(toggle, { key: "ArrowLeft", code: "ArrowLeft" });
    expect(onChange).toHaveBeenCalled();
    expect(onChange.mock.calls[0][0]).toBe(false);
    onChange.mockClear();

    fireEvent.keyDown(toggle, { key: "ArrowLeft", code: "ArrowLeft" });
    expect(onChange).not.toHaveBeenCalled();
  });

  test("should toggle checked value when space or t keys are pressed on the keyboard", () => {
    const onChange = jest.fn();
    const { container } = render(
      <Bootstrap4Toggle checked={false} onChange={onChange} />
    );

    const toggle = container.querySelector(".toggle")!;
    fireEvent.keyDown(toggle, { key: " ", code: "Space" });
    expect(onChange).toHaveBeenCalled();
    expect(onChange.mock.calls[0][0]).toBe(true);
    onChange.mockClear();

    fireEvent.keyDown(toggle, { key: " ", code: "Space" });
    expect(onChange).toHaveBeenCalled();
    expect(onChange.mock.calls[0][0]).toBe(false);
    onChange.mockClear();

    fireEvent.keyDown(toggle, { key: "t", code: "KeyT" });
    expect(onChange).toHaveBeenCalled();
    expect(onChange.mock.calls[0][0]).toBe(true);
    onChange.mockClear();

    fireEvent.keyDown(toggle, { key: "t", code: "KeyT" });
    expect(onChange).toHaveBeenCalled();
    expect(onChange.mock.calls[0][0]).toBe(false);
    onChange.mockClear();
  });

  test("should be disabled matching disabled property", () => {
    const onChange = jest.fn();
    const { container: c1 } = render(
      <Bootstrap4Toggle disabled={true} onChange={onChange} />
    );
    fireEvent.click(c1.querySelector(".toggle")!);
    expect(c1.querySelector(".toggle")).toHaveClass("off");
    expect(c1.querySelector(".toggle")).toHaveClass("disabled");
    expect(onChange).not.toHaveBeenCalled();

    const { container: c2 } = render(
      <Bootstrap4Toggle disabled={false} onChange={onChange} />
    );
    expect(c2.querySelector(".toggle")).not.toHaveClass("disabled");
    fireEvent.click(c2.querySelector(".toggle")!);
    expect(c2.querySelector(".toggle")).toHaveClass("on");
    expect(onChange).toHaveBeenCalled();
  });

  test("should render different button sizes", () => {
    const { container: smc } = render(<Bootstrap4Toggle size="sm" />);
    expect(smc.querySelector(".toggle")).toHaveClass("btn-sm");
    expect(smc.querySelector(".toggle-on")).toHaveClass("btn-sm");
    expect(smc.querySelector(".toggle-off")).toHaveClass("btn-sm");
    expect(smc.querySelector(".toggle-handle")).toHaveClass("btn-sm");

    const { container: mdc } = render(<Bootstrap4Toggle size="md" />);
    expect(mdc.querySelector(".toggle")).toHaveClass("btn-md");
    expect(mdc.querySelector(".toggle-on")).toHaveClass("btn-md");
    expect(mdc.querySelector(".toggle-off")).toHaveClass("btn-md");
    expect(mdc.querySelector(".toggle-handle")).toHaveClass("btn-md");

    const { container: lgc } = render(<Bootstrap4Toggle size="lg" />);
    expect(lgc.querySelector(".toggle")).toHaveClass("btn-lg");
    expect(lgc.querySelector(".toggle-on")).toHaveClass("btn-lg");
    expect(lgc.querySelector(".toggle-off")).toHaveClass("btn-lg");
    expect(lgc.querySelector(".toggle-handle")).toHaveClass("btn-lg");
  });

  test("should render toggle with height as inline styles", () => {
    const { container } = render(<Bootstrap4Toggle height={50} />);
    expect(container.querySelector(".toggle")).toHaveStyle({ height: "50px" });
    expect(container.querySelector(".toggle-on,.toggle-off")).toHaveStyle({
      "line-height": "calc(50px - 15px)",
    });
  });

  test("should render toggle with width as inline styles", () => {
    const { container } = render(<Bootstrap4Toggle width={100} />);
    expect(container.querySelector(".toggle")).toHaveStyle({ width: "100px" });
  });

  test("should render toggle with provided classess", () => {
    const { container } = render(
      <Bootstrap4Toggle className="myclass1 myclass2" />
    );
    const toggle = container.querySelector(".toggle")!;
    expect(toggle).toHaveClass("myclass1");
    expect(toggle).toHaveClass("myclass2");
  });

  test("should render toggle with provided bootstrap button color-style", () => {
    const { container } = render(
      <Bootstrap4Toggle checked={false} onStyle="secondary" offStyle="dark" />
    );
    const toggle = container.querySelector(".toggle")!;
    expect(toggle).toHaveClass("btn-dark");

    expect(toggle.querySelector(".toggle-on")).toHaveClass("btn-secondary");
    expect(toggle.querySelector(".toggle-off")).toHaveClass("btn-dark");

    fireEvent.click(toggle);

    expect(toggle).toHaveClass("btn-secondary");
  });

  test("should set the tab index for the toggle when user provides it", () => {
    const { container } = render(<Bootstrap4Toggle tabIndex={5} />);
    expect(container.querySelector(".toggle")).toHaveAttribute("tabindex", "5");
  });

  test("should set on and off label when provided", () => {
    const { container } = render(
      <Bootstrap4Toggle onLabel="Enabled" offLabel="Disabled" />
    );
    expect(container.querySelector("label.toggle-on")).toHaveTextContent(
      "Enabled"
    );
    expect(container.querySelector("label.toggle-off")).toHaveTextContent(
      "Disabled"
    );
  });
});
