import { useContext, useEffect, useState } from "react";
import ShowMyToys from "./ShowMyToys";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider";
import useSetTittle from "../../Hooks/useSetTittle";

const Mytoys = () => {
	useSetTittle("My Toys");
	const { loading, user } = useContext(AuthContext);

	const [cars, setCars] = useState([]);
	const [asc, setAsc] = useState(true);

	console.log(cars);

	const loadData = () => {
		fetch(
			`https://joyride-server-shanto57575.vercel.app/cars/${user?.email}?sort=${
				asc ? "asc" : "desc"
			}`
		)
			.then((res) => res.json())
			.then((data) => setCars(data));
	};

	useEffect(() => {
		if (!user?.email) return;
		loadData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user?.email, asc]);

	const handleDelete = (_id) => {
		console.log(_id);
		Swal.fire({
			title: "Are you sure?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete it!",
		}).then((result) => {
			if (result.isConfirmed) {
				fetch(`https://joyride-server-shanto57575.vercel.app/cars/${_id}`, {
					method: "DELETE",
				})
					.then((res) => res.json())
					.then((data) => {
						console.log(data);
						if (data.deletedCount > 0) {
							Swal.fire("Deleted!", "Your Coffee has been deleted.", "success");
							const remaining = cars.filter((car) => car._id !== _id);
							setCars(remaining);
						}
					});
			}
		});
	};
	if (loading) {
		return (
			<div className="text-center my-5">
				<button
					disabled
					type="button"
					className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
				>
					<svg
						aria-hidden="true"
						role="status"
						className="inline w-4 h-4 mr-3 text-white animate-spin"
						viewBox="0 0 100 101"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
							fill="#E5E7EB"
						/>
						<path
							d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
							fill="currentColor"
						/>
					</svg>
					Loading...
				</button>
			</div>
		);
	}

	return (
		<div className="overflow-x-auto w-full">
			<table className="table w-full">
				<thead>
					<>
						<button
							onClick={() => setAsc(!asc)}
							type="button"
							className="text-white ml-5 my-2 bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
						>
							{asc ? "Sort in Descending Price" : "Sort in Ascending Price "}
						</button>
					</>
					<tr className="text-center text-cyan-200 ">
						<th>Name</th>
						<th>Toy Name</th>
						<th>Category</th>
						<th>Price</th>
						<th>Quantity</th>
						<th>rating</th>
						<th>Edit</th>
						<th>Delete</th>
					</tr>
				</thead>
				<tbody>
					{cars?.map((car) => (
						<ShowMyToys
							key={car._id}
							car={car}
							setCars={setCars}
							loadData={loadData}
							handleDelete={handleDelete}
						></ShowMyToys>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Mytoys;
