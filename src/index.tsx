import * as React from "react";
import { useEffect, useState } from "react";
import "./styles.css";

type ToggleButtonType =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "light"
  | "dark"
  | "default";
interface Props {
  checked?: boolean;
  disabled?: boolean;
  onLabel?: string;
  offLabel?: string;
  onStyle?: ToggleButtonType;
  offStyle?: ToggleButtonType;
  size?: "lg" | "md" | "sm" | "xs";
  className?: string;
  tabIndex?: number;
  width?: number;
  height?: number;
  onChange?: (checked: boolean) => void;
}

interface InternalState {
  checked: boolean;
  disabled: boolean;
  onLabel: string;
  offLabel: string;
  onStyle: ToggleButtonType;
  offStyle: ToggleButtonType;
  size: "lg" | "md" | "sm" | "xs";
  className: string;
  tabIndex: number;
  width: number | null;
  height: number | null;
}

export const Bootstrap4Toggle: React.FC<Props> = ({
  checked,
  disabled,
  onLabel,
  offLabel,
  onStyle,
  offStyle,
  size,
  className,
  tabIndex,
  width,
  height,
  onChange,
}: Props) => {
  const [state, setState] = useState<InternalState>({
    checked: !!checked,
    disabled: !!disabled,
    onLabel: onLabel || "On",
    offLabel: offLabel || "Off",
    onStyle: onStyle || "primary",
    offStyle: offStyle || "default",
    size: size || "md",
    className: className || "",
    tabIndex: tabIndex ? tabIndex : 0,
    width: width || null,
    height: height || null,
  });

  useEffect(() => {
    setState({
      checked: !!checked,
      disabled: !!disabled,
      onLabel: onLabel || "On",
      offLabel: offLabel || "Off",
      onStyle: onStyle || "primary",
      offStyle: offStyle || "default",
      size: size || "md",
      className: className || "",
      tabIndex: tabIndex ? tabIndex : 0,
      width: width || null,
      height: height || null,
    });
  }, [
    checked,
    disabled,
    onLabel,
    offLabel,
    onStyle,
    offStyle,
    size,
    className,
    tabIndex,
    width,
    height,
  ]);

  const changeState = (checked: boolean) => {
    setState({ ...state, checked });
    if (onChange) onChange(checked);
  };

  const toggle = () => {
    if (state.disabled) return;
    changeState(!state.checked);
  };

  const onKeyDown = (ev: React.KeyboardEvent<HTMLDivElement>) => {
    if (ev.key === " " || ev.key === "t") {
      ev.preventDefault();
      toggle();
    }
    if (ev.key === "ArrowLeft" && state.checked) {
      ev.preventDefault();
      changeState(!state.checked);
    }
    if (ev.key === "ArrowRight" && !state.checked) {
      ev.preventDefault();
      changeState(!state.checked);
    }
  };

  let textHeight: number = 0;
  textHeight = state.size === "sm" ? 12 : textHeight;
  textHeight = state.size === "md" ? 15 : textHeight;
  textHeight = state.size === "lg" ? 18 : textHeight;

  let toggleStyle: any = {};
  if (state.width) toggleStyle.width = state.width + "px";
  if (state.height) toggleStyle.height = state.height + "px";

  let labelStyle: any = {};
  if (state.height)
    labelStyle.lineHeight = `calc(${state.height}px - ${textHeight}px)`;

  const sizeClass = state.size ? ` btn-${state.size}` : "";
  const checkedStyle = state.checked
    ? `on btn-${state.onStyle}`
    : `off btn-${state.offStyle}`;
  const extraClasses = state.className ? ` ${state.className}` : "";
  const disabledClass = state.disabled ? " disabled" : "";
  return (
    <div
      className={`btn toggle ${checkedStyle}${sizeClass}${extraClasses}${disabledClass}`}
      data-toggle="toggle"
      tabIndex={!state.disabled ? state.tabIndex : undefined}
      style={toggleStyle}
      onClick={toggle}
      onKeyDown={onKeyDown}
    >
      <div className="toggle-group">
        <label
          className={`toggle-on btn btn-${state.onStyle}${sizeClass}`}
          style={labelStyle}
        >
          {state.onLabel}
        </label>
        <label
          className={`toggle-off active btn btn-${state.offStyle}${sizeClass}`}
          style={labelStyle}
        >
          {state.offLabel}
        </label>
        <span className={`toggle-handle btn btn-default${sizeClass}`} />
      </div>
    </div>
  );
};
