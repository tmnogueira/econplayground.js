import React from 'react';
import PropTypes from 'prop-types';

/**
 * RangeEditor is a re-usable component that creates an <input> with
 * type="range". Also, it optionally displays an "override" checkbox
 * to allow the user to override that value.
 */
export default class RangeEditor extends React.Component {
    render() {
        return <div className="slope-editor row">
            <div className="col">
            <input
        className="form-control form-control-sm"
        data-id={this.props.dataId}
        type="range"
        onChange={this.props.handler}
        value={this.props.value}
        step="0.01"
        min={this.props.min}
        max={this.props.max}
            />
            </div>
            {this.props.showOverrideCheckbox && (
                <div className="col-4">
                    <label className="form-check-label">
                        <input
                            data-id={this.props.dataId}
                            data-override={this.props.overrideValue}
                            className="form-check-input override"
                            type="checkbox"
                            onChange={this.props.handler}
                            checked={this.props.value === this.props.overrideValue} />
                        {this.props.overrideLabel}
                    </label>
                </div>
            )}
        </div>;
    }
}

RangeEditor.defaultProps = {
    min: -5,
    max: 5,
    showOverrideCheckbox: false,
    overrideLabel: '',
    overrideValue: 0
};

RangeEditor.propTypes = {
    dataId: PropTypes.string.isRequired,
    handler: PropTypes.func.isRequired,
    value: PropTypes.number.isRequired,
    min: PropTypes.number,
    max: PropTypes.number,
    showOverrideCheckbox: PropTypes.bool,
    overrideLabel: PropTypes.string,
    overrideValue: PropTypes.number
};
