/**
 * GraphMapping.js
 *
 * Mapping to and from a graph's react.js state and its
 * json representation in django-rest-framework.
 */

/**
 * Returns the current graph settings as a persistable JSON object.
 */
let exportGraph = function(state) {
    return {
        title: state.gTitle,
        description: state.gDescription,
        instructor_notes: state.gInstructorNotes,
        graph_type: state.gType,
        interaction_type: state.gInteractionType,
        is_published: state.gIsPublished,
        display_feedback: state.gDisplayFeedback,
        needs_submit: state.gNeedsSubmit,
        show_intersection: state.gShowIntersection,
        line_1_slope: state.gLine1Slope,
        line_1_slope_editable: state.gLine1SlopeEditable,
        line_2_slope: state.gLine2Slope,
        line_2_slope_editable: state.gLine2SlopeEditable,
        line_1_offset: state.gLine1Offset,
        line_2_offset: state.gLine2Offset,
        line_1_label: state.gLine1Label,
        line_1_label_editable: state.gLine1LabelEditable,
        line_2_label: state.gLine2Label,
        line_2_label_editable: state.gLine2LabelEditable,
        line_1_feedback_increase: state.gLine1FeedbackIncrease,
        line_1_increase_score: state.gLine1IncreaseScore,
        line_1_feedback_decrease: state.gLine1FeedbackDecrease,
        line_1_decrease_score: state.gLine1DecreaseScore,
        line_2_feedback_increase: state.gLine2FeedbackIncrease,
        line_2_increase_score: state.gLine2IncreaseScore,
        line_2_feedback_decrease: state.gLine2FeedbackDecrease,
        line_2_decrease_score: state.gLine2DecreaseScore,
        x_axis_label: state.gXAxisLabel,
        x_axis_label_editable: state.gXAxisLabelEditable,
        y_axis_label: state.gYAxisLabel,
        y_axis_label_editable: state.gYAxisLabelEditable
    };
};

/**
 * Import the json graph into the current state.
 */
let importGraph = function(json, obj) {
    obj.setState({
        gId: json.id,
        gTitle: json.title,
        gDescription: json.description,
        gInstructorNotes: json.instructor_notes,
        gType: json.graph_type,
        gInteractionType: json.interaction_type,
        gIsPublished: json.is_published,
        gDisplayFeedback: json.display_feedback,
        gNeedsSubmit: json.needs_submit,
        gShowIntersection: json.show_intersection,
        gLine1Slope: window.parseFloat(json.line_1_slope),
        gLine1SlopeEditable: json.line_1_slope_editable,
        gLine2Slope: window.parseFloat(json.line_2_slope),
        gLine2SlopeEditable: json.line_2_slope_editable,
        gLine1Offset: window.parseFloat(json.line_1_offset),
        gLine2Offset: window.parseFloat(json.line_2_offset),
        gLine1Label: json.line_1_label,
        gLine1LabelEditable: json.line_1_label_editable,
        gLine2Label: json.line_2_label,
        gLine2LabelEditable: json.line_2_label_editable,
        gLine1FeedbackIncrease: json.line_1_feedback_increase,
        gLine1IncreaseScore: window.parseFloat(json.line_1_increase_score),
        gLine1FeedbackDecrease: json.line_1_feedback_decrease,
        gLine1DecreaseScore: window.parseFloat(json.line_1_decrease_score),
        gLine2FeedbackIncrease: json.line_2_feedback_increase,
        gLine2IncreaseScore: window.parseFloat(json.line_2_increase_score),
        gLine2FeedbackDecrease: json.line_2_feedback_decrease,
        gLine2DecreaseScore: window.parseFloat(json.line_2_decrease_score),
        gXAxisLabel: json.x_axis_label,
        gXAxisLabelEditable: json.x_axis_label_editable,
        gYAxisLabel: json.y_axis_label,
        gYAxisLabelEditable: json.y_axis_label_editable
    });
};

export { exportGraph, importGraph };