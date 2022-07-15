import styles from 'components/Filter/filter.module.scss';
import PropTypes from 'prop-types';
export const Filter = ({ onChange, value }) => {
  return (
    <label className={styles.label}>
      Find contacts by name
      <input
        className={styles.filter}
        onChange={onChange}
        type="text"
        value={value}
      />
    </label>
  );
};

Filter.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
