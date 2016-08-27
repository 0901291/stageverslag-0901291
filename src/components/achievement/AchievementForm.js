import React, {PropTypes} from 'react';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';
import AdvancedSelect from 'react-select';

const AchievementForm = ({achievement, achievementTypes, statusTypes, onSave, onDelete, onChange, saving = false, editing = false, errors, deleteState = 0, referenceOptions}) => {
    return (
      <form>
          <TextInput
            name="title"
            label="Title"
            value={achievement.title}
            onChange={onChange}
            error={errors.title}/>

          <SelectInput
            name="type"
            label="Achievement Type"
            value={achievement.type}
            defaultOption="Select Achievement type"
            options={achievementTypes}
            onChange={onChange}
            error={errors.type}/>

          <SelectInput
            name="status"
            label="Achievement status"
            value={achievement.status}
            defaultOption="Select achievement status"
            options={statusTypes}
            onChange={onChange}
            error={errors.status}/>

          <TextInput
            name="body"
            label="Body text"
            value={achievement.body}
            onChange={onChange}
            error={errors.body}/>

          <div className="form-group">
              <label htmlFor="references">{"References"}</label>
              <div className="field">
                  <AdvancedSelect
                    name="references"
                    value={achievement.references}
                    options={referenceOptions}
                    onChange={onChange}
                    multi={true}/>
              </div>
          </div>

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
            value={deleteState === 2 ? 'Deleting...' : (deleteState === 1 ? 'Confirm deleting' : 'Delete this achievement')}
            className="btn btn-danger"
            onClick={onDelete}/>}
      </form>
    );
};

AchievementForm.propTypes = {
    achievement: PropTypes.object.isRequired,
    achievementTypes: PropTypes.array.isRequired,
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

export default AchievementForm;