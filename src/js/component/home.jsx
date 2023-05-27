import React, { useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [itemValue, setNewItemValue] = useState ("");
	const [todos, setTodos] = useState ([]);
	return (
		<div className="container">
			<h1 className="m-auto text-center">TODOS</h1>
			<ul>
				<li>
					<input type="text" onChange={(e) => setNewItemValue(e.target.value)} value={itemValue} onKeyDown={(e)=> {
						if (e.key === "Enter") {
							setTodos(todos.concat([itemValue]));
							setNewItemValue("");
						}
					}} placeholder= "What we need to do?"></input>
				</li>
				{todos.map((item, index) => (
				<li className="todo">
					{item} <i className="fa-solid fa-x float-end m-1 icon" onClick={() => setTodos(todos.filter((i,indexposition) => index != indexposition))} style={{ cursor: 'pointer' }}></i>
				</li>
				))}
				<li>{todos.length} item left</li>
			</ul>
		</div>
	);
};

export default Home;
