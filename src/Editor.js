import React, { Component } from 'react';
import BackButton from './BackButton';
import GraphEditor from './GraphEditor';
import GraphPicker from './GraphPicker';
import { exportGraph } from './GraphMapping';
import { authedFetch } from './utils';
import './Editor.css';

class Editor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 0,
            user: null,
            alertText: null,

            // Graph options
            gType: null,
            gShowIntersection: true,
            gLine1Slope: 1,
            gLine1Editable: false,
            gLine2Slope: -1,
            gLine2Editable: false,
            gLine1Offset: 0,
            gLine2Offset: 0,
            gLine1Label: '',
            gLine1LabelEditable: false,
            gLine2Label: '',
            gLine2LabelEditable: false,
            gXAxisLabel: '',
            gXAxisLabelEditable: false,
            gYAxisLabel: '',
            gYAxisLabelEditable: false,
            gIntersectionLabelEditable: false,
            gIntersectionHorizLineLabelEditable: false,
            gIntersectionVertLineLabelEditable: false,
            gLine1FeedbackIncrease: '',
            gLine1FeedbackDecrease: '',
            gLine2FeedbackIncrease: '',
            gLine2FeedbackDecrease: '',

            gCobbDouglasA: 2,
            gCobbDouglasAName: 'A',
            gCobbDouglasL: 5,
            gCobbDouglasLName: 'L',
            gCobbDouglasK: 1,
            gCobbDouglasKName: 'K',
            gCobbDouglasAlpha: 0.65
        };
    }
    render() {
        return (
            <div className="Editor">
                <div className="Editor-container" ref={(test) => { this.test = test; }}>
                    <div className="alert alert-danger"
                         hidden={this.state.alertText ? false : true}
                         role="alert">
                        {this.state.alertText}
                    </div>
                    <BackButton
                         ref={(backbutton) => { this.backbutton = backbutton; }}
                         showing={this.state.step !== 0}
                         onClick={this.reset.bind(this)} />
                    <GraphPicker
                         ref={(gp) => { this.gp = gp; }}
                         showing={this.state.step === 0}
                         onSelectGraph={this.onSelectGraph.bind(this)} />
                    <GraphEditor
                         ref={(ge) => { this.ge = ge; }}
                        showing={this.state.step === 1}
                        gType={this.state.gType}
                        gShowIntersection={this.state.gShowIntersection}
                        gIntersectionLabel={this.state.gIntersectionLabel}
                        gIntersectionLabelEditable={this.state.gIntersectionLabelEditable}
                        gIntersectionHorizLineLabel={this.state.gIntersectionHorizLineLabel}
                        gIntersectionHorizLineLabelEditable={this.state.gIntersectionHorizLineLabelEditable}
                        gIntersectionVertLineLabel={this.state.gIntersectionVertLineLabel}
                        gIntersectionVertLineLabelEditable={this.state.gIntersectionVertLineLabelEditable}
                        gIsPublished={this.state.gIsPublished}
                        gDisplayFeedback={this.state.gDisplayFeedback}
                        gLine1Label={this.state.gLine1Label}
                        gLine1LabelEditable={this.state.gLine1LabelEditable}
                        gLine2Label={this.state.gLine2Label}
                        gLine2LabelEditable={this.state.gLine2LabelEditable}
                        gLine1Slope={this.state.gLine1Slope}
                        gLine1SlopeEditable={this.state.gLine1SlopeEditable}
                        gLine2Slope={this.state.gLine2Slope}
                        gLine2SlopeEditable={this.state.gLine2SlopeEditable}
                        gXAxisLabel={this.state.gXAxisLabel}
                        gXAxisLabelEditable={this.state.gXAxisLabelEditable}
                        gYAxisLabel={this.state.gYAxisLabel}
                        gYAxisLabelEditable={this.state.gYAxisLabelEditable}
                        gLine1Offset={this.state.gLine1Offset}
                        gLine2Offset={this.state.gLine2Offset}
                        gLine1FeedbackDecrease={this.state.gLine1FeedbackDecrease}
                        gLine1DecreaseScore={this.state.gLine1DecreaseScore}
                        gLine1FeedbackIncrease={this.state.gLine1FeedbackIncrease}
                        gLine1IncreaseScore={this.state.gLine1IncreaseScore}
                        gLine2FeedbackDecrease={this.state.gLine2FeedbackDecrease}
                        gLine2DecreaseScore={this.state.gLine2DecreaseScore}
                        gLine2FeedbackIncrease={this.state.gLine2FeedbackIncrease}
                        gLine2IncreaseScore={this.state.gLine2IncreaseScore}

                        gCobbDouglasA={this.state.gCobbDouglasA}
                        gCobbDouglasAName={this.state.gCobbDouglasAName}
                        gCobbDouglasAEditable={this.state.gCobbDouglasAEditable}
                        gCobbDouglasL={this.state.gCobbDouglasL}
                        gCobbDouglasLName={this.state.gCobbDouglasLName}
                        gCobbDouglasLEditable={this.state.gCobbDouglasLEditable}
                        gCobbDouglasK={this.state.gCobbDouglasK}
                        gCobbDouglasKName={this.state.gCobbDouglasKName}
                        gCobbDouglasKEditable={this.state.gCobbDouglasKEditable}
                        gCobbDouglasAlpha={this.state.gCobbDouglasAlpha}
                        gCobbDouglasAlphaName={this.state.gCobbDouglasAlphaName}
                        gCobbDouglasAlphaEditable={this.state.gCobbDouglasAlphaEditable}

                        updateGraph={this.handleGraphUpdate.bind(this)}
                        saveGraph={this.handleSaveGraph.bind(this)} />
                </div>
            </div>
        );
    }
    reset() {
        this.setState({step: 0});
    }
    onSelectGraph(type) {
        this.setState({
            step: 1,
            gType: type
        });
    }
    handleSaveGraph() {
        let data = exportGraph(this.state);
        data.author = window.EconPlayground.user;

        const me = this;
        authedFetch('/api/graphs/', 'post', JSON.stringify(data))
            .then(function(response) {
                if (response.status === 201) {
                    me.setState({
                        alertText: null,
                        step: 2
                    });

                    response.json().then(function(graph) {
                        const url = `/graph/${graph.id}/`;
                        window.location.href = url;
                    });
                } else {
                    me.setState({
                        alertText: response.statusText
                    });
                    window.scrollTo(0, 0);
                }
            });
    }
    handleGraphUpdate(obj) {
        this.setState(obj);
    }
}

export default Editor;
