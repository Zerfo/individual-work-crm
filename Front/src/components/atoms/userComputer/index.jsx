import React from 'react';
import Pt from 'prop-types';

import './userComputer.scss';

const showComputerInfo = () => null;

const UserComputer = (props) => (
  <div className="userComputer-container">
    <div className="userComputer-container__header">
      <h2 className="userComputer-container__header__h2">
        Ваш компьютер:
      </h2>
    </div>
    <div className="userComputer-container__body">
      {
        props.computer === null
          ? <p className="userComputer-container__body__p">
            У вас пока нет компьютера.
          </p>
          : showComputerInfo()
      }
    </div>
  </div>
);

UserComputer.propTypes = {
  computer: Pt.shape({
    specifications: Pt.any,
    pictureURL: Pt.string,
    underRepair: Pt.bool,
    cabinetNumber: Pt.number
  })
};

export default UserComputer;
