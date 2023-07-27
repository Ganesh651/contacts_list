import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import ContactItem from './components/ContactItem'

import './App.css'

const initialContactsList = [
  {
    id: uuidv4(),
    name: 'Ram',
    mobileNo: 9999988888,
    isFavorite: false,
  },
  {
    id: uuidv4(),
    name: 'Pavan',
    mobileNo: 8888866666,
    isFavorite: true,
  },
  {
    id: uuidv4(),
    name: 'Nikhil',
    mobileNo: 9999955555,
    isFavorite: false,
  },
]

class App extends Component {
  state = {
    contactsList: initialContactsList,
    name: '',
    mobileNo: '',
  }

  componentDidMount() {
    const storedContacts = localStorage.getItem('contactsList')
    if (storedContacts) {
      this.setState({contactsList: JSON.parse(storedContacts)})
    } else {
      this.setState({contactsList: initialContactsList})
    }
  }

  componentDidUpdate() {
    const {contactsList} = this.state
    localStorage.setItem('contactsList', JSON.stringify(contactsList))
  }

  onAddContact = event => {
    event.preventDefault()
    const {name, mobileNo} = this.state
    if (name === '' || mobileNo === '') {
      alert('Enter Name and Mobile Number')
    } else {
      const newContactList = {
        id: uuidv4(),
        name,
        mobileNo,
      }
      this.setState(prevState => ({
        contactsList: [...prevState.contactsList, newContactList],
      }))
      this.setState({name: '', mobileNo: ''})
    }
  }

  onChangeMobileNo = event => {
    this.setState({mobileNo: event.target.value})
  }

  onChangeName = event => {
    this.setState({name: event.target.value})
  }

  toggleIsFavorite = id => {
    this.setState(prevState => ({
      contactsList: prevState.contactsList.map(eachContact => {
        if (eachContact.id === id) {
          return {...eachContact, isFavorite: !eachContact.isFavorite}
        }
        return eachContact
      }),
    }))
  }

  render() {
    const {name, mobileNo, contactsList} = this.state
    return (
      <div className="app-container">
        <div className="responsive-container">
          <h1 className="heading">Contacts</h1>
          <form className="contact-form-container" onSubmit={this.onAddContact}>
            <input
              value={name}
              onChange={this.onChangeName}
              className="input"
              placeholder="Name"
            />
            <input
              className="input"
              value={mobileNo}
              onChange={this.onChangeMobileNo}
              placeholder="Mobile Number"
            />
            <button type="submit" className="button">
              Add Contact
            </button>
          </form>
          <ul className="contacts-table">
            <li className="table-header">
              <p className="table-header-cell name-column">Name</p>
              <hr className="separator" />
              <p className="table-header-cell">Mobile Number</p>
            </li>
            {contactsList.map(eachContact => (
              <ContactItem
                key={eachContact.id}
                contactDetails={eachContact}
                toggleIsFavorite={this.toggleIsFavorite}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default App
