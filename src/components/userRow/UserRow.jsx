import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faDownload,
  faTrashCan,
  faX,
} from "@fortawesome/free-solid-svg-icons";

import "./UserRow.css";
const UserRow = ({ userData, onSave, onDelete, onChange }) => {
  const [isEditOn, setIsEditOn] = useState(false);
  const [formFileds, setFormFileds] = useState({ ...userData });
  const { id, name, email, role } = formFileds;

  const editHandler = (event) => {
    const { name, value } = event.target;
    setFormFileds({ ...formFileds, [name]: value });
  };

  const cancelHandler = () => {
    setIsEditOn(false);
    setFormFileds({ ...userData });
  };

  const saveHandler = () => {
    if (name.length === 0 || email.length === 0) {
      alert("Fields cannot be empty");
    } else {
      setIsEditOn(false);
      onSave(formFileds);
    }
  };

  const deleteHandler = () => {
    setIsEditOn(false);
    onDelete(id);
  };

  return (
    <tr className={`${userData.isSelected ? "rowSelected" : ""}`}>
      <td>
        <input
          type="checkbox"
          onChange={(event) => onChange(id, event.target.checked)}
          checked={userData.isSelected}
        />
      </td>
      <td>
        {!isEditOn ? (
          name
        ) : (
          <input
            className="fieldLayout"
            name="name"
            value={name}
            onChange={editHandler}
          />
        )}
      </td>
      <td>
        {!isEditOn ? (
          email
        ) : (
          <input
            className="fieldLayout"
            name="email"
            value={email}
            onChange={editHandler}
          />
        )}
      </td>
      <td>
        <div className="role">
          {!isEditOn ? (
            role
          ) : (
            <select
              className="fieldLayout"
              name="role"
              value={role}
              onChange={editHandler}
            >
              <option value={"member"}>Member</option>
              <option value={"admin"}>Admin</option>
            </select>
          )}
        </div>
      </td>
      <td>
        {!isEditOn ? (
          <div className="actions-container">
            <span>
              <FontAwesomeIcon
                icon={faEdit}
                onClick={() => setIsEditOn(true)}
              />
            </span>
            <span>
              <FontAwesomeIcon icon={faTrashCan} onClick={deleteHandler} />
            </span>
          </div>
        ) : (
          <div className="actions-container">
            <span>
              <FontAwesomeIcon icon={faDownload} onClick={saveHandler} />
            </span>
            <span>
              <FontAwesomeIcon icon={faX} onClick={cancelHandler} />
            </span>
          </div>
        )}
      </td>
    </tr>
  );
};

export default UserRow;
