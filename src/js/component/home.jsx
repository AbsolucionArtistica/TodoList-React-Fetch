import React, { useState, useEffect } from "react";

// Create your first component
const Home = () => {
	const [itemValue, setNewItemValue] = useState("");
	const [todos, setTodos] = useState([]);

	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/agustin")
			.then((response) => response.json())
			.then((data) => {
				if (Array.isArray(data)) {
					setTodos(data);
				} else {
					console.error("Fetched data is not an array:", data);
				}
			})
			.catch((error) => console.error("Error fetching tasks:", error));
	}, []);

	const handleAddTodo = (e) => {
		if (e.key === "Enter") {
			const newToDoObj = { label: itemValue, done: false };
			const updatedTodos = [...todos, newToDoObj];
			setTodos(updatedTodos);


			fetch("https://assets.breatheco.de/apis/fake/todos/user/agustin", {
				method: "PUT",
				body: JSON.stringify(updatedTodos),
				headers: {
					"Content-Type": "application/json",
				},
			})
				.then((response) => response.json())
				.then((data) => setNewItemValue(""))
				.catch((error) => console.error("Error updating tasks:", error));

		}
	};

	const handleRemoveTodo = (id) => {
		const updatedTodos = todos.filter((todo, index) => index !== id);
    	setTodos(updatedTodos);

		fetch("https://assets.breatheco.de/apis/fake/todos/user/agustin", {
			method: "PUT",
			body: JSON.stringify(updatedTodos),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.catch((error) => console.error("Error updating tasks:", error));
	};

	function handleClearAll() {
		setTodos([]);

		fetch("https://assets.breatheco.de/apis/fake/todos/user/agustin", {
			method: "PUT",
			body: JSON.stringify([]),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.catch((error) => console.error("Error clearing tasks:", error));
	}

	return (
		<div className="container">
			<h1 className="m-auto text-center">TODOS</h1>
			<ul>
				<li>
					<input
						type="text"
						onChange={(e) => setNewItemValue(e.target.value)}
						value={itemValue}
						onKeyDown={handleAddTodo}
						placeholder="What do we need to do?"
					/>
				</li>
				{todos.map((item, index) => (
					<li className="todo" key={index}>
						{item.label}
						<i
							className="fa-solid fa-x float-end m-1 icon"
							onClick={() => handleRemoveTodo(index)}
							style={{ cursor: "pointer" }}
						></i>
					</li>
				))}
				<li>{todos.length} item(s) left <span className="float-end">Clear all Todos <i className="fa-regular fa-trash-can m-1 icon" onClick={() => handleClearAll()} style={{ cursor: "pointer" }}></i></span></li>
			</ul>
		</div>
	);
};

export default Home;
