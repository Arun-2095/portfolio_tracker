import * as React from 'react';
import Container from '@mui/material/Container';
import { Outlet , Link} from "react-router-dom";
import style from "./common.module.scss"
export default function SimpleBadge(props) {
  return (
    <Container className={style.center} maxWidth="100%">
     <Outlet />
     
  </Container>
  );
}