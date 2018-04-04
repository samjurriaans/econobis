import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

import Modal from '../../../../components/modal/Modal';

class EmailAttachmentsNew extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: false,
            errorMaxSize: false,
        };
    };

    onDropAccepted(files) {
        this.props.addAttachment(files);
        setTimeout(() => {
            this.props.toggleShowNew();
        }, 500);
    };

    onDropRejected() {
        this.setState({
            errorMaxSize: true,
        });
    };

    render() {
        return (
            <Modal
                closeModal={this.props.toggleShowNew}
                showConfirmAction={false}
                title="Upload bestand"
            >
                <div className="upload-file-content">
                    <Dropzone className="dropzone" onDropAccepted={this.onDropAccepted.bind(this)} onDropRejected={this.onDropRejected.bind(this)} maxSize={2000000}>
                        <p>Klik hier voor het uploaden van een bestand</p>
                        <p><strong>of</strong> sleep het bestand hierheen</p>
                    </Dropzone>
                </div>
                {
                    this.state.error && <p className="has-error-message">Uploaden mislukt. Probeer nogmaals een bestand te uploaden.</p>
                }
                {
                    this.state.errorMaxSize && <p className="has-error-message">Uploaden mislukt. Het bestand mag maximaal 2MB groot zijn.</p>
                }
            </Modal>
        );
    }
};



export default EmailAttachmentsNew;

