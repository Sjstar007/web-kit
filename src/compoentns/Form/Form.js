import React, { useMemo, useState } from 'react';
import classes from './form.module.scss';
import _ from 'lodash';
import { PropTypes } from 'prop-types';

const RenderFieldComponent = ({
  field: Component,
  id,
  genericProps,
  states,
  setStates,
  dependencies,
  validationSchema,
  validateErrorObject,
}) => {
  const internalState = useMemo(() => {
    const deps = _.reduce(
      dependencies,
      (acc, key) => {
        acc[key] = states[key];
        return acc;
      },
      { [id]: states[id] },
    );
    return deps;
  }, [dependencies, id, states]);

  return (
    <div className={classes.inputContainer}>
      <Component
        id={id}
        genericProps={genericProps}
        setValue={setStates}
        {...internalState}
        error={validateErrorObject?.[id]}
      />
    </div>
  );
};

export const Layout = ({
  layout,
  fields,
  genericProps,
  states,
  setStates,
  dependencies,
  validationSchema,
  validateErrorObject,
}) => {
  if (Array.isArray(layout)) {
    return (
      <>
        {layout.map((row, idx) => {
          if (typeof row === 'string') {
            row = [row];
          }
          if (!Array.isArray(row)) {
            return (
              <RenderContainer
                fields={fields}
                container={row}
                key={idx}
                genericProps={genericProps}
                states={states}
                validateErrorObject={validateErrorObject}
                setStates={setStates}
                dependencies={dependencies}
              />
            );
          }
          return (
            <div className={classes.row} key={row.join(',')}>
              {row.map((cell, index) => {
                if (typeof cell === 'object') {
                  return (
                    <RenderContainer
                      fields={fields}
                      container={cell}
                      key={index + idx}
                      genericProps={genericProps}
                      states={states}
                      validateErrorObject={validateErrorObject}
                      setStates={setStates}
                      dependencies={dependencies}
                    />
                  );
                }
                const F = fields[cell] || { component: () => <p>** {cell} field not found **</p> };
                return (
                  <RenderFieldComponent
                    field={F}
                    key={cell}
                    id={cell}
                    genericProps={genericProps}
                    states={states}
                    setStates={setStates}
                    validateErrorObject={validateErrorObject}
                    dependencies={dependencies[cell]}
                  />
                );
              })}
            </div>
          );
        })}
      </>
    );
  } else {
    return (
      <RenderContainer
        fields={fields}
        layout={layout}
        genericProps={genericProps}
        states={states}
        setStates={setStates}
        validateErrorObject={validateErrorObject}
        dependencies={dependencies}
      />
    );
  }
};

const RenderContainer = ({
  container,
  fields,
  genericProps,
  states,
  setStates,
  dependencies,
  validationSchema,
  validateErrorObject,
}) => {
  return (
    <>
      {Object.keys(container).map(containerName => {
        const Component = fields[containerName];
        return (
          <Component>
            <Layout
              fields={fields}
              layout={container[containerName]}
              genericProps={genericProps}
              states={states}
              setStates={setStates}
              dependencies={dependencies}
              validateErrorObject={validateErrorObject}
            />
          </Component>
        );
      })}
    </>
  );
};

const Form = ({
  fields,
  initialValues,
  containerClassName,
  layout,
  genericProps,
  children,
  validationSchema,
  dependencies,
}) => {
  const [states, setStates] = useState(initialValues);
  const { handlefactoryFormSubmit } = genericProps;
  const [validateErrorObject, setValidateErrorObject] = useState({});
  const handleSubmitButton = async e => {
    e.preventDefault();
    let errorObject = {};
    let flag = false;
    try {
      const validatedValue = await validationSchema.validate({ ...states }, { abortEarly: false });
    } catch (error) {
      const validateError = JSON.parse(JSON.stringify(error));
      validateError.inner.forEach(dataError => {
        errorObject[dataError.path] = dataError.message;
      });

      if (Object.keys(errorObject).length > 0) {
        flag = true;
      } else {
        flag = false;
      }
    }

    setValidateErrorObject(errorObject);

    handlefactoryFormSubmit(states, flag, errorObject);
  };

  return (
    <div className={`${classes.form} ${containerClassName}`}>
      <form onSubmit={handleSubmitButton}>
        <Layout
          fields={fields}
          layout={layout}
          genericProps={genericProps}
          states={states}
          setStates={setStates}
          dependencies={dependencies}
          validateErrorObject={validateErrorObject}
        />
        {children}
      </form>
    </div>
  );
};

Form.propTypes = {
  dependencies: PropTypes.object,
  layout: PropTypes.arrayOf(PropTypes.object).isRequired,
  fields: PropTypes.object.isRequired,
  validationSchema: PropTypes.object,
  genericProps: PropTypes.object,
  initialValues: PropTypes.object.isRequired,
};
export { Form };
