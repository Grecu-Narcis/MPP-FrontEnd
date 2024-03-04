import { UserForm } from "../../features/CRUD Operations/UserForm";
import { Button } from "../../shared/components/button/Button";
import { Layout } from "../../shared/components/layout/Layout";

import { useState } from "react";
import React from "react";

import { User } from "../../models/user";

import './AddUserPage.css'

export function AddUserPage(props: any) {
    document.title = "Add user";
    const addMethod = props.addMethod;

    const [user, setUser] = useState(
        new User(0, "", "", "")
    );

    const handleInputChange = (newUser: User) => {
        setUser((prevUser) =>  newUser);
    };

    const handleAddUser = () => addMethod(user);


    return (
        <Layout>
            <div className="main-page-container">
                <div className="main-title">
                    Add user
                </div>
                <UserForm
                    handleInputChange={handleInputChange}
                />

                <Button
                    type="button"
                    buttonMessage="Add user"
                    onClick={handleAddUser}
                />
            </div>
        </Layout>
    );
}