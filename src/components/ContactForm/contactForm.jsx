import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './contactForm.module.scss';

export default class ContactForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    name: '',
    number: '',
  };

  onInputtype = e => {
    const { name, value } = e.currentTarget;
    this.setState({
      [name]: value,
    });
  };
  onSubmiteForm = e => {
    e.preventDefault();
    this.props.onSubmit(this.state);
    this.reset();
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };
  render() {
    const { name, number } = this.state;
    return (
      <form className={styles.contactForm} onSubmit={this.onSubmiteForm}>
        <label>
          <p className={styles.contactForm__label}>Name</p>
          <input
            className={styles.contactForm__input}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={name}
            onChange={this.onInputtype}
          />
        </label>
        <label>
          <p className={styles.contactForm__label}>Phone</p>
          <input
            className={styles.contactForm__input}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={number}
            onChange={this.onInputtype}
          />
        </label>
        <button className={styles.contactForm__btn} type="submit">
          Add Contact
        </button>
      </form>
    );
  }
}
