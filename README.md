# WebKit Documentation

WebKit simplifies web development with its built-in tools and features. It streamlines projects, providing efficient data management, interactive forms, and reusable components. With WebKit, developers can create robust applications more easily, enhancing productivity and delivering a seamless user experience.

## Headless Table

WebKit's headless table feature enables developers to create high-performance tables effortlessly. It minimizes re-rendering, ensuring smooth user experiences. The feature promotes accessibility, complying with standards and facilitating compatibility with assistive technologies. Its structure simplifies table of contents creation.

### Usage

- Table
  - config
    - tableConfig.js
  - accessors
    - accessors.js
  - index.js
  - HeadlessTable.js

### Table Config

Table config contains array of objetc that contain id, titleAccessor, accessor and accessorsicon.

```javascript
const tableConfig = [
    {
        id: "name",
        titleAccessor: "Name",
        accessor: 'name,
        accessorIcon: "₹",
    },
    {
        id: "email",
        titleAccessor: emailTitleAccessor,
        accessor: emailAccessor,
        accessorIcon: "₹",
    },
]
```

id: id is unique property for your table cell.

titleAccessor: Basically it contain string formated table header, ass per requirement we can create title accessors as shown below, that will help you to create custom title accessors

accessor: Accessors let you access table data from table. You can just pass a string ( key that present in table row data) to access the value of that key or create a custom accessor as shown below. you will get data and generic props in that custom accessor

```jsx
const EmailAccessor = ({ data, genericProps, index }) => {
  return <>// your code goes here</>;
};

export default EmailAccessor;
```

accessorIcon: Here you can pass any icon symbol for adding prefix to you table cell

### Table Row data

This contain table row infomation in a array of object format here is Example-

```javascript
const tableRowData = [
  {
    name: "Jhon",
    email: "jhon@example.com",
  },
  {
    name: "lator",
    email: "lator@example.com",
  },
];
```

### Table Generic props

Generic props can be anything that can pass through Headless Table to access parent components props, function and ref etc.

### How to import

```jsx
import { HeadlessTable } from "template-web-kit";

<HeadlessTable
  tableConfig={configFile}
  tableRowData={tableData}
  tableStriped={boolean}
  tableHover={boolean}
  tableClass={styleObject}
  genericProps={genericProps}
  loading={boolean}
/>;

// Your code here...
```

## Dynamic Form

A cutting-edge structure has been developed for dynamic forms, boasting a remarkable 10x speed advantage over basic forms and other third-party libraries. By optimizing render processes, this structure enables the creation of lightning-fast forms. Field-specific changes trigger targeted re-renders, resulting in unmatched speed and efficiency.

### Usage

- Form
  - constants
    - constant.js
  - formfields
    - fields.js
  - helper
    - fieldskey.js
    - initialvalues.js
    - dependencies.js
    - helper.js
  - util
    - validationSchema.js
  - index.js
  - Form.js

### constants

constants just simplify to storing keys of form so that form can get same key from fields keys, initial values, dependancy

- Note - Keys shoud be same for a fields for getting field, to access the state of that field and also for structure.

```javascript
export const FIRST_NAME = "firstName";
export const LAST_NAME = "lastName";
export const EMAIL_ID = "email";
export const TITLE = "title";
export const DESCRIPTION = "description";

export const BASIC_INFO_CONTAINER = "basic_info_container";
```

### Loyout for form design

Layout help you out to create form structure as per your design, this layout structure comes with object and arrays.
object measn we are creating a container or wrappre of a form,
array shows fields. In five Example we BASIC_INFO_CONTAINER will wrap the fields added in it's value, and array will place fields accordingly

```javascript
export const formLayout = [
  {
    [BASIC_INFO_CONTAINER]: [
      [FIRST_NAME, LAST_NAME],
      [EMAIL_ID, TITLE],
      [DESCRIPTION],
    ],
  },
];
```

### Fields Key

fields key will import from constants as we have mentioned on above key should be same for fields in every aspects.

- Note: create these fields components in formfields folder import from that folder.

```javascript
export const fieldsKey = {
  [FIRST_NAME]: FirstNameField,
  [LAST_NAME]: LastNameField,
  [EMAIL_ID]: EmailIdField,
  [TITLE]: TitleField,
  [DESCRIPTION]: DescriptionField,

  [BASIC_INFO_CONTAINER]: ({ children }) => (
    <ContainerWrapper title="Basic User Info">{children}</ContainerWrapper>
  ),
};
```

### Initial Values

In This exmple will show how we can give initital values to form fields by using there keys.

```javascript
export const initiakKeys = {
  [FIRST_NAME]: "John",
  [LAST_NAME]: "Smith",
  [EMAIL_ID]: "John@example.com",
  [TITLE]: "title goes here",
  [DESCRIPTION]: "Description...",
};
```

### Form Fields

create custom form fields where you can access generic props comming from parent components or from outside of form it can be a function , state and ref etc.

- Note: Here you're getting email, lastName cause in example we add this to fields value in dependancy.

```javascript
import { InputWithLabel } from 'template-web-kit';

const FirstNameField = ({firstName, email, lastName, setValue, genericProps, error}) => {
    const { state, ref, func } = genericProps;

    return (
        <>
            <InputWithLabel
                value={firstName}
                onChange={() => setValue(prev => ...prev,firstName: e.target.value)}
            />
            <p>{error}</p>
        </>
    )
}
```

### Validation Schema

Here in validation schema you can add validaion for your form. will have to use Yup for schema validation.

```javascript
import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(3, "Min. character limit 3")
    .max(200, "Too Long!")
    .required("Required"),

  email: Yup.string().email("Invalid email").required("Required"),
});
```

### Dependencies
Dependencies we use when there are interdependent fields. in abouve example we can access lastName and email in firstName field with the help of dependecies array.
```javascript
export const dependecies = {
  [FACTORY_NAME]: [LAST_NAME, EMAIL_ID],
};

```

```jsx
import { Form } from "template-web-kit";
<Form
  fields={formFields}
  initialValues={initialValues}
  layout={layout}
  genericProps={genericProps}
  children={children}
  validationSchema={validationSchema}
  dependencies={dependencies}
/>;
// Your code here...
```

<!-- # Higher-Order Components (HOC)

WebKit provides Higher-Order Components (HOCs) that enable developers to enhance the functionality of their components. HOCs allow for code reuse, encapsulation of logic, and composability.

### Usage

```jsx
import { HeadlessTable } from "webkit";

// Your code here...
``` -->
