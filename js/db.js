db.enablePersistence().catch(err => {
  if (err.code == 'failed-precondition') {
    console.log('Multiple tabs is opened');
  } else if (err.code == 'unimplemented') {
    console.log('Browser is not supported');
  }
});

const contactForm = document.querySelector('.add-contact form');
const addContactModal = document.getElementById('add_contact_modal');
const editForm = document.querySelector('.edit-contact form');
const editContactModal = document.getElementById('edit_contact_modal');

contactForm.addEventListener('submit', e => {
  e.preventDefault();
  const contact = {
    name: contactForm.name.value,
    phone: parseInt(contactForm.phone.value),
    favorite: false
  };
  db.collection('contacts').add(contact).then(() => {
    var instance = M.Modal.getInstance(addContactModal);
    contactForm.reset();
    instance.close();
    contactForm.querySelector('.error').textContent = '';
  }).catch(err => {
    contactForm.querySelector('.error').textContent = err.message;
  });
});

editForm.addEventListener('submit', e => {
  e.preventDefault();
  const contact = {
    name: editForm.name.value,
    phone: parseInt(editForm.phone.value),
  };
  db.collection('contacts').doc(updateId).update(contact).then(() => {
    var instance = M.Modal.getInstance(editContactModal);
    editForm.reset();
    instance.close();
    editForm.querySelector('.error').textContent = '';
  }).catch(err => {
    editForm.querySelector('.error').textContent = err.message;
  });
});

db.collection('contacts').onSnapshot(snapshot => {
  snapshot.docChanges().forEach(change => {
    if (change.type === 'added') {
      renderContacts(change.doc.data(), change.doc.id);
    } else if (change.type === 'removed') {
      removeContact(change.doc.id);
    }
    // else if (change.type === 'modified') {
//       rerenderContact(change.doc.data(), change.doc.id);
//     }
    console.log(`${change.doc.id} has ${change.type}.`, change.doc.data());
  });
});

const contactContainer = document.querySelector('.contacts');
contactContainer.addEventListener('click', e => {
  if (e.target.textContent === 'delete_outline') {
    const id = e.target.parentElement.getAttribute('data-id');
    db.collection('contacts').doc(id).delete();
  } else if (e.target.textContent === 'edit') {
    // Store the data that wants to edit to the form.
    updateId = e.target.parentElement.getAttribute('data-id');
    const contact = document.querySelector(`.contact[data-id=${updateId}]`);
    const name = contact.querySelector('.name').innerHTML;
    const phone = contact.querySelector('.phone').innerHTML;
    editForm.name.value = name;
    editForm.phone.value = phone;
  }
});