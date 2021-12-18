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
    console.log("Successfully add contact.", contact);
  }).catch(err => {
    contactForm.querySelector('.error').textContent = err.message;
  });
});