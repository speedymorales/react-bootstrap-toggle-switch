import * as React from "react";
import "./styles.css";
declare type ToggleButtonType = "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark" | "default";
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
export declare const Bootstrap4Toggle: React.FC<Props>;
export {};
