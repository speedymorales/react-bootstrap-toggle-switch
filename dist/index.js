Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () {
                        return e[k];
                    }
                });
            }
        });
    }
    n['default'] = e;
    return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespace(React);

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var Bootstrap4Toggle = function (_a) {
    var checked = _a.checked, disabled = _a.disabled, onLabel = _a.onLabel, offLabel = _a.offLabel, onStyle = _a.onStyle, offStyle = _a.offStyle, size = _a.size, className = _a.className, tabIndex = _a.tabIndex, width = _a.width, height = _a.height, onChange = _a.onChange;
    var _b = React.useState({
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
    }), state = _b[0], setState = _b[1];
    React.useEffect(function () {
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
    var toggle = function () {
        if (state.disabled)
            return;
        setState(__assign(__assign({}, state), { checked: !state.checked }));
        if (onChange)
            onChange(!state.checked);
    };
    var onKeyPress = function (ev) {
        if (ev.key === " " || ev.key === "t") {
            toggle();
        }
    };
    var textHeight = 0;
    textHeight = state.size === "sm" ? 12 : textHeight;
    textHeight = state.size === "md" ? 15 : textHeight;
    textHeight = state.size === "lg" ? 18 : textHeight;
    var toggleStyle = {};
    if (state.width)
        toggleStyle.width = state.width + "px";
    if (state.height)
        toggleStyle.height = state.height + "px";
    var labelStyle = {};
    if (state.height)
        labelStyle.lineHeight = "calc(" + state.height + "px - " + textHeight + "px)";
    var sizeClass = state.size ? " btn-" + state.size : "";
    var checkedStyle = state.checked
        ? "on btn-" + state.onStyle
        : "off btn-" + state.offStyle;
    var extraClasses = state.className ? " " + state.className : "";
    var disabledClass = state.disabled ? " disabled" : "";
    return (React__namespace.createElement("div", { className: "btn toggle " + checkedStyle + sizeClass + extraClasses + disabledClass, "data-toggle": "toggle", tabIndex: !state.disabled ? state.tabIndex : undefined, style: toggleStyle, onClick: toggle, onKeyPress: onKeyPress },
        React__namespace.createElement("div", { className: "toggle-group" },
            React__namespace.createElement("label", { className: "toggle-on btn btn-" + state.onStyle + sizeClass, style: labelStyle }, state.onLabel),
            React__namespace.createElement("label", { className: "toggle-off active btn btn-" + state.offStyle + sizeClass, style: labelStyle }, state.offLabel),
            React__namespace.createElement("span", { className: "toggle-handle btn btn-default" + sizeClass }))));
};

exports.Bootstrap4Toggle = Bootstrap4Toggle;
//# sourceMappingURL=index.js.map
