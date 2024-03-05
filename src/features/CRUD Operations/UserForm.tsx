import { FormEntry } from "./FormEntry";
import { User } from "../../models/user";

import { useState } from "react";

import "./UserForm.css";

function updateUser(givenUser: User, field: string, newValue: string): User {
  let newUser = givenUser;

  switch (field) {
    case "id":
      newUser.setId(parseInt(newValue));
      break;

    case "firstName":
      newUser.setFirstName(newValue);
      break;

    case "lastName":
      newUser.setLastName(newValue);
      break;

    case "pictureUrl":
      newUser.setPictureUrl(newValue);
  }

  return newUser;
}

export function UserForm(props: any) {
  let fieldsRequired: string[] = ["ID", "First Name", "Last Name", "URL"];

  const [user, setUser] = useState(new User(0, "", "", ""));

  const handleChange = (field: string, newValue: string) => {
    setUser((user) => updateUser(user, field, newValue));

    props.handleInputChange(user);
  };

  return (
    <div className="form-div">
      <form className="user-form">
        {fieldsRequired.map((field) => (
          <FormEntry label={field} handleChange={handleChange} />
        ))}
      </form>
    </div>
  );
}
