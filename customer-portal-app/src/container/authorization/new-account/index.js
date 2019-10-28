import React, { useState } from 'react';
import { GoogleReCaptcha, GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import LogoImage from '../../../images/logo.png';
import AuthAPI from '../../../api/auth/AuthAPI';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NewAccountFormPersonal from './NewAccountFormPersonal';
import NewAccountFormOrganisation from './NewAccountFormOrganisation';
import { Link } from 'react-router-dom';

const NewAccount = props => {
    const { executeRecaptcha } = useGoogleReCaptcha();
    const [contactType, setContactType] = useState('person');
    const [showError, toggleError] = useState(false);
    const [showSuccessMessage, toggleSuccessMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    async function handleSubmit(values, actions) {
        // console.log('test 1');
        if (!executeRecaptcha) {
            return;
        }
        // console.log('test 2');
        const reCaptchaToken = await executeRecaptcha('signup_page');
        // console.log('test 3');

        AuthAPI.newAccount({ ...values, contactType: contactType, reCaptchaToken })
            .then(payload => {
                toggleError(false);
                toggleSuccessMessage(true);
                actions.setSubmitting(false);
            })
            .catch(error => {
                // If new account fails show error and then set submitting back to false
                // console.log(error);
                toggleError(true);
                if (error.response && error.response.status === 404) {
                    setErrorMessage(
                        'Er bestaat al een account met het e-mailadres dat je hebt ingevuld. Je kunt met dit e-mailadres inloggen als bestaand contact. Wil je een nieuw account aanmaken? Gebruik dan alsjeblieft een ander e-mailadres.'
                    );
                } else if (error.response && error.response.status === 405) {
                    setErrorMessage(
                        'Er bestaat al een contact met het e-mailadres, voornaam en achternaam dat je hebt ingevuld. Wil je een nieuw account aanmaken? Gebruik dan alsjeblieft een ander e-mailadres, voornaam of achternaam.'
                    );
                } else {
                    setErrorMessage('Fout bij aanmaken nieuw account!');
                }

                actions.setSubmitting(false);
            });
    }

    return (
        <Container fluid className="authorization-container text-light">
            <Row className="justify-content-center align-content-center full-height">
                <Col xs="12" sm="10" md="8" lg="6" xl="4">
                    <img src={LogoImage} alt="" className="image" />
                    {showSuccessMessage ? (
                        <div>
                            <h3 className={'text-light'}>Een E-mail is onderweg!</h3>
                            <p className={'text-light'}>
                                Binnen enkele minuten ontvang je een e-mail met een persoonlijke link. Via deze link kun
                                je je account activeren.
                            </p>
                            <Link to={'/login'} className="authorization-link">
                                Terug naar inloggen
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <h3 className={'text-light'}>Nieuw account</h3>
                            <p className={'text-light'}>Maak binnen 2 minuten een account aan.</p>
                            <br />
                            <Row>
                                <Col xs={12} md={10}>
                                    <div className="form-check form-check-inline">
                                        <label className="radio-inline">
                                            <input
                                                type="radio"
                                                id="personal"
                                                checked={contactType === 'person'}
                                                value={'person'}
                                                onChange={() => setContactType('person')}
                                            />
                                            &nbsp;voor jezelf
                                        </label>
                                        &nbsp;&nbsp;
                                        <label className="radio-inline">
                                            <input
                                                type="radio"
                                                id="organisation"
                                                checked={contactType === 'organisation'}
                                                value={'organisation'}
                                                onChange={() => {
                                                    setContactType('organisation');
                                                }}
                                            />
                                            &nbsp;voor je organisatie
                                        </label>
                                    </div>
                                </Col>
                            </Row>
                            <br />

                            {contactType === 'person' ? (
                                <NewAccountFormPersonal
                                    handleSubmit={handleSubmit}
                                    showSuccessMessage={showSuccessMessage}
                                />
                            ) : (
                                <NewAccountFormOrganisation
                                    handleSubmit={handleSubmit}
                                    showSuccessMessage={showSuccessMessage}
                                />
                            )}
                            <br />

                            {showError ? (
                                <Alert className={'p-1 m-1 text-danger'} variant={'danger'}>
                                    {errorMessage}
                                </Alert>
                            ) : null}
                        </div>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

function NewAccountWithProvider() {
    const RE_CAPTCHA_KEY = process.env.REACT_APP_RE_CAPTCHA_KEY;

    return (
        <GoogleReCaptchaProvider reCaptchaKey={RE_CAPTCHA_KEY} language={'nl'}>
            <NewAccount />
        </GoogleReCaptchaProvider>
    );
}

export default NewAccountWithProvider;
