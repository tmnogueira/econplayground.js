import React, { Component } from 'react';
import GraphEditor from './GraphEditor';
import GraphViewer from './GraphViewer';
import { exportGraph, importGraph } from './GraphMapping';
import { authedFetch, getSubmission } from './utils';

class Viewer extends Component {
    constructor(props) {
        super(props);

        this.graphId = window.location.pathname.split('/')[2];

        this.state = {
            // Graph options
            gId: null,
            gType: null,
            gNeedsSubmit: null,
            gShowIntersection: true,
            gLine1Slope: 1,
            gLine2Slope: -1,
            gLine1Offset: 0,
            gLine2Offset: 0,
            gLine1Label: '',
            gLine2Label: '',
            gXAxisLabel: '',
            gYAxisLabel: '',
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
            gCobbDouglasAlpha: 0.65,
            gCobbDouglasYName: 'Y',

            choice: null,
            value: '',
            submission: null
        };

        // TODO: clean up this regex
        if (window.location.href.match(/submitted=1/)) {
            this.state.alertText = 'Submitted.';
        }
    }

    render() {
        if (window.EconPlayground.isInstructor) {
            return <div>
                <div className="alert alert-info"
            hidden={this.state.alertText ? false : true}
            role="alert">
                {this.state.alertText}
            </div>
                <GraphEditor
            ref={(ge) => { this.ge = ge; }}
            showing={true}
            gId={this.state.gId}
            gTitle={this.state.gTitle}
            gDescription={this.state.gDescription}
            gInstructorNotes={this.state.gInstructorNotes}
            gType={this.state.gType}
            gNeedsSubmit={this.state.gNeedsSubmit}
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
            gLine1FeedbackIncrease={this.state.gLine1FeedbackIncrease}
            gLine1IncreaseScore={this.state.gLine1IncreaseScore}
            gLine1FeedbackDecrease={this.state.gLine1FeedbackDecrease}
            gLine1DecreaseScore={this.state.gLine1DecreaseScore}
            gLine2FeedbackIncrease={this.state.gLine2FeedbackIncrease}
            gLine2IncreaseScore={this.state.gLine2IncreaseScore}
            gLine2FeedbackDecrease={this.state.gLine2FeedbackDecrease}
            gLine2DecreaseScore={this.state.gLine2DecreaseScore}

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
            gCobbDouglasAlphaEditable={this.state.gCobbDouglasAlphaEditable}
            gCobbDouglasYName={this.state.gCobbDouglasYName}
            gCobbDouglasCorrectScenario={this.state.gCobbDouglasCorrectScenario}

            updateDisplayIntersection={this.updateDisplayIntersection.bind(this)}
            updateGraph={this.handleGraphUpdate.bind(this)}
            saveGraph={this.handleSaveGraph.bind(this)} />
                </div>;
        } else {
            return <div>
                <div className="alert alert-info"
            hidden={this.state.alertText ? false : true}
            role="alert">
                {this.state.alertText}
            </div>
                <GraphViewer
            ref={(gv) => { this.gv = gv; }}
            gId={this.state.gId}
            gTitle={this.state.gTitle}
            gDescription={this.state.gDescription}
            gType={this.state.gType}
            gNeedsSubmit={this.state.gNeedsSubmit}
            gShowIntersection={this.state.gShowIntersection}
            gIntersectionLabel={this.state.gIntersectionLabel}
            gIntersectionLabelEditable={this.state.gIntersectionLabelEditable}
            gIntersectionHorizLineLabel={this.state.gIntersectionHorizLineLabel}
            gIntersectionHorizLineLabelEditable={this.state.gIntersectionHorizLineLabelEditable}
            gIntersectionVertLineLabel={this.state.gIntersectionVertLineLabel}
            gIntersectionVertLineLabelEditable={this.state.gIntersectionVertLineLabelEditable}
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
            gCobbDouglasAInitial={this.state.gCobbDouglasAInitial}
            gCobbDouglasAName={this.state.gCobbDouglasAName}
            gCobbDouglasAEditable={this.state.gCobbDouglasAEditable}
            gCobbDouglasL={this.state.gCobbDouglasL}
            gCobbDouglasLInitial={this.state.gCobbDouglasLInitial}
            gCobbDouglasLName={this.state.gCobbDouglasLName}
            gCobbDouglasLEditable={this.state.gCobbDouglasLEditable}
            gCobbDouglasK={this.state.gCobbDouglasK}
            gCobbDouglasKInitial={this.state.gCobbDouglasKInitial}
            gCobbDouglasKName={this.state.gCobbDouglasKName}
            gCobbDouglasKEditable={this.state.gCobbDouglasKEditable}
            gCobbDouglasAlpha={this.state.gCobbDouglasAlpha}
            gCobbDouglasAlphaInitial={this.state.gCobbDouglasAlphaInitial}
            gCobbDouglasAlphaEditable={this.state.gCobbDouglasAlphaEditable}
            gCobbDouglasYName={this.state.gCobbDouglasYName}

            submission={this.state.submission}
            updateGraph={this.handleGraphUpdate.bind(this)}
            choice={this.state.choice}
            value={this.state.value}
                />
                </div>;
        }
    }

    componentDidMount() {
        // Load graph and submission data
        const me = this;
        this.getGraph().then(function() {
            return me.getSubmission();
        }).then(function(s) {
            me.setState({submission: s});
        });

        // Add graph feedback event handlers
        document.addEventListener('l1up', function() {
            me.handleCase1();
        });
        document.addEventListener('l1down', function() {
            me.handleCase2();
        });
        document.addEventListener('l2up', function() {
            me.handleCase3();
        });
        document.addEventListener('l2down', function() {
            me.handleCase4();
        });
        document.addEventListener('l1initial', function() {
            me.handleInitial();
        });
        document.addEventListener('l2initial', function() {
            me.handleInitial();
        });

        document.addEventListener('l1offset', function(e) {
            const offset = e.detail;
            me.setState({gLine1Offset: offset});
        });
        document.addEventListener('l2offset', function(e) {
            const offset = e.detail;
            me.setState({gLine2Offset: offset});
        });
    }

    getGraph() {
        const me = this;
        return authedFetch(`/api/graphs/${this.graphId}/`).then(
            function(response) {
                return response.json();
            }).then(function(json) {
                importGraph(json, me);
            });
    }

    getSubmission() {
        return getSubmission(this.state.gId);
    }

    handleSaveGraph() {
        let data = exportGraph(this.state);
        data.author = window.EconPlayground.user;

        const me = this;
        authedFetch('/api/graphs/' + this.graphId + '/',
                    'put',
                    JSON.stringify(data))
            .then(function(response) {
                if (response.status === 200) {
                    me.setState({
                        alertText: 'Graph saved'
                    });

                    window.scrollTo(0, 0);
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
    updateDisplayIntersection(checked) {
        this.setState({gShowIntersection: checked});
    }
    handleCase1() {
        this.setState({
            choice: 1,
            value: this.state.gLine1IncreaseScore.toString()
        });
    }
    handleCase2() {
        this.setState({
            choice: 2,
            value: this.state.gLine1DecreaseScore.toString()
        });
    }
    handleCase3() {
        this.setState({
            choice: 3,
            value: this.state.gLine2IncreaseScore.toString()
        });
    }
    handleCase4() {
        this.setState({
            choice: 4,
            value: this.state.gLine2DecreaseScore.toString()
        });
    }
    handleInitial() {
        this.setState({value: '0'});
    }
}

export default Viewer;
