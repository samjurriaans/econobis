import React from 'react';
import { browserHistory } from 'react-router';

import ButtonIcon from '../../../components/button/ButtonIcon';
import ButtonText from "../../../components/button/ButtonText";

const EmailNewToolbar = ({handleSubmit}) => {
    return (
        <div className="row">
            <div className="col-md-4">
                <div className="btn-group margin-small margin-10-right" role="group">
                    <ButtonIcon iconName={"glyphicon-arrow-left"} onClickAction={browserHistory.goBack} />
                </div>
                <div className="btn-group margin-small" role="group">
                    <ButtonText buttonText={"Opslaan als concept"} onClickAction={(e) => {handleSubmit(e, true)}}/>
                    <ButtonText buttonText={"Verstuur e-mail"} onClickAction={handleSubmit}/>
                </div>
            </div>
            <div className="col-md-4"><h4 className="text-center margin-small">Nieuwe e-mail</h4></div>
            <div className="col-md-4" />
        </div>
    );
};

export default EmailNewToolbar;