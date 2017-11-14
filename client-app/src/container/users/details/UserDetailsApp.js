import React, {Component} from 'react';
import { connect } from 'react-redux';

import { fetchUserDetails } from '../../../actions/UserDetailsActions';
import UserDetailsToolbar from './UserDetailsToolbar';
import UserDetailsForm from './UserDetailsForm';

class UserDetailsApp extends Component {
    constructor(props){
        super(props);
    };

    componentDidMount() {
        this.props.fetchUserDetails(this.props.params.id);
    };

    render() {
        return (
            <div className="row">
                <div className="col-md-9">
                    <div className="panel panel-default">
                        <div className="panel-body">
                            <div className="col-md-12 extra-space-above">
                                < UserDetailsToolbar />
                            </div>

                            <div className="col-md-12 extra-space-above">
                                <UserDetailsForm />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3" />
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        userDetails: state.userDetails,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchUserDetails: (id) => {
        dispatch(fetchUserDetails(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(UserDetailsApp);
