import React, { Fragment } from "react";
import Timeline from "./Timeline";
import UserCard from "./UserCard";
function Profile() {
  return (
    <Fragment>
      <UserCard />
      <div style={{ marginTop: "20px" }}>
        <Timeline />
      </div>
    </Fragment>
  );
}

export default Profile;
