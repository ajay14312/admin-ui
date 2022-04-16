import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faSave, faTrashCan, faX } from '@fortawesome/free-solid-svg-icons'

import "./UserRow.css";
const UserRow = ({ memberData, onChange }) => {
  const { id, name, email, role, isSelected } = memberData;
  return (
    <tr>
      <td>
        <input
          type="checkbox"
          onChange={(event) => onChange(id, event.target.checked)}
          checked={isSelected}
        />
      </td>
      <td>{name}</td>
      <td>{email}</td>
      <td>
        <div className="role">{role}</div>
      </td>
      <td>
        <span><FontAwesomeIcon icon={faEdit} /></span>
        <span><FontAwesomeIcon icon={faTrashCan} /></span>
        <span><FontAwesomeIcon icon={faSave} /></span>
        <span><FontAwesomeIcon icon={faX} /></span>
      </td>
    </tr>
  );
};

export default UserRow;
