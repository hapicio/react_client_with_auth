import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';

import * as actions from '../../actions';

const CustomReduxForm = props => {
    class CustomForm extends React.Component {
        componentWillMount() {
            this.props.removeAuthError();
        }
        renderAlert = () => {
            if (this.props.errorMessage) {
                return (
                    <div className="alert alert-danger">
                        <strong>Oops!</strong> {this.props.errorMessage}
                    </div>
                );
            }
        };
        render() {
            const { fields, handleSubmit } = this.props;
            return (
                <form onSubmit={handleSubmit(props.onSubmit)}>
                    {fields.map((formField, i) => renderField(formField, i))}
                    {this.renderAlert()}
                    <button className="btn btn-primary" action="submit">
                        {props.submitButtonText}
                    </button>
                </form>
            );
        }
    }

    const renderField = (customField, i) => {
        return (
            <div key={i}>
                <Field
                    label={customField.label}
                    name={customField.name}
                    className={customField.className}
                    component={renderFieldComponent}
                    type={customField.type}
                />
            </div>
        );
    };

    const renderFieldComponent = field => {
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? 'has-danger' : ''}`;

        return (
            <fieldset className={className}>
                <label>{field.label}</label>
                <input
                    {...field.input}
                    type={field.type}
                    className={field.className}
                />
                <div className="text-help">{touched ? error : ''}</div>
            </fieldset>
        );
    };

    const mapStateToProps = state => {
        return {
            errorMessage: state.auth.error
        };
    };

    const WrappedForm = reduxForm({
        validate: props.validate,
        form: props.formName
    })(connect(mapStateToProps, actions)(CustomForm));

    return <WrappedForm {...props} />;
};

export default CustomReduxForm;
