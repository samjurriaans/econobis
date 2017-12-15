import React, { Component} from 'react';

import RegistrationMeasuresRequestedList from './RegistrationMeasuresRequestedList';
import RegistrationMeasuresRequestedNew from './RegistrationMeasuresRequestedNew';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import PanelHeader from '../../../../components/panel/PanelHeader';

class RegistrationMeasuresRequested extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showNew: false,
        };
    }

    toggleShowNew = () => {
        this.setState({
            showNew: !this.state.showNew,
        })
    };

    render() {
        return (
            <Panel>
              <PanelHeader>
                <span className="h5 text-bold">Gewenste maatregelen</span>
                <a role="button" className="pull-right" onClick={this.toggleShowNew}><span className="glyphicon glyphicon-plus"/></a>
              </PanelHeader>
              <PanelBody>
                <div className="col-md-12">
                  <RegistrationMeasuresRequestedList />
                </div>
                <div className="col-md-12 extra-space-above">
                    { this.state.showNew && <RegistrationMeasuresRequestedNew toggleShowNew={this.toggleShowNew} /> }
                </div>
              </PanelBody>
            </Panel>

        );
    }
};

export default RegistrationMeasuresRequested;