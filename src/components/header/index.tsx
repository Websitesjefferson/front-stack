import { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Hidden from '@mui/material/Hidden';
import styles from './styles.module.scss';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom'

import Logo from '../../assets/logon.png'
export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <AppBar >
        <Toolbar> 
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <img className={styles.img} src={Logo} alt="" />
          </Typography>
          <Hidden mdUp implementation="css">
            {/* O ícone do menu só será exibido em telas menores ou iguais a 900 pixels */}
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
         
          <div className={styles.containerDiv}>
            <ListItem>
             <Link className={styles.a} to={'/'}>Cadastrar Categoría</Link> 
            </ListItem>
            <ListItem>
            <Link className={styles.a} to={'/brand'}>Cadastrar  fornecedor</Link>
            </ListItem>
            <ListItem >
              <Link className={styles.a} to={'/product'}>Cadastrar Produto</Link>
            </ListItem>
            <ListItem >
              <Link className={styles.a} to={'/registered'}>Produtos cadastrados</Link>
            </ListItem>
          </div>
        </Toolbar>
      </AppBar>
      <Hidden smDown implementation="css">
        {/* O menu hamburguer só será exibido em telas menores que 900 pixels */}
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={toggleDrawer}
        >
          <List sx={{ width: 250 }} onClick={toggleDrawer}>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="close"
              onClick={toggleDrawer}
              sx={{ marginLeft: 'auto' }}
            >
              <CloseIcon />
            </IconButton>
            <ListItem >
             <Link className={styles.a} to={'/'}>Cadastrar Categoría</Link> 
            </ListItem>
            <ListItem>
            <Link className={styles.a} to={'/brand'}>Cadastrar  fornecedor</Link>
            </ListItem>
            <ListItem >
              <Link className={styles.a} to={'/product'}>Cadastrar Produto</Link>
            </ListItem>
            <ListItem >
              <Link className={styles.a} to={'/registered'}>Produtos cadastrados</Link>
            </ListItem>
          </List>
        </Drawer>
      </Hidden>
     
    </>
  );
}
