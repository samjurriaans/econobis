import React from 'react';
import PropTypes from 'prop-types';
// Import TinyMCE
import tinymce from 'tinymce/tinymce';
// A theme is also required
import 'tinymce/themes/modern/theme';
// Any plugins you want to use has to be imported
import 'tinymce/plugins/image';
import 'tinymce/plugins/link';
import 'tinymce/plugins/code';
import 'tinymce/plugins/table';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/paste';
import 'tinymce/plugins/pagebreak';
import 'tinymce/plugins/textcolor';

import { Editor } from '@tinymce/tinymce-react';

const InputTinyMCE = props => {
    const { label, value, onChangeAction } = props;

    return (
        <div>
            <div className="col-sm-3">
                <label htmlFor="quotationText" className="col-sm-12">
                    {label}
                </label>
            </div>
            <div className="col-sm-9">
                <Editor
                    initialValue={value}
                    init={{
                        branding: false,
                        language: 'nl',
                        menubar: false,
                        plugins: 'paste lists advlist link image code table textcolor pagebreak',
                        toolbar:
                            'undo redo | formatselect fontselect | bold italic forecolor | alignleft aligncenter alignright | pagebreak | bullist numlist outdent indent | table | link image | code',
                        height: '300',
                        browser_spellcheck: true,
                        font_formats:
                            'Courier New=courier new;Tahoma=tahoma;Times New Roman=times new roman;Verdana=verdana;',
                    }}
                    onChange={onChangeAction}
                />
            </div>
        </div>
    );
};

InputTinyMCE.defaultProps = {
    value: '',
    errorMessage: '',
};

InputTinyMCE.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    id: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChangeAction: PropTypes.func,
};

export default InputTinyMCE;
