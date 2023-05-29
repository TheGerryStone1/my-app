import React, { useState, useEffect } from "react";
import * as FaIcons from "react-icons/fa";
import Select from "react-select";
import { useHasMounted } from "../components/useHasMounted";
import { Dropdown, DropdownButton } from "react-bootstrap";

let link = process.env.NEXT_PUBLIC_API_URL;

const create = () => {
  const hasMounted = useHasMounted();
  // React Hooks for managing component state
  const [client, setClient] = useState<number>();
  const [team, setTeam] = useState<number>();
  const [projectDescription, setProjectDescription] = useState<string>("");
  const [response, setResponse] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [orderStatus, setOrderStatus] = useState("");
  const [projectName, setProjectName] = useState("");
  const [listOfTeams, setTeamsList] = useState([])
  const [listOfClients, setClientsList] = useState([])
  
  const [producto, setProducto] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [unidad, setUnidad] = useState("");
  const [precio, setPrecio] = useState("");

  const listaDeUnidades = [
    {value: "kg", label: "kg"},
    {value: "g", label: "g"},
    {value: "L", label: "L"},
    {value: "ml", label: "ml"},
    {value: "pza", label: "pza"},
    {value: "und", label: "und"}
  ];

  const handleSendForm = async (event: any) => {
    event.preventDefault();

    const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({  producto: producto, 
                            cantidad: parseInt(cantidad), 
                            unidad: unidad,
                            precio: parseInt(precio)}),
    };

    fetch(link + "/createElement", requestOptions,)
    .then((response) => {
        if (response.ok) {
        return response.json();
        }
        throw new Error("Network response was not ok.");
    })
    .then((data) =>{
        alert("Exito");
        console.log("Se guardó el producto en la lista.");
        console.log(data);
    })
    .catch((error) => console.error("Error", error)
    );
};

  const handleDropdownSelect = (e: any | null) => {
    e === null ? setUnidad("") : setUnidad(e.value)
  }

  // useHasMounted.tsx ensures correct server-side rendering in Next.JS when using the react-select library.
  // For more information, refer to the file inside src/components/useHasMounted.tsx.
  if (!hasMounted) {
    return null;
  }

  return (
    <>
    <div className="container bg-light border p-4">
        <div className="mb-4">
            <label className="form-label">Nombre de producto...</label>
            <textarea
                className="form-control"
                id="producto"
                autoComplete="off"
                onChange={(e) => setProducto(e.target.value)}
                value={producto}
                placeholder="Ingrese nombre de producto..."
                rows="1"
                required
            />
            
            <label className="form-label">Cantidad de producto...</label>
            <textarea
                className="form-control"
                id="cantidad"
                autoComplete="off"
                onChange={(e) => setCantidad(e.target.value)}
                value={cantidad}
                placeholder="Ingrese cantidad de producto..."
                rows="1"
                required
            />

            <label className="form-label">Unidad de producto...</label>
            <Select
            onChange={handleDropdownSelect} // sets the callback function to handle changes in selected option(s)
            value={listaDeUnidades.find((obj) => obj.value === unidad)} // sets the currently selected option(s). Use when isMulti is specified.
            options={listaDeUnidades} // sets the available options for the Select component
            placeholder="Selecciona unidad..."
            isClearable
            />

            <label className="form-label">Precio de producto...</label>
            <textarea
                className="form-control"
                id="precio"
                autoComplete="off"
                onChange={(e) => setPrecio(e.target.value)}
                value={precio}
                placeholder="Ingrese precio de producto..."
                rows="1"
                required
            />

            {/* Submit button */}
          <button className="btn btn-primary mt-3" onClick={handleSendForm}>
            <FaIcons.FaBrain className="mb-1" />
            &nbsp;&nbsp;Guardar nueva entrada
          </button>
            
            <div className="container">
                <div className="row">

                </div>
            </div>
        </div>
    </div>
    </>
  );
};

export default create;