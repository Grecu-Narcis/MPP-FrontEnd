import "./DisplayUsersPage.css";

import { User } from "../../models/user";
import { UserCard } from "../../features/Display Users/UserCard";
import { Layout } from "../../shared/components/layout/Layout";
import { Button } from "../../shared/components/button/Button";

import { Link } from "react-router-dom";

export function DisplayUsersPage(props: any) {
  document.title = "Users dashboard!";

  let usersArray: User[] = props.users;

  const removeMethod = props.removeMethod;

  return (
    <Layout>
      <div className="main-page-container">
        <div className="users-list">
          {usersArray.map((user) => (
            <UserCard
              user={user}
              removeMethod={removeMethod}
              key={user.getId()}
            />
          ))}
        </div>

        <Link to="addUser">
          <Button type="button" buttonMessage="Add user" />
        </Link>
      </div>
    </Layout>
  );
}
