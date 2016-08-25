import React, {PropTypes} from 'react';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';

const PageForm = ({page, pageTypes, overviewTypes, onSave, onChange, saving, errors}) => {
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
              options={pageTypes}
              onChange={onChange}
              error={errors.type}/>

            <SelectInput
              name="overview_type"
              label="Overview Type"
              value={page.overview_type}
              defaultOption="Select Overview type"
              options={overviewTypes}
              onChange={onChange}
              className={page.type !== 'overview' ? ['hidden'] : []}
              error={errors.overview_type}/>

            <TextInput
                name="body"
                label="Body text"
                value={page.body}
                onChange={onChange}
                error={errors.body}/>

            <TextInput
              type="checkbox"
              name="access"
              label="Accessible page (uncheck to make page login protected)"
              value={page.access}
              onChange={onChange}
              error={errors.access}/>

            <TextInput
              type="checkbox"
              name="show_nav"
              label="Show in navigation"
              value={page.show_nav}
              onChange={onChange}
              error={errors.show_nav}/>

            <input
                type="submit"
                disabled={saving}
                value={saving ? 'Saving...' : 'Save'}
                className="btn btn-primary"
                onClick={onSave}/>

            <input
              type="submit"
              disabled={saving}
              value={saving ? 'Saving...' : 'Save and keep editing'}
              className="btn"
              onClick={e => onSave(e, true)}/>
        </form>
    );
};

PageForm.propTypes = {
    page: PropTypes.object.isRequired,
    pageTypes: PropTypes.array.isRequired,
    overviewTypes: PropTypes.array.isRequired,
    onSave: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    saving: PropTypes.bool,
    errors: PropTypes.object
};

export default PageForm;