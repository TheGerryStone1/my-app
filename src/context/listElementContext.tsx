import { createContext, useState } from 'react';
import React from 'react';

type currentElementTypes = {
  currentElement: string | null, 
  setCurrentElement: React.Dispatch<React.SetStateAction<string | null>>
}

type currentElementContextProviderProps = {
  children: React.ReactNode
}

export const elementContext = createContext<currentElementTypes | null>(null);

//export const ProjectContext = createContext<projectOptionsTypes | null>(null);
export const ElementContext = ({children}: currentElementContextProviderProps) => {
  //return <departmentContext.Provider value={selectedDepartment}>{children}</departmentContext.Provider>
  const [currentElement, setCurrentElement] = useState<string | null>(null);
  return (
    <elementContext.Provider value={{currentElement, setCurrentElement}}>
      {children}
    </elementContext.Provider>
  )
}

//------------------------------------------------------------------------------------

interface listElementInterface {
    value: number;
    label: string;
    cantidad: number;
    unidad: string;
    precio: number;
  }

type listElementTypes = {
  selectedListElement: listElementInterface[] | null, 
  setSelectedListElement: React.Dispatch<React.SetStateAction<listElementInterface[] | null>>
}

type selectedListElementContextProviderProps = {
  children: React.ReactNode
}

export const listElementContext = createContext<listElementTypes | null>(null);

//export const teamListContext = createContext<OptionsTypes | null>(null);
export const ListElementContext = ({children}: selectedListElementContextProviderProps) => {
  //return <departmentContext.Provider value={selectedDepartment}>{children}</departmentContext.Provider>
  const [selectedListElement, setSelectedListElement] = useState<listElementInterface[] | null>(null);
  return (
    <listElementContext.Provider value={{selectedListElement, setSelectedListElement}}>
      {children}
    </listElementContext.Provider>
  )
}