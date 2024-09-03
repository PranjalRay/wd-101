let NewForm=document.getElementById("registrationForm");
const DOB=document.getElementById("dob");
const DateToday=new Date().toISOString().slice(4, 10);
const CurrentYear=new Date().getFullYear();
DOB.min=`${CurrentYear-55}${DateToday}`;
DOB.max=`${CurrentYear-18}${DateToday}`;
const GetEntries = () => {
  let InputData=localStorage.getItem("history");
  if (InputData) {
    InputData=JSON.parse(InputData);
  } else {
    InputData=[];
  }
  return InputData;
};
let InputEntries = GetEntries();
const DisplayEntries = () => {
  const InputData = GetEntries();
  const TableEntries = InputData
    .map((e) => {
      const NameCell=`<td>${e.name}</td>`;
      const EmailCell=`<td>${e.email}</td>`;
      const PasswordCell=`<td>${e.password}</td>`;
      const DobCell=`<td>${e.dob}</td>`;
      const AcceptTermsCell=`<td>${e.acceptTerms}</td>`;
      const row=`<tr>${NameCell}${EmailCell}${PasswordCell}${DobCell}${AcceptTermsCell}</tr>`;
      return row;
    })
    .join("\n");
  const Table = `<table border = 11><tr>
    <th>Name</th>
    <th>Email</th>
    <th>Password</th>
    <th>Dob</th>
    <th>Accepted terms?</th>
    </tr>${TableEntries} </table>`;
  let Detail=document.getElementById("history");
  Detail.innerHTML = Table;
};
const SaveInputForm = (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const acceptTerms = document.getElementById("acceptTerms").checked;
  const InputData = {
    name,
    email,
    password,
    dob,
    acceptTerms,
  };                                                                                                  
  InputEntries.push(InputData);
  localStorage.setItem("history",JSON.stringify(InputEntries));
  DisplayEntries();
};
NewForm.addEventListener("submit",SaveInputForm);
DisplayEntries();
