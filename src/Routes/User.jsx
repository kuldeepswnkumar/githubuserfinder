import { useEffect, useState, useRef } from "react";
import UserContainer from "../component/UserContainer";
import Loading from "../component/Loading";

const User = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(null);
  let BaseURL = "https://api.github.com/users";
  const user = useRef("");

  async function AllUser() {
    setLoading(true);
    if (user.current.value === "") {
      setUsers("");
      const res = await fetch(BaseURL);
      const data = await res.json();
      // console.log(data);
      setUsers(data);
      setLoading(null);
    }
  }

  async function FindUser() {
    setLoading(true);
    if (user.current.value != "") {
      setUsers("");
      const res = await fetch(BaseURL + "/" + user.current.value);
      const data = await res.json();
      setUsers(() => [data]);
      user.current.value = "";
    } else {
      AllUser();
    }
    setLoading(null);
    // console.log(user.current.value);
  }

  useEffect(() => {
    AllUser();
  }, [setUsers]);

  return (
    <div>
      <div className="flex justify-center items-center h-11 my-5">
        <input
          type="text"
          placeholder="Search github username.."
          className="h-full md:w-1/3 w-2/3 text-gray-800 px-2 font-semibold outline-none"
          ref={user}
        />
        <button
          onClick={FindUser}
          className="bg-teal-500 font-semibold px-4 h-full"
        >
          Search
        </button>
      </div>
      {loading ? <Loading /> : <UserContainer users={users} />}
    </div>
  );
};

export default User;
