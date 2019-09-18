import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ContactAPI from '../../../../api/contact/ContactAPI';
import ViewHtmlAsText from '../../../../components/general/ViewHtmlAsText';
import Col from 'react-bootstrap/Col';
import LoadingView from '../../../../components/general/LoadingView';
import { Field, Formik } from 'formik';
import * as Yup from 'yup';

function StepFour({ previous, contactId, projectId }) {
    const [contactDocument, setContactDocument] = useState('');
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        // If there is an id and is not the same as previous id
        // then call api
        if (contactId) {
            (function callFetchContact() {
                setLoading(true);
                ContactAPI.previewDocument(contactId, projectId)
                    .then(payload => {
                        setContactDocument(payload.data);
                        setLoading(false);
                    })
                    .catch(error => {
                        alert('Er is iets misgegaan met laden. Herlaad de pagina opnieuw.');
                        setLoading(false);
                    });
            })();
        }
    }, [contactId]);

    const validationSchema = Yup.object({
        didAgreeRegistration: Yup.bool().test(
            'didAgreeRegistration',
            'Je dient akkoord te gaan met het inschrijfformulier!',
            value => value === true
        ),
    });

    return (
        <>
            {isLoading ? (
                <LoadingView />
            ) : (
                <Formik
                    validationSchema={validationSchema}
                    onSubmit={function(values, actions) {
                        // TODO submit registerValues to backend
                    }}
                    initialValues={{ didAgreeRegistration: false }}
                >
                    {({ handleSubmit, handleChange, handleBlur, values, touched, isValid, errors }) => (
                        <div>
                            <Row>
                                <Col xs={12} md={10}>
                                    <ViewHtmlAsText value={contactDocument} />
                                    <Field
                                        name="didAgreeRegistration"
                                        render={({ field }) => (
                                            <label className="w-checkbox checkbox-fld">
                                                <input
                                                    type="checkbox"
                                                    {...field}
                                                    id="did_agree_registration"
                                                    checked={field.value}
                                                    className="w-checkbox-input checkbox"
                                                />
                                                <span htmlFor="did_agree_terms" className="checkbox-label w-form-label">
                                                    Ik ben akkoord met het inschrijfformulier
                                                </span>
                                                {touched.didAgreeRegistration && errors.didAgreeRegistration ? (
                                                    <div className={'error-message text-danger'}>
                                                        {errors.didAgreeRegistration}
                                                    </div>
                                                ) : null}
                                            </label>
                                        )}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} md={10}>
                                    <ButtonGroup aria-label="Steps" className="float-right">
                                        <Button className={'w-button'} size="sm" onClick={previous}>
                                            Terug
                                        </Button>
                                        <Button className={'w-button'} size="sm" onClick={handleSubmit}>
                                            Bevestigen inschrijving
                                        </Button>
                                    </ButtonGroup>
                                </Col>
                            </Row>
                        </div>
                    )}
                </Formik>
            )}
        </>
    );
}

export default StepFour;
