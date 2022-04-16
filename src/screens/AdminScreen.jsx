import { useEffect } from "react";
import { useState } from "react";
import AdminTable from "../components/adminTable/AdminTable";
import Pagination from "../components/pagination/Pagination";

import "./AdminScreen.css";

const MAX_ROWS_PER_PAGE = 10;

const AdminScreen = () => {
  const [users, setUsers] = useState([]);
  const [pAndFUsersData, setPandFUsersData] = useState([]); // paginated and filtered user data
  const [searchText, setSearchText] = useState("");
  const [selectedPage, setSelectedPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, updateIsLoading] = useState(true);

  const isAnyUserSelected = pAndFUsersData.reduce(
    (isSelected, user) => isSelected || user.isSelected,
    false
  );

  const fetchUsers = async () => {
    const response = await fetch(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    );
    const data = await response.json();
    updateIsLoading(false);
    setUsers(
      data.map((user) => {
        return { ...user, isSelected: false };
      })
    );
  };

  const updatePandFUsersData = (usersData) => {
    const start = (selectedPage - 1) * MAX_ROWS_PER_PAGE;
    const end = start + MAX_ROWS_PER_PAGE;
    setTotalPages(Math.ceil((usersData?.length ?? 0) / MAX_ROWS_PER_PAGE));
    setPandFUsersData(usersData.slice(start, end));
  };

  const updateUserSelectedHandler = (userId, isSelected) => {
    const tempUsers = [...users];
    tempUsers.forEach((user) => {
      if (user.id === userId) {
        user.isSelected = isSelected;
      }
    });
    setUsers(tempUsers);
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (searchText != null) {
      const usersData = users.filter((user) => {
        const { name, email, role } = user;
        return (
          name.toLowerCase().includes(searchText) ||
          email.toLowerCase().includes(searchText) ||
          role.toLowerCase().includes(searchText)
        );
      });
      updatePandFUsersData(usersData);
    } else {
      updatePandFUsersData(users);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users, selectedPage, searchText]);

  useEffect(() => {
    if (selectedPage > totalPages && totalPages !== 0) {
      setSelectedPage(totalPages);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pAndFUsersData?.length, totalPages]);

  return (
    <>
      {isLoading ? null : (
        <>
          <input
            className="searchInput"
            placeholder="Search by name, email or role"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          {pAndFUsersData.length > 0 ? (
            <>
              <AdminTable
                paginatedUsers={pAndFUsersData}
                onChange={updateUserSelectedHandler}
              />
              <div className="footer">
                <button
                  className={`deleteBtn ${
                    !isAnyUserSelected ? "disabled" : ""
                  }`}
                  disabled={!isAnyUserSelected}
                >
                  Delete selected
                </button>
                {totalPages > 1 && (
                  <Pagination
                    selectedPage={selectedPage}
                    totalPages={totalPages}
                    onPageChange={(page) => setSelectedPage(page)}
                  />
                )}
              </div>
            </>
          ) : (
            <>
              <div>No data found</div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default AdminScreen;
