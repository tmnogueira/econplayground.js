import React from 'react';
import PropTypes from 'prop-types';
import JXGBoard from './JXGBoard.js';
import './GraphPicker.css';

export default class GraphPicker extends React.Component {
    render() {
        if (!this.props.showing) {
            return null;
        }
        return (
            <div className="GraphPicker">
                <p>Pick a graph type:</p>
                <div className="graph-card">
                    Demand-Supply
                    <JXGBoard id={'jxg-demand-supply'} gType={0} />
                    <button
                         ref={(b1) => { this.b1 = b1; }}
                         type="button" className="btn btn-default btn-sm"
                         onClick={this.handleClick1.bind(this)}>Select</button>
                </div>
                <div className="graph-card">
                    Labor Market
                    <JXGBoard id={'jxg-labor-market'} gType={1} />
                    <button
                         type="button" className="btn btn-default btn-sm"
                         onClick={this.handleClick2.bind(this)}>Select</button>
                </div>
                <div className="graph-card">
                    Labor Market (perfectly inelastic)
                    <JXGBoard id={'jxg-labor-market-inelastic'} gType={2} />
                    <button
                         type="button" className="btn btn-default btn-sm"
                         onClick={this.handleClick3.bind(this)}>Select</button>
                </div>
                <div className="graph-card">
                    Cobb-Douglas
                    <JXGBoard id={'jxg-cobb-douglas'} gType={3} />
                    <button
                         type="button" className="btn btn-default btn-sm"
                         onClick={this.handleClick4.bind(this)}>Select</button>
                </div>
                <div className="graph-card">
                    Labor Supply
                    <JXGBoard id={'jxg-labor-supply'} gType={4} />
                    <button
                         type="button" className="btn btn-default btn-sm"
                         onClick={this.handleClick5.bind(this)}>Select</button>
                </div>
                <div className="graph-card">
                    Consumption - Saving
                    <JXGBoard id={'jxg-consumption-saving'} gType={5} />
                    <button
                         type="button" className="btn btn-default btn-sm"
                         onClick={this.handleClick6.bind(this)}>Select</button>
                </div>
                <div className="graph-card">
                    Saving - Investment
                    <JXGBoard id={'jxg-saving-investment'} gType={6} />
                    <button
                         type="button" className="btn btn-default btn-sm"
                         onClick={this.handleClick7.bind(this)}>Select</button>
                </div>
                <div className="graph-card">
                    Money Market
                    <JXGBoard id={'jxg-money-market'} gType={7} />
                    <button
                         type="button" className="btn btn-default btn-sm"
                         onClick={this.handleClick8.bind(this)}>Select</button>
                </div>
            </div>
        )
    }
    handleClick1() {
        this.props.onSelectGraph(0);
    }
    handleClick2() {
        this.props.onSelectGraph(1);
    }
    handleClick3() {
        this.props.onSelectGraph(2);
    }
    handleClick4() {
        this.props.onSelectGraph(3);
    }
    handleClick5() {
        this.props.onSelectGraph(4);
    }
    handleClick6() {
        this.props.onSelectGraph(5);
    }
    handleClick7() {
        this.props.onSelectGraph(6);
    }
    handleClick8() {
        this.props.onSelectGraph(7);
    }
}

GraphPicker.propTypes = {
    onSelectGraph: PropTypes.func.isRequired,
    showing: PropTypes.bool.isRequired
}
