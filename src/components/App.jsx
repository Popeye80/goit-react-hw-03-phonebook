import { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/contactForm';
import { Filter } from './Filter/filter';
import { ContactList } from './ContactList/contactList';
import styles from './appWrap.module.scss';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const contactsData = localStorage.getItem('contacts');
    const parseDcontactsData = JSON.parse(contactsData);
    if (parseDcontactsData) {
      this.setState({
        contacts: parseDcontactsData,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContact = data => {
    console.log(data);
    const { contacts } = this.state;
    const { name, number } = data;

    if (
      contacts.some(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      return alert(`${name} is already in contacts`);
    } else {
      const contact = {
        id: nanoid(),
        name,
        number,
      };

      this.setState(({ contacts }) => ({
        contacts: [...contacts, contact],
      }));
    }
  };

  onfilterInputType = e => {
    this.setState({
      filter: e.currentTarget.value,
    });
  };

  filteredContactList = () => {
    const { contacts, filter } = this.state;
    const toLower = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(toLower)
    );
  };
  deleteContact = contactid => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactid),
    }));
  };
  render() {
    const { contacts, filter } = this.state;
    const filteredContacts = this.filteredContactList();

    return (
      <>
        <h1 className={styles.appTitle}>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />
        <h2 className={styles.appTitle}>Contacts</h2>
        {contacts.length > 1 && (
          <Filter onChange={this.onfilterInputType} value={filter} />
        )}

        {contacts.length > 0 ? (
          <ContactList
            contacts={filteredContacts}
            onDeleteBtnClick={this.deleteContact}
          />
        ) : (
          <h2 className={styles.appTitle}>Your contact list is empty...</h2>
        )}
      </>
    );
  }
}
