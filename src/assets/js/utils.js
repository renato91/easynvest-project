
function setMask(o, type) {
    v_obj = o;

    if (type === 'cpf')
        setTimeout("execCPFMask()", 1)
    else {
        setTimeout("execMask()", 1)
    }
}

function execMask() {
    v_obj.value = phoneRegex(v_obj.value)
}

function execCPFMask() {
    v_obj.value = cpfCnpj(v_obj.value)
}

function phoneRegex(v) {
    v = v.replace(/\D/g, "");
    v = v.replace(/^(\d{2})(\d)/g, "($1) $2");
    v = v.replace(/(\d)(\d{4})$/, "$1-$2");
    return v;
}


function cpfCnpj(v) {
    v = v.replace(/\D/g, "")

    if (v.length <= 14) { //CPF
        v = v.replace(/(\d{3})(\d)/, "$1.$2")
        v = v.replace(/(\d{3})(\d)/, "$1.$2")
        v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    } else { //CNPJ
        v = v.replace(/^(\d{2})(\d)/, "$1.$2")
        v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
        v = v.replace(/\.(\d{3})(\d)/, ".$1/$2")
        v = v.replace(/(\d{4})(\d)/, "$1-$2")
    }

    return v

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

}

function clearForm(){
    var input = document.querySelector('input');
    var img = document.querySelector('img');
    var map = document.getElementById('mapRenderer');

    input.value = "";
    img.src = "";
    map.style.display = "none";
}