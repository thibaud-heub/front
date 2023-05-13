let userBackup;
let currentAddedUser = {};
let currentModifiedUser = {};

const inputsKeys = ["id", "first", "last", "email", "company", "country", "created_at"];
const inputsPatterns = ["[A-Z][A-Za-z-]*", "[A-Z][A-Za-z-]*", "[a-z0-9-_.]+@([a-z0-9]+\\.)+[a-z]{2,4}", "[A-Z][A-Za-z0-9-' ]*", "[A-Z][A-Za-z-' ]*"];

function editForm (id) {
    if (currentModifiedUser.id === undefined) {
        const user = document.getElementById(id);
        userBackup = user.innerHTML;
        const userData = user.children;
        for (let i = 0; i < userData.length - 1; i++) {
            currentModifiedUser[inputsKeys[i]] = userData[i].innerHTML;
        }
        for (let i = 1; i < userData.length - 2; i++) {
            userData[i].innerHTML = `<input form="form${id}" class="form-control" id="${inputsKeys[i] + id}" pattern="${inputsPatterns[i - 1]}" value="${userData[i].innerHTML}" onchange="currentModifiedUser.${inputsKeys[i]} = document.getElementById('${inputsKeys[i] + id}').value;" required>`;
        }
        userData[userData.length - 1].innerHTML = `<form id="form${id}"><button class="btn btn-success" type="submit">Valid</button></form> <button class="btn btn-danger" onclick="cancelEdit(${id})">Cancel</button>`;
    }
}

function cancelEdit (id) {
    document.getElementById(id).innerHTML = userBackup;
    currentModifiedUser = {};
}
