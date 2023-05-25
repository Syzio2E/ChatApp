import React, { useEffect, useState } from "react";
import ExpenseTab from "./ExpenseTab";

const Home = () => {
  const [money, setMoney] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await fetch("http://localhost:5000/getexpense");
        if (!res.ok) {
          throw new Error("Failed to fetch expenses");
        }
        const data = await res.json();
        setExpenses(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchExpenses();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    const obj = {
      money,
      description,
      category
  }
    try {
      const res = await fetch("http://localhost:5000/addexpense", {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error("Failed to add expense");
      }
      const data = await res.json();
      console.log(data);
      setExpenses([...expenses, obj]);
      setMoney("");
      setCategory("");
      setDescription("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <React.Fragment>
      <div>
        <form onSubmit={submitHandler}>
          <label htmlFor="money">Money: </label>
          <input
            type="number"
            id="money"
            name="money"
            required
            value={money}
            onChange={(e) => setMoney(e.target.value)}
          />
          <label htmlFor="description">Description: </label>
          <input
            type="text"
            id="description"
            name="description"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="options">
            <label htmlFor="category">Choose a Category</label>
            <select
              id="category"
              name="category"
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{ margin: "10px" }}
            >
              <option value="" disabled>
                Choose a value
              </option>
              <option value="Food">Food</option>
              <option value="Salary">Salary</option>
              <option value="Petrol">Petrol</option>
              <option value="Electricity">Electricity</option>
            </select>
          </div>
          <button type="submit" style={{ margin: "10px", border: "none" }}>
            Add Expenses
          </button>
        </form>
      </div>
      <div>
       {expenses && <ExpenseTab expenses={expenses} setExpenses={setExpenses} /> } 
      </div>
    </React.Fragment>
  );
};

export default Home;
