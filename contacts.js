const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.join('./db', 'contacts.json');

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    console.table(JSON.parse(data.toString()));
  } catch (err) {
    console.log(err.message);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const foundContact = JSON.parse(data.toString()).find(
      (contact) => +contact.id === +contactId
    );
    console.log(foundContact);
  } catch (err) {
    console.log(err.message);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const filteredContacts = JSON.parse(data.toString()).filter(
      (contact) => +contact.id !== +contactId
    );
    const newData = JSON.stringify(filteredContacts);
    console.table(filteredContacts);
    fs.writeFile(contactsPath, newData);
  } catch (err) {
    console.log(err.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data.toString());
    const newContact = {
      id: `${+contacts[contacts.length - 1].id + 1}`,
      name,
      email,
      phone,
    };
    contacts.push(newContact);
    fs.writeFile(contactsPath, JSON.stringify(contacts));
    console.table(contacts);
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
