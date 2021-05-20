import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import "./style.css";

type BootBtnType =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "light"
  | "dark";
interface Props {
  checked?: boolean;
  disabled?: boolean;
  onlabel?: string;
  offlabel?: string;
  onstyle?: BootBtnType;
  offstyle?: BootBtnType;
  size?: "lg" | "md" | "sm" | "xs";
  style?: string;
  width?: number;
  height?: number;
  onChange: (checked: boolean) => void;
}

interface InternalState {
  checked: boolean;
  disabled: boolean;
  onlabel: string;
  offlabel: string;
  onstyle: BootBtnType;
  offstyle: BootBtnType;
  size: "lg" | "md" | "sm" | "xs";
  style: string;
  width: number | null;
  height: number | null;
}

export const BootstrapToggle: React.FC<Props> = ({
  checked,
  disabled,
  onlabel,
  offlabel,
  onstyle,
  offstyle,
  size,
  style,
  width,
  height,
  onChange,
}: Props) => {
  const [state, setState] = useState<InternalState>({
    checked: !!checked,
    disabled: !!disabled,
    onlabel: onlabel || "On",
    offlabel: offlabel || "Off",
    onstyle: onstyle || "primary",
    offstyle: offstyle || "light",
    size: size || "md",
    style: style || "",
    width: width || null,
    height: height || null,
  });

  useEffect(() => {
    // TODO: ensure that any change in props is reflected in state.
    setState({
      checked: !!checked,
      disabled: !!disabled,
      onlabel: onlabel || "On",
      offlabel: offlabel || "Off",
      onstyle: onstyle || "primary",
      offstyle: offstyle || "light",
      size: size || "md",
      style: style || "",
      width: width || null,
      height: height || null,
    });
  }, [
    checked,
    disabled,
    onlabel,
    offlabel,
    onstyle,
    offstyle,
    size,
    style,
    width,
    height,
  ]);

  const toggle = useCallback(() => {
    if (state.disabled) return;
    if (state.checked) {
      setState({ ...state, checked: true });
      if (onChange) onChange(true);
    } else {
      setState({ ...state, checked: false });
      if (onChange) onChange(false);
    }
  }, [setState, onChange]);

  let switchStyle: any = {};
  if (state.width) switchStyle.width = state.width + "px";
  if (state.height) switchStyle.height = state.height + "px";

  let labelStyle: any = {};
  if (state.height)
    labelStyle.lineHeight = "calc(" + state.height + "px * 0.8)";

  return (
    <div
      className={
        "switch btn " +
        (state.checked
          ? "on btn-" + state.onstyle
          : "off btn-" + state.offstyle) +
        (state.size ? " btn-" + state.size : "") +
        (state.style ? " " + state.style : "")
      }
      style={switchStyle}
      onClick={toggle}
    >
      <div className="switch-group">
        <span
          className={
            "switch-on btn btn-" +
            state.onstyle +
            (state.size ? " btn-" + state.size : "")
          }
          style={labelStyle}
        >
          {state.onlabel}
        </span>
        <span
          className={
            "switch-off btn btn-" +
            state.offstyle +
            (state.size ? " btn-" + state.size : "")
          }
          style={labelStyle}
        >
          {state.offlabel}
        </span>
        <span
          className={
            "switch-handle btn btn-light" +
            (state.size ? "btn-" + state.size : "")
          }
        />
      </div>
    </div>
  );
};
