const contacts = document.querySelector('.contacts');

document.addEventListener('DOMContentLoaded', function() {
  var sidenav = document.querySelectorAll('.sidenav');
  var modal = document.querySelectorAll('.modal');
  var fab = document.querySelectorAll('.fixed-action-btn');
  M.FloatingActionButton.init(fab);
  M.Sidenav.init(sidenav);
  M.Modal.init(modal);
});

const renderContacts = (data, id) => {
  const html = `
    <li class="collection-item contact avatar" data-id=${id}>
      <i class="material-icons circle">account_circle</i>
      <span class="title name">${data.name}</span>
      <p>Phone: <span class="phone">${data.phone}</span></p>
      <div class="secondary-content" data-id=${id}>
        <i class="material-icons modal-trigger" href="#edit_contact_modal" style="cursor:pointer">edit</i>
        <i class="material-icons" style="cursor:pointer">${data.favorite ? "star" : "star_border"}</i>
        <i class="material-icons" style="cursor:pointer">delete_outline</i>
      </div>
    </li>
  `
  contacts.innerHTML += html;
};

const removeContact = id => {
  const contact = document.querySelector(`.contact[data-id=${id}]`);
  contact.remove();
};

const updateContact = (data, id) => {
  const contact = document.querySelector(`.contact[data-id=${id}]`);
  contact.querySelector('.name').innerText = data.name;
  contact.querySelector('.phone').innerText = data.phone;
  console.log(contact.querySelectorAll('.material-icons'));
  contact.querySelectorAll('.material-icons')[2].textContent = data.favorite ? 'star' : 'star_border';
};