import React, {Component} from 'react';

import MeasureDetailsOpportunityView from './MeasureDetailsOpportunityView';

class MeasureDetailsOpportunityItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showActionButtons: false,
            highlightLine: '',
            showDelete: false,

            opportunity: {
                ...props.opportunity,
            },
        };
    };

    onLineEnter = () => {
        this.setState({
            showActionButtons: true,
            highlightLine: 'highlight-line',
        });
    };

    onLineLeave = () => {
        this.setState({
            showActionButtons: false,
            highlightLine: '',
        });
    };

    toggleDelete = () => {
        this.setState({showDelete: !this.state.showDelete});
    };

    render() {
        return (
            <div>
                <MeasureDetailsOpportunityView
                    highlightLine={this.state.highlightLine}
                    showActionButtons={this.state.showActionButtons}
                    onLineEnter={this.onLineEnter}
                    onLineLeave={this.onLineLeave}
                    toggleDelete={this.toggleDelete}
                    opportunity={this.state.opportunity}
                />
            </div>
        );
    }
};

export default MeasureDetailsOpportunityItem;