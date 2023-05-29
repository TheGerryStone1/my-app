import React, { useState, useEffect } from "react";
import * as FaIcons from "react-icons/fa";
import Select from "react-select";
import { useHasMounted } from "../components/useHasMounted";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { useRouter } from "next/router";
import { useContext } from "react";
import { elementContext, listElementContext } from "@/context/listElementContext";

let link = process.env.NEXT_PUBLIC_API_URL;

interface listElementInterface {
    value: number;
    label: string;
    cantidad: number;
    unidad: string;
    precio: number;
  }

const create = () => {
  const hasMounted = useHasMounted();
  const router = useRouter();
  let elementID = router.query.slug;

  const [selectedElementOverview, setSelectedElementOverview] =
    useState<listElementInterface | null>(null);
    
  let elementsContext = useContext(elementContext);
  let listsElementContext = useContext(listElementContext);
  
  // React Hooks for managing component state
  
  let [producto, setProducto] = useState("");
  let [cantidad, setCantidad] = useState<number>();
  let [unidad, setUnidad] = useState("");
  let [precio, setPrecio] = useState<number>();

  const listaDeUnidades = [
    {value: "kg", label: "kg"},
    {value: "g", label: "g"},
    {value: "L", label: "L"},
    {value: "ml", label: "ml"},
    {value: "pza", label: "pza"},
    {value: "und", label: "und"}
  ];

  interface listElementInterface {
    value: number;
    label: string;
    cantidad: number;
    unidad: string;
    precio: number;
  }

  useEffect(() => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: elementID }),
    };

    fetch(link + "/getCurrentElement?", requestOptions)
      .then((res) => res.json())
      .then((data) => {
        setSelectedElementOverview(data.elements);
        // console.log("Worked successfully");
      })
      .catch((error) => console.log("Error ", error));

    // console.log("Worked successfully");
  }, [elementID]);

  const handleSendForm = async (event: any) => {
    event.preventDefault();

    let unidadStrValue;

    console.log(producto);
    console.log(cantidad);
    console.log(unidad);
    console.log(precio);

    if (typeof unidad != "string") {
      let unidadStr = JSON.parse(JSON.stringify(unidad));
      //console.log(clientStr)
      unidadStrValue = unidadStr.value;
      //console.log(clientInt)
    } else {
      unidadStrValue = unidad;
    }

    const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({  id: elementID,
                            producto: producto, 
                            cantidad: cantidad, 
                            unidad: unidadStrValue,
                            precio: precio}),
    };

    fetch(link + "/updateElement", requestOptions,)
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

    router.push({pathname: '/',});
};

  const handleDropdownSelect = (e: any | null) => {
    e === null ? setUnidad("") : setUnidad(e.value)
  }

  const handleChangeProduct = (e: any | null) => {
    e === null ? setProducto("") : setProducto(e.target.value);
  };

  // useHasMounted.tsx ensures correct server-side rendering in Next.JS when using the react-select library.
  // For more information, refer to the file inside src/components/useHasMounted.tsx.
  if (!hasMounted) {
    return null;
  }

  console.log(selectedElementOverview);
  
  return (
    <>
    <div className="container bg-light border p-4">
        <div className="mb-4">
            <label className="form-label">Nombre de producto...</label>
            <textarea
                className="form-control"
                id="producto"
                autoComplete="off"
                onChange={handleChangeProduct}
                value={producto === "undefined" ||
                producto === "" ||
                producto === null
                  ? (producto = selectedElementOverview?.label)
                  : producto}
                placeholder="Ingrese nombre de producto..."
                rows="1"
                required
            />
            
            <label className="form-label">Cantidad de producto...</label>
            <textarea
                className="form-control"
                id="cantidad"
                autoComplete="off"
                onChange={(e) => setCantidad(parseInt(e.target.value))}
                value={cantidad === undefined || cantidad === 0
                    ? (cantidad = selectedElementOverview?.cantidad)
                    : cantidad}
                placeholder="Ingrese cantidad de producto..."
                rows="1"
                required
            />

            <label className="form-label">Unidad de producto...</label>
            <Select
            onChange={handleDropdownSelect} // sets the callback function to handle changes in selected option(s)
            value={unidad === "undefined" ||
            unidad === "" ||
            unidad === null
              ? (unidad =
                  selectedElementOverview?.unidad &&
                  listaDeUnidades.find(
                    (obj) =>
                      obj.value === selectedElementOverview.unidad.valueOf()
                  ))
              : listaDeUnidades.find((obj) => obj.value === unidad.valueOf())} // sets the currently selected option(s). Use when isMulti is specified.
            options={listaDeUnidades} // sets the available options for the Select component
            placeholder="Selecciona unidad..."
            isClearable
            />

            <label className="form-label">Precio de producto...</label>
            <textarea
                className="form-control"
                id="precio"
                autoComplete="off"
                onChange={(e) => setPrecio(parseInt(e.target.value))}
                value={precio === undefined || precio === 0
                    ? (precio = selectedElementOverview?.precio)
                    : precio}
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