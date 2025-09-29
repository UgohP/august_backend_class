interface User {
  id: number;
  firstname: string;
  lastname: string;
}

const UserPage = async () => {
  const data = await fetch("https://jsonplaceholder.org/users");
  const users: User[] = await data.json();

  return (
    <>
      <h1>Users</h1>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>FirstName</th>
              <th>LastName</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <th>{user.id}</th>
                <td>{user.firstname}</td>
                <td>{user.lastname}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UserPage;
