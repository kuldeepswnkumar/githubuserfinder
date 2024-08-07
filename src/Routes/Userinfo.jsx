import { format, render, cancel, register } from "timeago.js";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Tabs from "../component/Tabs";
import Repo from "../component/Repo";
import AllEvent from "../component/AllEvent";
import UserContainer from "../component/UserContainer";
import Loading from "../component/Loading";

const Userinfo = () => {
  const [user, setUser] = useState([]);
  const [type, setType] = useState("");
  const [infos, setInfos] = useState([]);
  const [loading, setLoading] = useState([]);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  let BaseURL = "https://api.github.com/users";

  async function GetUserInfo() {
    setLoading(true);
    const res = await fetch(BaseURL + pathname);
    const data = await res.json();
    // console.log(data);
    setUser(() => [data]);
    setLoading(null);
  }

  async function GetUser() {
    setUser([]);
    setLoading(true);
    const res = await fetch(BaseURL + pathname + `/${type}`);
    const data = await res.json();
    // console.log("res", data);
    setInfos(data);
    setLoading(null);
    // console.log(data);
  }

  useEffect(() => {
    GetUserInfo();
    GetUser();
    // console.log(user);
    // console.log(type);
  }, [pathname, type]);

  return (
    <div className="py-5">
      <button
        onClick={() => navigate("/")}
        className="px-5 py-1 font-medium mx-1 my-4 bg-teal-600 rounded text-gray-200"
      >
        BACK
      </button>
      {user &&
        user?.map((uinfo, i) => (
          <div
            key={i}
            className="flex justify-center md:flex-row md:px-0 px- flex-col gap-10"
          >
            <img
              src={uinfo.avatar_url}
              className="w-[350px] border-4 border-teal-400 md:mx-0 mx-auto"
            />
            <div className="text-lg px-3 leading-10">
              <h1 className="text-3xl pb-4">{uinfo?.name}</h1>
              <h1>
                <span className="text-teal-500">Login_name </span> :{" "}
                {uinfo.login}
              </h1>
              <h1>
                <span className="text-teal-500">Followers :</span> :{" "}
                {uinfo.followers}
              </h1>
              <h1>
                <span className="text-teal-500">Following :</span> :{" "}
                {uinfo.following}
              </h1>
              <h1>
                <span className="text-teal-500">Public_Repositories :</span> :{" "}
                {uinfo.public_repos}
              </h1>
              <h1>
                <span className="text-teal-500">Join :</span> :{" "}
                {new Date(uinfo.created_at).toLocaleDateString()}
              </h1>
              <a
                href={uinfo?.html_url}
                target="_black"
                className="text-gray-200 font-semibold rounded cursor-pointer px-4 py-1 bg-teal-600 my-3 tracking-wide rounded"
              >
                Visit
              </a>
            </div>
          </div>
        ))}
      <div className="flex border-b pg-4 gap-6 mt-[10%] mb-6 justify-center md:text-xl">
        <Tabs type={type} setType={setType} />
      </div>
      {loading && <Loading />}
      {type === "repos" && (
        <div className="">{infos && <Repo repos={infos} />}</div>
      )}
      {type === "received_events" && (
        <div className="grid md:grid-cols-2 grid-cols-1 gap-7 w-[11/12] mx-auto">
          {infos && <AllEvent events={infos} />}
        </div>
      )}
      {type === "followers" && (
        <div>
          <UserContainer users={infos} />
        </div>
      )}
    </div>
  );
};

export default Userinfo;
