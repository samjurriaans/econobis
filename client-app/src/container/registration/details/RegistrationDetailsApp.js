import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchRegistrationDetails } from '../../../actions/registration/RegistrationDetailsActions';
import RegistrationDetailsToolbar from './RegistrationDetailsToolbar';
import RegistrationDetailsForm from './RegistrationDetailsForm';
import RegistrationDetailsHarmonica from './harmonica/RegistrationDetailsHarmonica';

import PanelBody from "../../../components/panel/PanelBody";
import Panel from "../../../components/panel/Panel";

class RegistrationDetailsApp extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchRegistrationDetails(this.props.params.id);
    }

    render() {
        return (
          <div className="row">
              <div className="col-md-9">
              <div className="col-md-12">
                      <RegistrationDetailsToolbar />
                    </div>

              <div className="col-md-12">
                      <RegistrationDetailsForm />
                    </div>
                </div>
              <Panel className="col-md-3" >
                  <PanelBody>
                    <RegistrationDetailsHarmonica id={this.props.params.id}/>
                  </PanelBody>
              </Panel>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    fetchRegistrationDetails: (id) => {
        dispatch(fetchRegistrationDetails(id));
    },
});

export default connect(null, mapDispatchToProps)(RegistrationDetailsApp);
