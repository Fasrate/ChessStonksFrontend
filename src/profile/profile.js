import { useParams } from "react-router-dom";
import UsersInfo from "./usersinfo";
import Holdings from "./holdings";

const Profile = () => {
    const { username } = useParams();

    return (
        <>
            <UsersInfo username={username} />
            <Holdings username={username} />
        </>
    );
}

export default Profile;