import React, {PropTypes} from 'react';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';

const PageForm = ({page, onSave, onChange, saving, errors}) => {
    return (
        <form>
            <TextInput
                name="title"
                label="Title"
                value={page.title}
                onChange={onChange}
                error={errors.title}/>

            <SelectInput
              name="type"
              label="Page Type"
              value={page.type}
              defaultOption="Select Page type"
              options={[{value: "overview", text: "Overview page"}, {value: "basic", text: "Basic page"}]}
              onChange={onChange}
              error={errors.type}/>

            <TextInput
                name="body"
                label="Body text"
                value={page.body}
                onChange={onChange}
                error={errors.body}/>

            <input
                type="submit"
                disabled={saving}
                value={saving ? 'Saving...' : 'Save'}
                className="btn btn-primary"
                onClick={onSave}/>
        </form>
    );
};

PageForm.propTypes = {
    page: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    saving: PropTypes.bool,
    errors: PropTypes.object
};

export default PageForm;