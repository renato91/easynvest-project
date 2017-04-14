function createElem(elem, object) {
  var object = object[elem] || object;
  var node;
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

function attachEvents(){
  var txtCpf = document.getElementById('txtCpf');
  var txtTelefone = document.getElementById('txtTelefone');

  txtCpf.setAttribute('onblur', 'setMask(this, "cpf")');
  txtTelefone.setAttribute('onblur', 'setMask(this, "tel")');

}

function getUploadedFile() {
  var file = document.getElementById('uplImage').files[0];
  var targetImg = document.getElementById('imgAvatar');
  var reader = new FileReader();

  reader.addEventListener("load", function () {
    targetImg.src = reader.result;
  }, false);

  if (file) {
    reader.readAsDataURL(file);
  }

  console.log(targetImg);

}


function setMask(input, type) {
    if(type === 'cpf')
      return input.value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g,"\$1.\$2.\$3\-\$4");
    else
      return input.value.replace(input.value, "/^\([1-9]{2}\)[0-9]{4,5}-[0-9]{4}$/");
   
}

window.fetch('./assets/js/mock.json', {
  method: 'get'
}).then(function (response) {
  return response.json();
}).then(function (response) {
  renderForm(response);
}).catch(function (error) {
  console.log(error);
});

function renderForm(data) {
  var wrapper = document.getElementById('wrapper')
  var form = document.createElement('form');
  var arraySize = Object.keys(data.fields).length;
  var node;

  wrapper.appendChild(form);

  Object.keys(data.fields).forEach(function (key, index) {

    if (data.fields[key].length) {
      data.fields[key].forEach(function (input) {
        console.log(input)
        form.appendChild(createElem(key, input));
      });
    } else {
      form.appendChild(createElem(key, data.fields));
    }

  });

attachEvents();

}
