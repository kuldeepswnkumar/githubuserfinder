const Repo = ({ repos }) => {
  return (
    <div>
      {Object.values(repos).map((repos, idx) => (
        <div key={idx} className="bg-gray-900 p-3 leading-8">
          <a
            href={repos?.html_url}
            className="text-teal-500 break-words font-semibold hover:underline"
            target="_black"
          >
            {repos?.full_name}
          </a>
          <div className="flex gap-x-5">
            <h1 className="text-sm font-semibold">
              {" 🟡 " + repos?.language}
            </h1>
            <h1 className="text-sm font-semibold"> Foreks: {repos?.forks} </h1>
            <h1 className="text-sm font-semibold">
              {" "}
              Star: {repos?.stargazers_count}{" "}
            </h1>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Repo;
