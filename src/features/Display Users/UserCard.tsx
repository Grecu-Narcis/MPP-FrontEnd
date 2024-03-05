import { User } from "../../models/user";

import "./UserCard.css";

export function UserCard(props: any) {
  let givenUser: User = props.user;
  let path: string = "assets/" + givenUser.getPictureUrl();

  const removeUser = props.removeMethod;

  return (
    <div className="card" onClick={props.onClick}>
      <button
        className="remove-button"
        onClick={() => removeUser(givenUser.getId())}
      >
        X
      </button>

      <div className="card-info">
        <div className="picture">
          <img src={path} alt="user profile" />
        </div>

        <div className="user-info">
          <div className="user-id">ID: {givenUser.getId()}</div>

          <div className="first-name">
            First Name: {givenUser.getFirstName()}
          </div>

          <div className="last-name">Last Name: {givenUser.getLastName()}</div>
        </div>
      </div>
    </div>
  );
}
