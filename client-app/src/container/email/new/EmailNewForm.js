import React from 'react';
import Panel from "../../../components/panel/Panel";

import EmailAttachments from "./attachments/EmailAttachments";
import EmailNewFormGeneral from "./general/EmailNewFormGeneral";

const EmailNewForm = ({email, emailAddresses, errors, handleSubmit, handleToIds, handleCcIds, handleBccIds, handleInputChange, handleTextChange, onDrop}) => {
    return (
        <form className="form-horizontal" onSubmit={handleSubmit}>
            <Panel>
                <EmailNewFormGeneral
                    email={email}
                    emailAddresses={emailAddresses}
                    errors={errors}
                    handleSubmit={handleSubmit}
                    handleToIds={handleToIds}
                    handleCcIds={handleCcIds}
                    handleBccIds={handleBccIds}
                    handleInputChange={handleInputChange}
                    handleTextChange={handleTextChange}
                />

                <EmailAttachments attachments={email.attachments} onDrop={onDrop} />

            </Panel>
        </form>
    );
};

export default EmailNewForm;
