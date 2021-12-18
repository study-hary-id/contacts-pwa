const contactForm = document.querySelector('.add-contact form');
const addContactModal = document.getElementById('add_contact_modal');

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

db.collection('contacts').onSnapshot(snapshot => {
  snapshot.docChanges().forEach(change => {
    renderContacts(change.doc.data(), change.doc.id);
    console.log(`${change.doc.id} has ${change.type}.`, change.doc.data());
  });
});