import UserRow from "../userRow/UserRow";

import "./AdminTable.css";

const AdminTable = ({ paginatedUsers, onSave, onDelete, onChange }) => {
  const isAllSelected = paginatedUsers.reduce(
    (isSelected, user) => isSelected && user.isSelected,
    true
  );

  const selectAllUsersHandler = (isSelected) => {
    paginatedUsers.map((user) => onChange(user.id, isSelected));
  };

  return (
    <table className="container">
      <thead>
        <tr>
          <th>
            <input
              type="checkbox"
              onChange={(event) => selectAllUsersHandler(event.target.checked)}
              checked={isAllSelected}
            />
          </th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {paginatedUsers.map((user) => (
          <UserRow
            key={user.id}
            userData={user}
            onChange={onChange}
            onSave={onSave}
            onDelete={onDelete}
          />
        ))}
      </tbody>
    </table>
  );
};

export default AdminTable;
