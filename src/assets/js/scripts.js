function createElem(elem, object) {
  let object = object[elem] || object;
  let node;
  switch (elem) {
    case 'input':
      node = document.createElement('input');
      break;
    case 'upload':
      node = document.createElement('input');
      node.setAttribute('onchange', 'getUploadedFile()');
      node.setAttribute('type', 'file');
      break;
    case 'map':
      node = document.createElement('div');
      break;
    case 'image':
      node = document.createElement('img');
      break;
    case 'button':
      node = document.createElement('input');
      node.setAttribute('type', 'button');
      break;

    default:
      break;
  }

  Object.keys(object).forEach(function (key, index) {
    node.setAttribute(key, object[key]);
  });
  return node;
}

function attachEvents() {
  let txtCpf = document.getElementById('txtCpf');
  let txtTelefone = document.getElementById('txtTelefone');
  let btnSave = document.getElementById('btnSave');

  txtCpf.setAttribute('onkeyup', 'setMask(this, "cpf")');
  txtTelefone.setAttribute('onkeyup', 'setMask(this, "tel")');
  txtTelefone.setAttribute('maxlength', '15');
  btnSave.setAttribute('onclick', 'saveData()');

}

function saveData() {
  let storedUsers = JSON.parse(localStorage.getItem('storedUsers')) || [];
  let user = {
    'name': document.getElementById('txtFullname').value,
    'cpf': document.getElementById('txtCpf').value,
    'phone': document.getElementById('txtTelefone').value,
    'address': document.getElementById('txtAddress').value,
    'complement': document.getElementById('txtComplement').value || "",
    'image': document.getElementById('imgAvatar').src
  };

  storedUsers.push(user);

  localStorage.setItem('storedUsers', JSON.stringify(storedUsers));

  alert()
}

function fetchData() {
  window.fetch('./data/mock.json', {
    method: 'get'
  }).then(function (response) {
    return response.json();
  }).then(function (response) {
    renderForm(response);
  }).catch(function (error) {
    console.log(error);
  });
}

function renderForm(data) {
  let wrapper = document.getElementById('wrapper')
  let form = document.createElement('form');
  let arraySize = Object.keys(data.fields).length;

  wrapper.appendChild(form);

  Object.keys(data.fields).forEach(function (key, index) {

    if (data.fields[key].length) {
      data.fields[key].forEach(function (input) {
        let nodeWrapper = document.createElement('div');
        nodeWrapper.setAttribute('class', 'input-wrapper');
        nodeWrapper.setAttribute('data-placeholder', input['data-placeholder']);
        nodeWrapper.appendChild(createElem(key, input))
        form.appendChild(nodeWrapper);
      });
    } else {
      form.appendChild(createElem(key, data.fields));
    }

  });

  attachEvents();
}