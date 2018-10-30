//Business Logic
// Business Logic for AddressBook ---------
function AddressBook() {
  this.contacts = [],
  this.currentId = 0
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts.push(contact);
}

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

AddressBook.prototype.findContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        return this.contacts[i];
      }
    }
  };
  return false;
}

AddressBook.prototype.deleteContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        delete this.contacts[i];
        return true;
      }
    }
  };
  return false;
}

// Business Logic for Contacts ---------
function Contact(firstName, lastName) {
  this.firstName = firstName,
  this.lastName = lastName,
  this.phones = [],
  this.addresses = [],
  this.currentPhoneId = 0,
  this.currentAddressId = 0
}

function Phone (homePhone, workPhone, homeMobile, workMobile) {
  this.homePhone = homePhone,
  this.workPhone = workPhone,
  this.homeMobile = homeMobile,
  this.workMobile = workMobile
}
function Address (homeAddress, workAddress, emailAddress, postAddress) {
  this.homeAddress = homeAddress,
  this.workAddress = workAddress,
  this.emailAddress = emailAddress,
  this.postAddress = postAddress
}
Contact.prototype.addPhone = function(phone) {
  for (i=0;i<4;i++){
    phone.phoneId = this.assignPhoneId();
    this.phones.push(Object.values(phone)[i]);
  }
  phone.phoneId = this.assignPhoneId();
  this.phones.push(phone);
}
Contact.prototype.assignPhoneId = function() {
  this.currentPhoneId += 1;
  return this.currentPhoneId;
}
Contact.prototype.addAddress = function(address) {
  for (i=0;i<4;i++){
    address.addressId = this.assignAddressId();
    this.addresses.push(Object.values(address)[i]);
  }
}
Contact.prototype.assignAddressId = function() {
  this.currentAddressId += 1;
  return this.currentAddressId;
}
Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

// User Interface Logic ---------
var addressBook = new AddressBook();

function displayContactDetails(addressBookToDisplay) {
  var contactsList = $("ul#contacts");
  var htmlForContactInfo = "";
  addressBookToDisplay.contacts.forEach(function(contact) {
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
  });
  contactsList.html(htmlForContactInfo);
};

function showContact(contactId) {
  var contact = addressBook.findContact(contactId);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);

  if (contact.phones[0]) {$(".home-phone").html("Home Phone:"+ contact.phones[0]);}
  if (contact.phones[1]) {$(".work-phone").html("Work Phone: "+contact.phones[1]);}
  if (contact.phones[2]) {$(".home-mobile").html("Home Mobile: "+contact.phones[2]);}
  if (contact.phones[3]) {$(".work-mobile").html("Work Mobile: "+contact.phones[3]);}
  if (contact.addresses[0]) {$(".home-address").html("Home Address: "+contact.addresses[0]);}
  if (contact.addresses[1]) {$(".work-address").html("Work Address: "+contact.addresses[1]);}
  if (contact.addresses[2]) {$(".email-address").html("Email: "+contact.addresses[2]);}
  if (contact.addresses[3]) {$(".post-address").html("Post Address: "+contact.addresses[3]);}

  var buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" +  + contact.id + ">Delete</button>");
}

function attachContactListeners() {
  $("ul#contacts").on("click", "li", function() {
    showContact(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function() {
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });
};

$(document).ready(function() {
  attachContactListeners();
  $("form#new-contact").submit(function(event) {
    event.preventDefault();
    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    var inputtedHomeNumber = $("input#new-home-number").val();
    var inputtedWorkNumber = $("input#new-work-number").val();
    var inputtedHomeMobile = $("input#new-home-mobile").val();
    var inputtedWorkMobile = $("input#new-work-mobile").val();
    var inputtedHomeAddress = $("input#new-home-address").val();
    var inputtedWorkAddress = $("input#new-work-address").val();
    var inputtedEmailAddress = $("input#new-email-address").val();
    var inputtedPostAddress = $("input#new-post-address").val();
    if (inputtedFirstName.match(/^[A-Za-z]+$/) && inputtedLastName.match(/^[A-Za-z]+$/)) {
      $("input#new-first-name").val("");
      $("input#new-last-name").val("");
      $("input#new-home-number").val("");
      $("input#new-work-number").val("");
      $("input#new-home-mobile").val("");
      $("input#new-work-mobile").val("");
      $("input#new-home-mobile").val("");
      $("input#new-work-mobile").val("");
      $("input#new-home-address").val("");
      $("input#new-work-address").val("");
      $("input#new-email-address").val("");
      $("input#new-post-address").val("");
      var newContact = new Contact(inputtedFirstName, inputtedLastName);
      var newPhone = new Phone(inputtedHomeNumber, inputtedWorkNumber, inputtedHomeMobile, inputtedWorkMobile);
      var newAddress = new Address(inputtedHomeAddress, inputtedWorkAddress, inputtedEmailAddress, inputtedPostAddress);
      newContact.addPhone(newPhone);
      newContact.addAddress(newAddress);
      addressBook.addContact(newContact);
      displayContactDetails(addressBook);
    } else {
      alert("Enter real name and lastname.")
    }
    console.log(newContact);
  })
})
