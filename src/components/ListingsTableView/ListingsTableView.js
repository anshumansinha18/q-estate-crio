import React from "react";
import { useState, useEffect } from "react";
import "./ListingsTableView.css";
import { MdDelete } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import EditModal from "../EditModal/EditModal";

export default function LisitingsTableView({
  filteredData,
  setFilteredData,
  originalData,
  editOriginalData,
}) {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const [editingIndex, setEditingIndex] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEdit = (index) => {
    setEditingIndex(index);
    setIsEditModalOpen(true);
  };

  const handleEditSave = (editedItem) => {
    const indexToBeEdited = editingIndex + (currentPage - 1) * itemsPerPage;

    const updatedData = [...filteredData];
    updatedData[indexToBeEdited] = editedItem;
    setFilteredData(updatedData);
    editOriginalData(updatedData);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingIndex(null);
  };

  const [selectedRows, setSelectedRows] = useState([]);
  const isAllSelected = selectedRows.length === itemsPerPage;

  useEffect(() => {
    setFilteredData(filteredData);
    setCurrentPage(1);
    setSelectedRows([]);
  }, [filteredData]);

  const handleRowCheckboxChange = (event, index) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      //If the items is checked, push it into selectedRows array
      setSelectedRows([...selectedRows, index]);
    } else {
      setSelectedRows(selectedRows.filter((item) => item !== index));
    }
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedRows([...Array(itemsPerPage).keys()]);
    } else setSelectedRows([]);
  };
  const handleFirstPage = () => {
    setCurrentPage(1);
    setSelectedRows([]);
  };
  const handleLastPage = () => {
    setCurrentPage(totalPages);
    setSelectedRows([]);
  };
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
    setSelectedRows([]);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
    setSelectedRows([]);
  };
  const handlePageClick = (page) => {
    setCurrentPage(page);
    setSelectedRows([]);
  };

  const handleDelete = (index) => {
    let indexToBeDeleted = index + (currentPage - 1) * itemsPerPage;
    const updatedData = [...filteredData];
    updatedData.splice(indexToBeDeleted, 1);

    setFilteredData(updatedData);
    editOriginalData(updatedData);

    setSelectedRows([]);
  };

  const handleDeleteAllSelected = () => {
    const updatedData = filteredData.filter(
      (_, index) => !selectedRows.includes(index)
    );

    setFilteredData(updatedData);
    editOriginalData(updatedData);

    setSelectedRows([]);
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={handleSelectAll}
              />
            </th>
            <th>Property Name</th>
            <th>Price</th>
            <th>Address</th>
            <th>Listing Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.slice(startIndex, endIndex).map((items, index) => (
            <tr key={index}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedRows.includes(index)}
                  onChange={(e) => handleRowCheckboxChange(e, index)}
                />
              </td>
              <td>{items.property_name}</td>
              <td>Rs{items.price}</td>
              <td>{items.address}</td>
              <td>{items.listing_date}</td>
              <td className="action-items">
                <MdDelete onClick={() => handleDelete(index)} />
                <TbEdit onClick={() => handleEdit(index)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="table-footer">
        <button onClick={handleDeleteAllSelected}>Delete Selected</button>
        <div className="pagination-container">
          <span>
            Page {totalPages < 1 ? 0 : currentPage} of {totalPages}
          </span>
          <div className="pagination">
            <button onClick={handleFirstPage} disabled={currentPage === 1}>
              First
            </button>
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
              Previous
            </button>
            {pageNumbers.map((number) => (
              <button
                key={number}
                onClick={() => handlePageClick(number)}
                className={`${number === currentPage ? "active" : ""}`}
              >
                {number}
              </button>
            ))}
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
            <button
              onClick={handleLastPage}
              disabled={currentPage === totalPages}
            >
              Last
            </button>
          </div>
        </div>
      </div>
      {isEditModalOpen && (
        <EditModal
          item={filteredData[editingIndex + (currentPage - 1) * itemsPerPage]}
          onSave={handleEditSave}
          onClose={handleCloseEditModal}
        />
      )}
    </div>
  );
}
