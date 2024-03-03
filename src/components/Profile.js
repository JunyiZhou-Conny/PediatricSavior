import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
    const {user} = userAuth0();
    