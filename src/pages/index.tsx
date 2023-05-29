import React, { useState } from "react";
import * as FaIcons from 'react-icons/fa';
import { Container, Row, Col, Collapse } from "react-bootstrap";

import Menu from "../components/Menu";
import { useHasMounted } from "../components/useHasMounted";
import CreateElement from "../components/CreateElement";
import { ListElementContext, ElementContext } from "@/context/listElementContext";
import ListTable from "@/components/ListTable";
import { useRouter } from 'next/router';
import { useEffect } from "react";

const clients = () => {
  const router = useRouter();
  let elementID = router.query.slug;
  // useHasMounted.tsx ensures correct server-side rendering in Next.JS when using the react-select library.
  // For more information, refer to the file inside src/components/useHasMounted.tsx.
  const [collapse, setCollapse] = useState(false);
  const hasMounted = useHasMounted();
  const [addEmployee, setAddEmployee] = useState(false); 

  useEffect(() => {
    elementID = router.query.slug;
    console.log(elementID);
  }, [elementID])

  if (!hasMounted) {
    return null;
  }
  return (
    <>
      <Menu
        titulo="Lista de super"
        descripcion="Desc."
      />
      <ListElementContext>
        <ElementContext>
          <Container classname= "mt-3">
          <Row>
            <Col className="d-flex flex-row-reverse">
              <button
                className="btn btn-primary"
                onClick={() => setCollapse(!collapse)}
                aria-controls="collapseCreateElement"
                aria-expanded={collapse}
              >
                {collapse ? (
                  <>
                    <FaIcons.FaTimes className="mb-1" />
                    &nbsp;&nbsp;Close
                  </>
                ) : (
                  <>
                    <FaIcons.FaClipboardList className="mb-1" />
                    &nbsp;&nbsp;Add Product
                  </>
                )}
              </button>
            </Col>
          </Row>
        </Container>
        <Collapse in={collapse}>
          <div id="collapseCreateElement" className="my-3">
            <CreateElement />
          </div>
        </Collapse>
        <ListTable elementID={elementID} />
        </ElementContext>
      </ListElementContext>
    </>
  );
};

export default clients