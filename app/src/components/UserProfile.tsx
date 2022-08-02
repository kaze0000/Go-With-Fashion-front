import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useUserProfile } from "../hooks/useUserProfile";

type Inputs = {
  name: string;
  gender: number;
  selfIntroducement: string;
  twitter: string;
  insta: string;
};

export const UserProfile = () => {
  const { fetchAllUserProfiles, loading, userProfiles } = useUserProfile();

  useEffect(() => fetchAllUserProfiles(), []);

  console.log(userProfiles);

  return (
    <>
      <div>
        <ul>
          {userProfiles.map((user_profile) => (
            <li key={user_profile.id}>{user_profile.name}</li>
          ))}
        </ul>
      </div>
    </>
  );
};
