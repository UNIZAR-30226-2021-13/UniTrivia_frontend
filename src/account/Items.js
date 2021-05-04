import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import AddBox from '@material-ui/icons/AddBox';
import {Card, CardHeader, Typography} from "@material-ui/core";
import PropTypes from 'prop-types';
import {FixedSizeList} from 'react-window';

let avatares = [];
let banners = [];
let fichas = [];

const useStyles = makeStyles((theme) => ({

    root: {
        width: '100%',
        height: 400,
        maxWidth: 300,
        backgroundColor: theme.palette.background.paper,
    },
}));


function renderRowAvatars(props){
  const { index, style } = props;

    console.log(avatares);

  const clickAddAvatar = () => {
    console.log("avatar clickado");
  }

  return(

      <ListItem button style={style} key={index} onClick={clickAddAvatar}>
        <ListItemAvatar>
          <Avatar>
            <FolderIcon/>
          </Avatar>
        </ListItemAvatar>
        <ListItemText
            primary="Avatar"
        />
      </ListItem>

  )
}

renderRowAvatars.propTypes = {
  index: PropTypes.number.isRequired,
  style: PropTypes.object.isRequired,
};

function Items(props) {
  const profile = props.comprados;


  for(let i = 0; i < profile.length; i++){
      let word = profile[i];
      if(word[0] == 'a'){
          avatares.push(word);
      }else if(word[0] == 'b'){
          banners.push(word);
      }else if(word[0] == 'f'){
          fichas.push(word);
      }
  }


  console.log(banners);
  console.log(fichas);

  const classes = useStyles();




  const clickAddAvatar = () => {
    console.log("avatar clickado");
  }

  const clickAddBanner = () => {
    console.log("banner clickado");
  }

  const clickAddFicha = () => {
    console.log("ficha clickado");
  }

  return (
      <Card>
        <CardHeader
            subheader="Objetos adquiridos por el usuario"
            title="Objetos"
        />
          <div className={classes.demo}>
              AVATARES
              <FixedSizeList height={100} width={800} itemSize={46} itemCount={avatares.length}>
                  {renderRowAvatars}
              </FixedSizeList>
          </div>
          <div className={classes.demo}>
              BANNERS
              <FixedSizeList height={100} width={800} itemSize={46} itemCount={banners.length}>
                  {renderRowAvatars}
              </FixedSizeList>
          </div>
          <div className={classes.demo}>
              FORMAS DE FICHA
              <FixedSizeList height={100} width={800} itemSize={46} itemCount={fichas.length}>
                  {renderRowAvatars}
              </FixedSizeList>
          </div>
      </Card>

  );
}

export default Items;
