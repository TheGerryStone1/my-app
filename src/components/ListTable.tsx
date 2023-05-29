// TODO
// Poner una imagen de placeholden en caso de que no haya foto de perfil
// Arreglar para la vista tipo telefono

import React, { Fragment, useState, useEffect, useContext } from "react";
import * as FaIcons from "react-icons/fa";
import DataTable, { TableColumn } from "react-data-table-component";
import Link from "next/link";

import { useRouter } from 'next/router';
import { listElementContext, elementContext } from "@/context/listElementContext";

let link = process.env.NEXT_PUBLIC_API_URL;

interface listElementInterface {
  value: number;
  label: string;
  cantidad: number;
  unidad: string;
  precio: number;
}

interface CardProps {
  elementID: string;
}

const ListTable = (props: CardProps) => {
  const [list, setList] = useState<listElementInterface[]>([]);

  useEffect(() => {
    fetch(link + '/getList')
      .then(res => res.json())
      .then(data => {
        setList(data.elements)
      })
      .catch(error => console.log("Error", error))
  }, [])
  
  const elementTableRouter = useRouter();
  let listsElementContext = useContext(listElementContext);
  let elementsContext = useContext(elementContext);

  const customStyles = {
    rows: {
      style: {
        minHeight: "50px",
      },
      highlightOnHoverStyle: {
        backgroundColor: "#EDEDED",
        borderBottomColor: "#FFFFFF",
        borderRadius: "10px",
        outline: "1px solid #FFFFFF",
      },
    },
  };

  const columns: TableColumn<listElementInterface>[] = [
    /*{
      cell: (row) => (
        <Fragment>
          <FaIcons.FaRegDotCircle
            className={`status-icon-size ${
              row.orderstatus === "Approved" ? "state-active" : row.orderstatus === "Pending" ? "state-pending" : "state-inactive"
            }`}
          />
        </Fragment>
      ),
      width: "50px",
    },*/
    {
      name: "Producto",
      selector: (row) => row.label,
      sortable: true,
    },
    {
      name: "Cantidad",
      selector: (row) => row.cantidad,
    },
    {
      name: "Unidad",
      selector: (row) => row.unidad,
    },
    {
      name: "Precio",
      selector: (row) => row.precio,
    },
    {
      cell: (row) => (
        <Fragment>
          <div onClick={() => {elementTableRouter.push({pathname: '/update',query: { slug: row.value },});}}>
            <FaIcons.FaPencilAlt style={{ color: "black", fontSize: "18px", cursor: "pointer" }}/>
          </div>
        </Fragment>
      ),
      width: "50px",
    },
    {
      cell: (row) => (
        <Fragment>
          <FaIcons.FaTrash
            style={{ color: "black", fontSize: "50px", cursor: "pointer" }}
            onClick={() => {
              const requestOptions = {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ id: row.value}),
              };
            
              fetch(link + "/deleteElement", requestOptions,)
              .then((response) => {
                  if (response.ok) {
                  return response.json();
                  }
                  throw new Error("Network response was not ok.");
              })
              .then((data) =>{
                  alert("Exito");
                  console.log("Se eliminó el producto de la lista.");
                  console.log(data);
              })
              .catch((error) => console.error("Error", error)
              );
              elementTableRouter.reload()
            }}
          />
        </Fragment>
      ),
      width: "50px",
    },
  ];

  let elements = listsElementContext?.selectedListElement;
  //let clients = clientsListContext?.selectedClient;

  const data = list?.map((element) => {
    return {
      value: element.value,
      label: element.label,
      cantidad: element.cantidad,
      unidad: element.unidad,
      precio: element.precio,
    }
  })

  let selectedElementID = elementsContext?.currentElement;

  //let selectedElementIDInt = parseInt(selectedElementID);
  
  //let filteredProjectData = (selectedElementID != "" && selectedElementID != "undefined" && selectedElementID != null) ? data?.filter(element => element.value === parseInt(selectedElementID)) : data;

  return (
    <>
      <div className="container my-4">
        <DataTable
          columns={columns}
          data={data}
          customStyles={customStyles}
          highlightOnHover
          //pointerOnHover
          pagination
        />
      </div>
    </>
  );
};

export default ListTable;