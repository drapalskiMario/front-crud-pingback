let count = 0;

class User {
  constructor (id, name, username) {
    this._id = id;
    this._name = name;
    this._username = username;
  }

  get id () {
    return this._id;
  }

  get name () {
    return this._name;
  }

  get username () {
    return this._username;
  }
}

const users = [];
const tableRows = [];
let buttonAdd = document.querySelector("#button-add");

const tableHead = `
  <tr>
    <th>ID</th>
    <th>Name</th>
    <th>Username</th>
    <th>Actions</th>
  </tr>
`

const table = document.querySelector("#table");
table.innerHTML = tableHead;

buttonAdd.onclick = (event) => {
  event.preventDefault();
  let name = document.querySelector("#name").value;
  let username = document.querySelector("#username").value;

  if (dontRepeatName(name, username)) {
    window.alert("Already exists name and/or username")
    return;
  }

  const newUser = new User(count, name, username);

  users.push(newUser);
  addRow(newUser);

  inserTableHeadAndTableRows(tableRows);
  count++
}

const addRow = (newUser) => {
  const newTableRow = `
    <tr id="${newUser.id}">
      <td>${newUser.id}</td>
      <td>${newUser.name}</td>
      <td>${newUser.username}</td>
      <td>
        <button onClick="remove(${newUser.id})">DELETE</button>
      </td>
    </tr>
  `;

  tableRows.push(newTableRow);
}

const remove = (userId) => {
  delete tableRows[userId];
  inserTableHeadAndTableRows(tableRows);
}

const inserTableHeadAndTableRows = (tableRows) => {
  const table = document.querySelector("#table");
  const tableRowsNotComma = tableRows.join("");
  table.innerHTML = tableHead + tableRowsNotComma;
}

const dontRepeatName = (name, username) => {
  const nameOrUsernameExists = users.find((user) => user.name === name || user.username === username);
  return nameOrUsernameExists;
}