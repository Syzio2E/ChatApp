  import React from "react";

  const ExpenseTab = ({expenses,setExpenses}) => {
    const handleDelete = (e, expenseid) => {
      fetch(`http://localhost:5000/deleteexpense/${expenseid}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            setExpenses((prevExpenses) =>
              prevExpenses.filter((expense) => expense.id !== expenseid)
            );
          } else {
            throw new Error("Failed to delete expense");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };

    return (
      <table>
        <thead>
          <tr>
            <th>Money</th>
            <th>Description</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {expenses && expenses.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.money ? expense.money : ""}</td>
              <td>{expense.description ? expense.description : ""}</td>
              <td>{expense.category ? expense.category : ""}</td>
              <button type="delete" onClick={(e) => handleDelete(e, expense.id)}>Delete</button>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  export default ExpenseTab;