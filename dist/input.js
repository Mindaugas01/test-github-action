import * as core from "@actions/core";
export default function getInput(name, options = {}) {
    const value = core.getInput(name, options);
    if (!value && options.default) {
        core.debug(`${name}: ${options.default}`);
        return options.default;
    }
    core.debug(`${name}: ${value}`);
    return value;
}
