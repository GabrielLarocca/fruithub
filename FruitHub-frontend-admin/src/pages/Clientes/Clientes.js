import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import { FaCheck } from "react-icons/fa";
import { MdClose } from "react-icons/md";

export default function Clientes() {
	const [lista, setlista] = useState([]);
	const [nome, setnome] = useState("");
	const [skip, setSkip] = useState(0);
	const [pageCount, setPageCount] = useState(0);

	async function fetchData() {

	}

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<>
			<Header />

			<div className="container">
				<div className="d-block mb-4">
					<span className="text-primary">Clientes</span>
					<span className="text-secondary ml-2">Todos usuarios cadastrados</span>
				</div>

				<div className="row">
					<div className="col-sm-12 col-md-4 mt-2 mb-3">
						<input type="text" value={nome} onChange={(e) => setnome(e.target.value)} className="input-search" placeholder="Pesquise um nome" />
					</div>

					<div className="col-sm-12 col-md-4 mt-2 mb-3">
						<button className="btn-main w-100" onClick={() => fetchData()}>Buscar</button>
					</div>
				</div>

				<div className="row">
					<div className="col-12">
						<div className="card-content table-responsive-sm">
							<table className="table">
								<thead>
									<tr>
										<th scope="col">Ativo</th>
										<th scope="col">Nome</th>
										<th scope="col">Email</th>
										<th scope="col">Root</th>
									</tr>
								</thead>

								<tbody>
									{lista.map((el, i) => (
										<tr key={i}>
											<td>{el.ativo ? <FaCheck /> : <MdClose />}</td>
											<td>{el.nome}</td>
											<td>{el.email}</td>
											<td>{el.root ? <FaCheck /> : <MdClose />}</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
