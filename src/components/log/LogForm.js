import React, {PropTypes} from 'react';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';
import AdvancedSelect from 'react-select';

const LogForm = ({log, logTypes, statusTypes, onSave, onDelete, onChange, saving = false, editing = false, errors, deleteState = 0, referenceOptions}) => {
    return (
      <form>
          <TextInput
            name="title"
            label="Title"
            value={log.title}
            onChange={onChange}
            error={errors.title}/>

          <TextInput
            name="body"
            label="Body text"
            value={log.body}
            onChange={onChange}
            error={errors.body}/>

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

          {editing && <input
            type="submit"
            disabled={deleteState === 2}
            value={deleteState === 2 ? 'Deleting...' : (deleteState === 1 ? 'Confirm deleting' : 'Delete this log')}
            className="btn btn-danger"
            onClick={onDelete}/>}
      </form>
    );
};

LogForm.propTypes = {
    log: PropTypes.object.isRequired,
    logTypes: PropTypes.array.isRequired,
    referenceOptions: PropTypes.array.isRequired,
    statusTypes: PropTypes.array.isRequired,
    onSave: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    saving: PropTypes.bool,
    editing: PropTypes.bool,
    deleteState: PropTypes.number,
    errors: PropTypes.object
};

export default LogForm;