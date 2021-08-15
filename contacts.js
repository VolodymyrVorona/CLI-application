const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

// TODO: задокументировать каждую функцию
const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    const parsedData = JSON.parse(data);
    return parsedData;
  } catch (error) {
    throw error;
  }
};

const getContactById = async contactId => {
  try {
    const allContacts = await listContacts();
    const contact = allContacts.find(({ id }) => id === contactId);

    if (!contact) {
      throw new Error(`Product with id=${contactId} not found`);
    }

    return contact;
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async contactId => {
  try {
    const allContacts = await listContacts();
    const idx = allContacts.findIndex(({ id }) => id === contactId);

    if (idx === -1) {
      throw new Error(`Product with id=${contactId} not found`);
    }

    const filteredContact = allContacts.filter(
      ({ id }) => allContacts[idx].id !== id,
    );
    const contactsString = JSON.stringify(filteredContact);
    await fs.writeFile(contactsPath, contactsString);

    return allContacts[idx];
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async (name, email, phone) => {
  console.log(name, email, phone);
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
